use super::{
    entity::{
        anchor::Anchor,
        dto::{
            proof_retrieve_request::ProofRetrieveRequest,
            proof_retrieve_response::ProofRetrieveResponse,
            record_write_request::RecordWriteRequest, record_write_response::RecordWriteResponse,
        },
        proof::Proof,
        record_receipt::RecordReceipt,
    },
    IntegrityError,
};
use crate::{
    config::{
        entity::network::{self, Network},
        service::ConfigService,
    },
    error::{BloockResult, InfrastructureError},
    record::entity::record::Record,
    shared::util,
};
use async_std::task;
use bitvec::{order::Msb0, prelude::BitVec};
use bloock_hasher::{keccak::Keccak256, Hasher, H256};
use bloock_http::{Client, HttpError};
use bloock_web3::blockchain::Blockchain;
use std::{sync::Arc, time::Duration};

pub struct IntegrityService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
    pub blockchain_client: Blockchain,
}

impl<H: Client> IntegrityService<H> {
    pub async fn send_records(&self, records: Vec<Record>) -> BloockResult<Vec<RecordReceipt>> {
        if records.is_empty() {
            return Ok(vec![]);
        }

        let url = format!("{}/core/messages", self.config_service.get_api_base_url());

        let body = RecordWriteRequest {
            messages: records.iter().map(|record| record.get_hash()).collect(),
        };

        let response = match self
            .http
            .post_json::<String, RecordWriteRequest, RecordWriteResponse>(url, body, None)
            .await
        {
            Ok(res) => res,
            Err(e) => {
                return Err(
                    InfrastructureError::Http(HttpError::RequestError(e.to_string())).into(),
                )
            }
        };

        Ok(records
            .iter()
            .map(|record| RecordReceipt {
                anchor: response.anchor,
                client: response.client.clone(),
                record: record.get_hash(),
                status: response.status.clone(),
            })
            .collect())
    }

    pub async fn get_anchor(&self, anchor_id: i64) -> BloockResult<Anchor> {
        let base_url = self.config_service.get_api_base_url();
        let url = format!("{base_url}/core/anchor/{anchor_id}");
        match self.http.get_json::<String, Anchor>(url, None).await {
            Ok(res) => Ok(res),
            Err(e) => Err(e).map_err(|e| InfrastructureError::Http(e).into()),
        }
    }

    pub async fn wait_anchor(&self, anchor_id: i64, mut timeout: i64) -> BloockResult<Anchor> {
        if timeout == 0 {
            timeout = 120000;
        }
        let config = self.config_service.get_config();

        let mut attempts = 0;
        let start = util::get_current_timestamp();
        let mut next_try = start + config.wait_message_interval_default;

        let timeout_time = start + timeout as u128;

        loop {
            if let Ok(anchor) = self.get_anchor(anchor_id).await {
                if anchor.status == "Success" {
                    return Ok(anchor);
                }
            }

            let mut current_time = util::get_current_timestamp();
            if current_time > timeout_time {
                return Err(IntegrityError::AnchorTimeout()).map_err(|e| e.into());
            }

            task::sleep(Duration::from_millis(1000)).await;

            current_time = util::get_current_timestamp();
            while current_time < next_try && current_time < timeout_time {
                task::sleep(Duration::from_millis(200)).await;
                current_time = util::get_current_timestamp();
            }

            if current_time >= timeout_time {
                return Err(IntegrityError::AnchorTimeout()).map_err(|e| e.into());
            }

            next_try += attempts * config.wait_message_interval_factor
                + config.wait_message_interval_default;
            attempts += 1;
        }
    }

    pub async fn get_proof(&self, mut records: Vec<Record>) -> BloockResult<Proof> {
        if records.is_empty() {
            return Err(IntegrityError::InvalidNumberOfRecords().into());
        }

        if records.len() == 1 && records[0].get_proof().is_some() {
            return Ok(records[0].get_proof().unwrap());
        }

        records.sort();

        let url = format!("{}/core/proof", self.config_service.get_api_base_url());

        let body = ProofRetrieveRequest {
            messages: records.iter().map(|record| record.get_hash()).collect(),
        };

        let response = match self
            .http
            .post_json::<String, ProofRetrieveRequest, ProofRetrieveResponse>(url, body, None)
            .await
        {
            Ok(res) => res,
            Err(e) => {
                return Err(
                    InfrastructureError::Http(HttpError::RequestError(e.to_string())).into(),
                )
            }
        };

        response.try_into()
    }

    pub async fn verify_records(
        &self,
        records: Vec<Record>,
        network: Option<Network>,
    ) -> BloockResult<u128> {
        for record in records.iter() {
            let document = match &record.document {
                Some(d) => d,
                None => continue,
            };

            let ok = document.verify().await?;
            if !ok {
                return Err(IntegrityError::InvalidVerification.into());
            }
        }
        let proof = match self.get_proof(records).await {
            Ok(proof) => proof,
            Err(e) => return Err(e),
        };

        let network = match network {
            Some(network) => network,
            None => network::select_network(proof.anchor.root.clone(), &proof.anchor.networks)
                .ok_or(IntegrityError::NoNetworkAvailable)?,
        };

        let root = match self.verify_proof(proof) {
            Ok(root) => root,
            Err(e) => return Err(e),
        };

        self.validate_root(root, network).await
    }

    pub fn verify_proof(&self, proof: Proof) -> BloockResult<Record> {
        let leaves = self.get_leaves(&proof);

        let nodes = self.get_nodes(&proof);

        if proof.depth.len() % 4 != 0 {
            return Err(IntegrityError::InvalidDepth().into());
        }

        let depth: Vec<u16> = match util::hex_to_u16(proof.depth) {
            Ok(bytes) => bytes,
            Err(_) => return Err(IntegrityError::InvalidDepth().into()),
        };

        let bitmap = match hex::decode(proof.bitmap) {
            Ok(bitmap) => BitVec::<u8, Msb0>::from_vec(bitmap),
            Err(_) => return Err(IntegrityError::InvalidBitmap().into()),
        };

        let mut it_leaves: usize = 0;
        let mut it_hashes: usize = 0;
        let mut stack: Vec<(H256, isize)> = Vec::new();

        while it_hashes < nodes.len() || it_leaves < leaves.len() {
            let mut act_depth = match depth.get(it_hashes + it_leaves) {
                Some(x) => *x,
                None => return Err(IntegrityError::InvalidDepth().into()),
            };
            let mut act_hash = match bitmap.get(it_leaves + it_hashes) {
                Some(b) => match *b {
                    true => {
                        it_hashes += 1;
                        nodes[it_hashes - 1]
                    }
                    false => {
                        it_leaves += 1;
                        leaves[it_leaves - 1]
                    }
                },
                None => return Err(IntegrityError::InvalidBitmap().into()),
            };
            while !stack.is_empty() && stack[stack.len() - 1].1 == act_depth as isize {
                let last_hash = stack.pop().unwrap();
                act_hash = merge(&last_hash.0, &act_hash);
                act_depth -= 1;
            }
            stack.push((act_hash, act_depth as isize));
        }

        match &stack.first() {
            Some(r) => Ok(Record::from_hash(r.0)),
            None => Err(IntegrityError::InvalidProof.into()),
        }
    }

    fn get_leaves(&self, proof: &Proof) -> Vec<H256> {
        proof
            .leaves
            .iter()
            .map(|leaf| Record::from_hash(*leaf).get_hash_bytes())
            .collect::<Vec<H256>>()
    }

    fn get_nodes(&self, proof: &Proof) -> Vec<H256> {
        proof
            .nodes
            .iter()
            .map(|node| Record::from_hash(*node).get_hash_bytes())
            .collect::<Vec<H256>>()
    }

    pub async fn validate_root(&self, root: Record, network: Network) -> BloockResult<u128> {
        let config = self.config_service.get_network_config(network);

        match self
            .blockchain_client
            .validate_state(
                config.http_provider,
                config.contract_address,
                root.get_hash(),
                self.config_service.get_api_key(),
            )
            .await
        {
            Ok(timestamp) => Ok(timestamp),
            Err(e) => Err(IntegrityError::BlockchainError(e.to_string()).into()),
        }
    }
}

fn merge(left: &H256, right: &H256) -> H256 {
    let mut vec = left.to_vec();
    vec.extend_from_slice(right);
    Keccak256::generate_hash(&[vec.as_slice()])
}

#[cfg(test)]
mod tests {
    use crate::{
        config,
        error::ErrorKind,
        integrity::{
            configure_test,
            entity::{
                anchor::Anchor,
                dto::{
                    proof_retrieve_request::ProofRetrieveRequest,
                    proof_retrieve_response::ProofRetrieveResponse,
                    record_write_request::RecordWriteRequest,
                    record_write_response::RecordWriteResponse,
                },
                proof::{Proof, ProofAnchor},
            },
            service::merge,
            IntegrityError,
        },
        record::configure_test as record_configure_test,
    };
    use bloock_hasher::from_hex;
    use bloock_http::{HttpError, MockClient};
    use std::sync::Arc;

    #[tokio::test]
    async fn test_send_records_ok() {
        let response = RecordWriteResponse {
            anchor: 80,
            client: "ce10c769-022b-405e-8e7c-3b52eeb2a4ea".to_string(),
            messages: Vec::from([
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ]),
            status: "Pending".to_string(),
        };

        let expected = response.clone();

        let mut http = MockClient::default();
        http.expect_post_json::<String, RecordWriteRequest, RecordWriteResponse>()
            .return_once(|_, _, _| Ok(response));

        let integrity_service = configure_test(Arc::new(http));
        let record_service = record_configure_test(config::configure_test().config_data);
        let result = integrity_service
            .send_records(Vec::from([record_service
                .from_string("Some String")
                .unwrap()
                .build()
                .await
                .unwrap()]))
            .await
            .unwrap();

        assert_eq!(result[0].anchor, expected.anchor);
        assert_eq!(result[0].client, expected.client);
        assert_eq!(
            result[0].record,
            "b585bd5a04d10f064ba44be7fae68c9837bd3be24168bc46bdf041fc2762154b"
        );
        assert_eq!(result[0].status, expected.status);
    }

    #[tokio::test]
    async fn test_get_anchor() {
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected_anchor = anchor.clone();

        let mut http = MockClient::default();
        http.expect_get_json::<String, Anchor>()
            .return_once(|_, _| Ok(anchor));

        let anchor_service = configure_test(Arc::new(http));

        match anchor_service.get_anchor(anchor_id).await {
            Ok(anchor) => assert_eq!(anchor, expected_anchor),
            Err(e) => panic!("{}", e),
        };
    }

    #[tokio::test]
    async fn test_wait_anchor_first_try() {
        test_wait_anchor(0).await;
    }

    #[tokio::test]
    async fn test_wait_anchor_after_1_retries() {
        test_wait_anchor(1).await;
    }

    #[tokio::test]
    async fn test_wait_anchor_timeout() {
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let mut retry_counter = 0;
        let max_retries = 3;

        let mut http = MockClient::default();
        http.expect_get_json::<String, Anchor>()
            .returning(move |_, _| {
                if retry_counter < max_retries {
                    retry_counter += 1;
                    return Err(HttpError::RequestError(String::from(
                        "Anchor not ready yet",
                    )));
                }
                Ok(anchor.clone())
            });

        let anchor_service = configure_test(Arc::new(http));

        match anchor_service.wait_anchor(anchor_id, 1).await {
            Ok(_) => panic!("Wait anchor should've timed out"),
            Err(e) => assert_eq!(
                e.to_string(),
                ErrorKind::Integrity(IntegrityError::AnchorTimeout()).to_string()
            ),
        }
    }

    async fn test_wait_anchor(max_retries: usize) {
        let anchor_id = 1;
        let anchor = Anchor {
            id: anchor_id,
            block_roots: vec![String::from("block_root")],
            networks: vec![],
            root: String::from("root"),
            status: String::from("Success"),
        };

        let expected_anchor = anchor.clone();

        let mut retry_counter = 0;

        let mut http = MockClient::default();
        http.expect_get_json::<String, Anchor>()
            .times(max_retries + 1)
            .returning(move |_, _| {
                if retry_counter < max_retries {
                    retry_counter += 1;
                    return Err(HttpError::RequestError(String::from(
                        "Anchor not ready yet",
                    )));
                }
                Ok(anchor.clone())
            });

        let anchor_service = configure_test(Arc::new(http));

        match anchor_service.wait_anchor(anchor_id, 50000).await {
            Ok(anchor) => assert_eq!(anchor, expected_anchor),
            Err(e) => panic!("{}", e),
        }
    }

    #[tokio::test]
    async fn test_get_proof_success() {
        let nodes = vec![
            from_hex("bb6986853646d083929d1d92638f3d4741a3b7149bd2b63c6bfedd32e3c684d3").unwrap(),
            from_hex("0616067c793ac533815ae2d48d785d339e0330ce5bb5345b5e6217dd9d1dbeab").unwrap(),
            from_hex("68b8f6b25cc700e64ed3e3d33f2f246e24801f93d29786589fbbab3b11f5bcee").unwrap(),
        ];

        let response = ProofRetrieveResponse {
            leaves: vec![
                "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            ],
            nodes: nodes.iter().map(hex::encode).collect(),
            depth: "000400060006000500030002000400060007000800090009".to_string(),
            bitmap: "bfdf7000".to_string(),
            root: "".to_string(),
            anchor: ProofAnchor {
                anchor_id: 1,
                networks: vec![],
                root: "".to_string(),
                status: "pending".to_string(),
            },
        };
        let mut http = MockClient::default();
        http.expect_post_json::<String, ProofRetrieveRequest, ProofRetrieveResponse>()
            .return_once(|_, _, _| Ok(response));

        let service = configure_test(Arc::new(http));
        let record_service = record_configure_test(config::configure_test().config_data);
        let final_response = service
            .get_proof(vec![record_service
                .from_string("Some String")
                .unwrap()
                .build()
                .await
                .unwrap()])
            .await
            .unwrap();

        assert_eq!(final_response.nodes, nodes);
        assert_eq!(final_response.bitmap, "bfdf7000".to_string());
        assert_eq!(
            final_response.depth,
            "000400060006000500030002000400060007000800090009".to_string()
        );
        assert_eq!(
            final_response.leaves,
            vec![
                from_hex("02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5")
                    .unwrap()
            ]
        );
    }

    #[tokio::test]
    async fn test_verify_records_success() {}

    #[tokio::test]
    async fn test_verify_proof_keccak_1() {
        let leaves = vec![
            from_hex("02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5").unwrap(),
            from_hex("5e1712aca5f3925fc0ce628e7da2e1e407e2cc7b358e83a7152b1958f7982dab").unwrap(),
        ];

        let nodes = vec![
            from_hex("1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97").unwrap(),
            from_hex("1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97").unwrap(),
            from_hex("54944fcea707a57048c17ca7453fa5078a031143b44629776750e7f0ff7940f0").unwrap(),
            from_hex("d6f9bcd042be70b39b65dc2a8168858606b0a2fcf6d02c0a1812b1804efc0c37").unwrap(),
            from_hex("e663ec001b81b96eceabd1b766d49ec5d99adedc3e5f03d245b0d90f603f66d3").unwrap(),
        ];

        let depth = "0004000400030004000400030001".to_string();
        let bitmap = "7600".to_string();
        let root = "a1fd8b878cee593a7debf12b5bcbf081a972bbec40e103c6d82197db2751ced7".to_string();
        let anchor = ProofAnchor {
            anchor_id: 1,
            networks: vec![],
            root: "".to_string(),
            status: "pending".to_string(),
        };

        let http = MockClient::default();
        let service = configure_test(Arc::new(http));
        let result = service
            .verify_proof(Proof {
                leaves,
                nodes,
                depth,
                bitmap,
                anchor,
            })
            .unwrap();

        assert_eq!(result.get_hash(), root);
    }

    #[tokio::test]
    async fn test_verify_proof_keccak_2() {
        let leaves = vec![
            from_hex("02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5").unwrap(),
            from_hex("02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5").unwrap(),
            from_hex("5e1712aca5f3925fc0ce628e7da2e1e407e2cc7b358e83a7152b1958f7982dab").unwrap(),
        ];

        let nodes = vec![
            from_hex("1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97").unwrap(),
            from_hex("1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97").unwrap(),
            from_hex("1509877db1aa81c699a144d1a240c5d463c9ff08b2df489b40a35802844baeb6").unwrap(),
            from_hex("54944fcea707a57048c17ca7453fa5078a031143b44629776750e7f0ff7940f0").unwrap(),
            from_hex("d6f9bcd042be70b39b65dc2a8168858606b0a2fcf6d02c0a1812b1804efc0c37").unwrap(),
            from_hex("e663ec001b81b96eceabd1b766d49ec5d99adedc3e5f03d245b0d90f603f66d3").unwrap(),
        ];

        let depth = "000500050004000400040004000400030001".to_string();
        let bitmap = "6d80".to_string();
        let root = "7e1f3c7e6d3515389b6117cc8c1ef5512d51c59743dc097c70de405a91861d2b".to_string();
        let anchor = ProofAnchor {
            anchor_id: 1,
            networks: vec![],
            root: "".to_string(),
            status: "pending".to_string(),
        };

        let http = MockClient::default();
        let service = configure_test(Arc::new(http));
        let result = service
            .verify_proof(Proof {
                leaves,
                nodes,
                depth,
                bitmap,
                anchor,
            })
            .unwrap();

        assert_eq!(result.get_hash(), root);
    }

    #[tokio::test]
    async fn test_verify_proof_keccak_3() {
        let leaves =
            vec![
                from_hex("0000000000000000000000000000000000000000000000000000000000000000")
                    .unwrap(),
            ];
        let nodes =
            vec![
                from_hex("f49d70da1c2c8989766908e06b8d2277a6954ec8533696b9a404b631b0b7735a")
                    .unwrap(),
            ];
        let depth = "00010001".to_string();
        let bitmap = "4000".to_string();
        let root = "5c67902dc31624d9278c286ef4ce469451d8f1d04c1edb29a5941ca0e03ddc8d".to_string();
        let anchor = ProofAnchor {
            anchor_id: 1,
            networks: vec![],
            root: "".to_string(),
            status: "pending".to_string(),
        };
        let http = MockClient::default();
        let service = configure_test(Arc::new(http));
        let result = service
            .verify_proof(Proof {
                leaves,
                nodes,
                depth,
                bitmap,
                anchor,
            })
            .unwrap();

        assert_eq!(result.get_hash(), root);
    }

    #[test]
    fn test_keccak_merge() {
        //0x8e4b8e18156a1c7271055ce5b7ef53bb370294ebd631a3b95418a92da46e681f
        let a: [u8; 32] = [0u8; 32];
        let b: [u8; 32] = [1u8; 32];

        assert_eq!(
            merge(&a, &b),
            [
                213, 244, 247, 225, 217, 137, 132, 132, 128, 35, 111, 176, 165, 248, 8, 213, 135,
                122, 191, 119, 131, 100, 174, 80, 132, 82, 52, 221, 108, 30, 128, 252
            ],
            "The hash calculated was incorrect."
        );
    }
}
