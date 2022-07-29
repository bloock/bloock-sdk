use bitvec::prelude::BitVec;
use bloock_http::{Client, HttpError};
use bloock_web3::blockchain::Blockchain;
use hex::FromHexError;
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
        let leaves = match proof
            .leaves
            .iter()
            .map(|leaf| Ok(Record::from_hash(leaf).get_uint8_array_hash()?))
            .collect::<BloockResult<Vec<Vec<u8>>>>()
        {
            Ok(leaves) => leaves,
            Err(e) => return Err(OperationalError::InvalidHash().into()),
        };

        let hashes = match proof
            .nodes
            .iter()
            .map(|node| hex::decode(node))
            .collect::<Result<Vec<Vec<u8>>, FromHexError>>()
        {
            Ok(hashes) => hashes,
            Err(e) => return Err(OperationalError::InvalidHash().into()),
        };

        let depth = Vec::<u16>::new();

        let bitmap = match hex::decode(proof.bitmap) {
            Ok(bitmap) => BitVec::<u8>::from_vec(bitmap).as_bitslice(),
            Err(_) => return Err(OperationalError::InvalidHash().into()),
        };

        let mut it_leaves: usize = 0;
        let mut it_hashes: usize = 0;
        let mut stack: Vec<(Vec<u8>, isize)> = Vec::new();

        while it_hashes < hashes.len() || it_leaves < leaves.len() {
            let mut act_depth = match depth.get(it_hashes + it_leaves) {
                Some(x) => *x,
                // TODO Define a specific error
                // TODO Define a specific error
                // TODO Define a specific error
                None => return Err(ProofError::InvalidSignature().into()),
            };
            let mut act_hash = match bitmap.get(it_leaves + it_hashes) {
                Some(b) => match *b {
                    false => {
                        it_leaves += 1;
                        match leaves.get(it_leaves - 1) {
                            Some(l) => *l,
                            // TODO Define a specific error
                            // TODO Define a specific error
                            // TODO Define a specific error
                            None => return Err(ProofError::InvalidSignature().into()),
                        }
                    }
                    true => {
                        it_hashes += 1;
                        match hashes.get(it_hashes - 1) {
                            Some(l) => *l,
                            // TODO Define a specific error
                            // TODO Define a specific error
                            // TODO Define a specific error
                            None => return Err(ProofError::InvalidSignature().into()),
                        }
                    }
                },
                // TODO Define a specific error
                // TODO Define a specific error
                // TODO Define a specific error
                None => return Err(ProofError::InvalidSignature().into()),
            };
            // while !stack.is_empty() && stack[stack.len() - 1].1 == act_depth as isize {
            //     let last_hash = stack.pop().unwrap();
            //     act_hash = match H::merge(&last_hash.0, &act_hash) {
            //         Ok(h) => h,
            //         Err(_) => return false,
            //     };
            //     act_depth -= 1;
            // }
            stack.push((act_hash, act_depth as isize));
        }
        // (root
        //     == match &stack.get(0) {
        //         Some(r) => &r.0,
        //         None => return false,
        //     })
        //     && (root == &self.root)
        todo!()
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
            Err(e) => Err(ProofError::BlockchainError().into()),
        }
    }

    fn verify_signatures(&self, records: &Vec<Record>) -> BloockResult<bool> {
        todo!()
    }
}
