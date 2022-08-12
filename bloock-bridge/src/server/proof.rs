use async_trait::async_trait;
use bloock_core::client;

use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        Error, GetProofRequest, GetProofResponse, ProofServiceHandler, ValidateProofRequest,
        ValidateProofResponse, ValidateRootRequest, ValidateRootResponse, VerifyRecordsRequest,
        VerifyRecordsResponse,
    },
};

use super::response_types::ResponseType;

impl From<GetProofResponse> for ResponseType {
    fn from(res: GetProofResponse) -> Self {
        ResponseType::GetProof(res)
    }
}

pub struct ProofServer {}

#[async_trait(?Send)]
impl ProofServiceHandler for ProofServer {
    async fn get_proof(&self, req: GetProofRequest) -> GetProofResponse {
        let config_data = match map_config(req.config_data) {
            Ok(config) => config,
            Err(_) => {
                return GetProofResponse {
                    proof: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let records = req
            .records
            .iter()
            .map(|record| record.clone().into())
            .collect();

        let client = client::configure(config_data);

        let proof = match client.get_proof(records).await {
            Ok(proof) => proof,
            Err(e) => {
                return GetProofResponse {
                    proof: None,
                    error: Some(Error {
                        kind: BridgeError::ProofError.to_string(),
                        message: e.to_string(),
                    }),
                };
            }
        };

        GetProofResponse {
            proof: Some(proof.into()),
            error: None,
        }
    }
    async fn validate_root(&self, input: ValidateRootRequest) -> ValidateRootResponse {
        todo!()
    }
    async fn validate_proof(&self, input: ValidateProofRequest) -> ValidateProofResponse {
        todo!()
    }
    async fn verify_records(&self, input: VerifyRecordsRequest) -> VerifyRecordsResponse {
        todo!()
    }
}
