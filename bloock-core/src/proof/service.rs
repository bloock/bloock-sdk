use bloock_http::{Client, HttpError};
use std::sync::Arc;

use crate::{
    config::{
        entity::network::{self, Network},
        service::ConfigService,
    },
    error::{BloockResult, InfrastructureError},
    record::{entity::record::Record, RecordError},
};

use super::{
    entity::{dto::proof_retrieve_request::ProofRetrieveRequest, proof::Proof},
    ProofError,
};

pub struct ProofService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> ProofService<H> {
    async fn get_proof(&self, mut records: Vec<Record>) -> BloockResult<Proof> {
        if records.len() == 0 {
            return Err(ProofError::InvalidNumberOfRecords().into());
        }

        if records.iter().any(|record| !record.is_valid()) {
            return Err(RecordError::InvalidRecord().into());
        }

        if records.len() == 1 {
            // if let Some(proof) = records[0].get_proof() {
            //     return Ok(proof);
            // }
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

        if records.len() == 1 {
            // records[0].set_proof(&proof);
        }
        return Ok(proof);
    }

    async fn verify_records(
        &self,
        records: Vec<Record>,
        network: Option<Network>,
    ) -> BloockResult<i32> {
        if !self.verify_signatures(&records) {
            return Err(ProofError::InvalidSignature().into());
        }

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

        Ok(self.validate_root(root, network))
    }

    fn verify_proof(&self, proof: Proof) -> BloockResult<Record> {
        // let leaves: Result<Vec<_>, _> = match proof
        //     .leaves
        //     .iter()
        //     .map(|leaf| Record::from_hash(*leaf).get_hash_bytes())
        //     .collect()
        // {
        //     Ok(leaves) => leaves,
        //     Err(e) => return Err(ProofError::InvalidHash()),
        // };
        // let hashes = match proof.nodes.iter().map(|node| hex::decode(node)).collect() {
        //     Ok(hashes) => hashes,
        //     Err(e) => return Err(ProofError::InvalidHash()),
        // };

        // let bitmap = match hex::decode(proof.bitmap) {
        //     Ok(bitmap) => bitmap,
        //     Err(_) => return Err(ProofError::InvalidHash()),
        // };

        // let mut it_leaves: usize = 0;
        // let mut it_hashes: usize = 0;
        todo!()
    }

    fn validate_root(&self, root: Record, network: Network) -> i32 {
        // self.blockchain_client.validate_root(network, root.get_hash())
        todo!()
    }

    fn verify_signatures(&self, records: &Vec<Record>) -> bool {
        todo!()
    }
}
