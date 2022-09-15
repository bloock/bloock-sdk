use std::convert::TryInto;

use async_trait::async_trait;
use bloock_core::{
    client,
    error::{BloockError, BloockResult},
    proof::entity::proof::Proof,
    record::entity::record::Record,
};

use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        Error, GetProofRequest, GetProofResponse, ProofServiceHandler, ValidateRootRequest,
        ValidateRootResponse, VerifyProofRequest, VerifyProofResponse, VerifyRecordsRequest,
        VerifyRecordsResponse,
    },
};

use super::response_types::ResponseType;

impl From<GetProofResponse> for ResponseType {
    fn from(res: GetProofResponse) -> Self {
        ResponseType::GetProof(res)
    }
}

impl From<ValidateRootResponse> for ResponseType {
    fn from(res: ValidateRootResponse) -> Self {
        ResponseType::ValidateRoot(res)
    }
}

impl From<VerifyProofResponse> for ResponseType {
    fn from(res: VerifyProofResponse) -> Self {
        ResponseType::VerifyProof(res)
    }
}

impl From<VerifyRecordsResponse> for ResponseType {
    fn from(res: VerifyRecordsResponse) -> Self {
        ResponseType::VerifyRecords(res)
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

        let client = client::configure(config_data);

        let records = match req
            .records
            .iter()
            .map(|record| record.try_into())
            .collect::<BloockResult<Vec<Record>>>()
        {
            Ok(r) => r,
            Err(e) => return GetProofResponse::new_error(e.to_string()),
        };

        let proof = match client.get_proof(records).await {
            Ok(proof) => proof,
            Err(e) => return GetProofResponse::new_error(e.to_string()),
        };

        GetProofResponse {
            proof: Some(proof.into()),
            error: None,
        }
    }

    async fn validate_root(&self, req: ValidateRootRequest) -> ValidateRootResponse {
        let config_data = match map_config(req.config_data.clone()) {
            Ok(config) => config,
            Err(_) => {
                return ValidateRootResponse {
                    timestamp: 0,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let req_root: Result<Record, BloockError> = (&req.root).try_into();
        let root = match req_root {
            Ok(r) => r,
            Err(e) => return ValidateRootResponse::new_error(e.to_string()),
        };

        let timestamp = match client.validate_root(root, req.network().into()).await {
            Ok(proof) => proof,
            Err(e) => return ValidateRootResponse::new_error(e.to_string()),
        };

        ValidateRootResponse {
            timestamp: timestamp as u64,
            error: None,
        }
    }

    async fn verify_proof(&self, req: VerifyProofRequest) -> VerifyProofResponse {
        let config_data = match map_config(req.config_data.clone()) {
            Ok(config) => config,
            Err(_) => {
                return VerifyProofResponse {
                    record: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let req_proof: Result<Proof, BridgeError> = match req.proof {
            Some(proof) => proof.try_into(),
            None => return VerifyProofResponse::new_error("Missing proof in request".to_string()),
        };
        let proof = match req_proof {
            Ok(proof) => proof,
            Err(e) => return VerifyProofResponse::new_error(e.to_string()),
        };

        let record = match client.verify_proof(proof) {
            Ok(record) => record,
            Err(e) => return VerifyProofResponse::new_error(e.to_string()),
        };

        VerifyProofResponse {
            record: Some(record.get_hash()),
            error: None,
        }
    }

    async fn verify_records(&self, req: VerifyRecordsRequest) -> VerifyRecordsResponse {
        let config_data = match map_config(req.config_data.clone()) {
            Ok(config) => config,
            Err(_) => {
                return VerifyRecordsResponse {
                    timestamp: 0,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let records = match req
            .records
            .iter()
            .map(|r| r.try_into())
            .collect::<Result<Vec<Record>, BloockError>>()
        {
            Ok(r) => r,
            Err(e) => return VerifyRecordsResponse::new_error(e.to_string()),
        };

        let timestamp = match client
            .verify_records(records, Some(req.network().into()))
            .await
        {
            Ok(timestamp) => timestamp,
            Err(e) => return VerifyRecordsResponse::new_error(e.to_string()),
        };

        VerifyRecordsResponse {
            timestamp: timestamp as u64,
            error: None,
        }
    }
}

impl GetProofResponse {
    fn new_error(err: String) -> GetProofResponse {
        GetProofResponse {
            proof: None,
            error: Some(proof_error(err)),
        }
    }
}

impl ValidateRootResponse {
    fn new_error(err: String) -> ValidateRootResponse {
        ValidateRootResponse {
            timestamp: 0,
            error: Some(proof_error(err)),
        }
    }
}

impl VerifyProofResponse {
    fn new_error(err: String) -> VerifyProofResponse {
        VerifyProofResponse {
            record: None,
            error: Some(proof_error(err)),
        }
    }
}

impl VerifyRecordsResponse {
    fn new_error(err: String) -> VerifyRecordsResponse {
        VerifyRecordsResponse {
            timestamp: 0,
            error: Some(proof_error(err)),
        }
    }
}

fn proof_error(err: String) -> Error {
    Error {
        kind: BridgeError::ProofError.to_string(),
        message: err,
    }
}
