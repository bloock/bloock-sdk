// TODO Re-enable warnings
// TODO Re-enable warnings
// TODO Re-enable warnings
// TODO Re-enable warnings
// TODO Re-enable warnings
#![allow(unused)]

use bitvec::{order::Msb0, prelude::BitVec};
use bloock_hashing::hashing::{Keccak256, H256};
use bloock_http::{Client, HttpError};
use bloock_web3::blockchain::Blockchain;

use std::sync::Arc;

use crate::{
    config::{
        entity::network::{self, Network},
        service::ConfigService,
    },
    error::{BloockResult, InfrastructureError, OperationalError},
    record::{entity::record::Record, RecordError},
};

use super::{
    entity::{dto::proof_retrieve_request::ProofRetrieveRequest, proof::Proof},
    ProofError,
};

pub struct ProofService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
    pub blockchain_client: Blockchain,
}

impl<H: Client> ProofService<H> {
    async fn get_proof(&self, mut records: Vec<Record>) -> BloockResult<Proof> {
        if records.len() == 0 {
            return Err(ProofError::InvalidNumberOfRecords().into());
        }

        if records.iter().any(|record| !record.is_valid()) {
            return Err(RecordError::InvalidRecord().into());
        }

        records.sort();

        let url = match self.config_service.get_api_base_url() {
            Ok(base_url) => format!("{}/core/proof", base_url),
            Err(e) => return Err(e).map_err(|e| e.into()),
        };

        let body = ProofRetrieveRequest {
            messages: records.iter().map(|record| record.get_hash()).collect(),
        };

        let proof = match self
            .http
            .post::<String, ProofRetrieveRequest, Proof>(url, body, None)
            .await
        {
            Ok(res) => res,
            Err(e) => {
                return Err(
                    InfrastructureError::Http(HttpError::RequestError(e.to_string())).into(),
                )
            }
        };

        return Ok(proof);
    }

    async fn verify_records(
        &self,
        records: Vec<Record>,
        network: Option<Network>,
    ) -> BloockResult<u128> {
        if records.iter().any(|record| !record.is_valid()) {
            return Err(RecordError::InvalidRecord().into());
        }

        let proof = match self.get_proof(records).await {
            Ok(proof) => proof,
            Err(e) => return Err(e),
        };

        let network = match network {
            Some(network) => network,
            None => network::select_network(&proof.anchor.networks),
        };

        let root = match self.verify_proof(proof) {
            Ok(root) => root,
            Err(e) => return Err(e.into()),
        };

        self.validate_root(root, network).await
    }

    fn verify_proof(&self, proof: Proof) -> BloockResult<Record> {
        let leaves = match self.get_leaves(&proof) {
            Ok(leaves) => leaves,
            Err(e) => return Err(e),
        };

        let nodes = match self.get_nodes(&proof) {
            Ok(hashes) => hashes,
            Err(e) => return Err(e),
        };

        if proof.depth.len() % 4 != 0 {
            return Err(ProofError::InvalidDepth().into());
        }

        let depth: Vec<u16> = match hex::decode(proof.depth) {
            Ok(bytes) => {
                // TODO Move to util for re-useability?
                let mut result = vec![0; bytes.len() / 2];
                for i in (1..result.len()) {
                    result[i] = bytes[i * 2 + 1] as u16 + ((bytes[i * 2] as u16) << 8);
                }
                result
            }
            Err(_) => return Err(ProofError::InvalidDepth().into()),
        };

        let bitmap = match hex::decode(proof.bitmap) {
            Ok(bitmap) => BitVec::<u8, Msb0>::from_vec(bitmap),
            Err(_) => return Err(ProofError::InvalidBitmap().into()),
        };

        let mut it_leaves: usize = 0;
        let mut it_hashes: usize = 0;
        let mut stack: Vec<(H256, isize)> = Vec::new();

        println!("depth: {:?}, bitmap: {:?}", depth, bitmap);
        while it_hashes < nodes.len() || it_leaves < leaves.len() {
            let mut act_depth = match depth.get(it_hashes + it_leaves) {
                Some(x) => *x,
                None => return Err(ProofError::InvalidDepth().into()),
            };
            let mut act_hash = match bitmap.get(it_leaves + it_hashes) {
                Some(b) => match *b {
                    true => {
                        println!("Bit True => leaves: {}, hashes: {}", it_leaves, it_hashes);
                        it_hashes += 1;
                        match nodes.get(it_hashes - 1) {
                            Some(l) => *l,
                            None => return Err(OperationalError::InvalidHash().into()),
                        }
                    }
                    false => {
                        println!("Bit False => leaves: {}, hashes: {}", it_leaves, it_hashes);
                        it_leaves += 1;
                        match leaves.get(it_leaves - 1) {
                            Some(l) => *l,
                            None => return Err(OperationalError::InvalidHash().into()),
                        }
                    }
                },
                None => return Err(ProofError::InvalidBitmap().into()),
            };
            while !stack.is_empty() && stack[stack.len() - 1].1 == act_depth as isize {
                let last_hash = stack.pop().unwrap();
                act_hash = match Keccak256::merge(&last_hash.0, &act_hash) {
                    Ok(h) => h,
                    Err(_) => return Err(OperationalError::MergeError().into()),
                };
                act_depth -= 1;
            }
            stack.push((act_hash, act_depth as isize));
        }

        match &stack.get(0) {
            Some(r) => Ok(Record::from_hash(&hex::encode(&r.0))),
            None => Err(OperationalError::InvalidHash().into()),
        }
    }

    fn get_leaves(&self, proof: &Proof) -> BloockResult<Vec<H256>> {
        proof
            .leaves
            .iter()
            .map(|leaf| Ok(Record::from_hash(leaf).get_uint8_array_hash()?))
            .collect::<BloockResult<Vec<H256>>>()
    }

    fn get_nodes(&self, proof: &Proof) -> BloockResult<Vec<H256>> {
        proof
            .nodes
            .iter()
            .map(|node| match hex::decode(node) {
                Ok(node) => node
                    .try_into()
                    .map_err(|_| OperationalError::InvalidHash().into()),
                Err(_) => Err(OperationalError::InvalidHash().into()),
            })
            .collect::<BloockResult<Vec<H256>>>()
    }

    async fn validate_root(&self, root: Record, network: Network) -> BloockResult<u128> {
        let config = match self.config_service.get_network_config(network) {
            Ok(config) => config,
            Err(e) => return Err(e),
        };

        match self
            .blockchain_client
            .validate_state(config.http_provider, "".to_string(), root.get_hash())
            .await
        {
            Ok(state) => Ok(state),
            Err(_) => Err(ProofError::BlockchainError().into()),
        }
    }
}

#[cfg(test)]
mod tests {
    use std::sync::Arc;

    use bloock_http::MockClient;

    use crate::{
        anchor::entity::anchor::Anchor,
        proof::{configure_test, entity::proof::Proof},
    };

    use super::ProofService;

    #[tokio::test]
    async fn test_verify_proof_keccak_1() {
        let leaves = vec![
            "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5".to_string(),
            "5e1712aca5f3925fc0ce628e7da2e1e407e2cc7b358e83a7152b1958f7982dab".to_string(),
        ];

        let nodes = vec![
            "1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97".to_string(),
            "1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97".to_string(),
            "54944fcea707a57048c17ca7453fa5078a031143b44629776750e7f0ff7940f0".to_string(),
            "d6f9bcd042be70b39b65dc2a8168858606b0a2fcf6d02c0a1812b1804efc0c37".to_string(),
            "e663ec001b81b96eceabd1b766d49ec5d99adedc3e5f03d245b0d90f603f66d3".to_string(),
        ];

        let depth = "0004000400030004000400030001".to_string();
        let bitmap = "7600".to_string();
        let root = "a1fd8b878cee593a7debf12b5bcbf081a972bbec40e103c6d82197db2751ced7".to_string();
        let anchor = Anchor {
            id: 1,
            block_roots: vec!["".to_string()],
            networks: vec![],
            root: "".to_string(),
            status: "pending".to_string(),
        };

        let mut http = MockClient::default();
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

    // #[tokio::test]
    // async fn test_verify_proof_keccak_2() {
    //     unimplemented!();
    // }

    // #[tokio::test]
    // async fn test_verify_proof_keccak_3() {
    //     unimplemented!();
    // }
}
