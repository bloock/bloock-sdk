use std::convert::TryInto;

use async_trait::async_trait;
use bloock_core::{
    client::{self, BloockClient},
    config::entity::network::Network,
    error::{BloockError, BloockResult},
    proof::entity::proof::Proof,
    record::entity::record::Record,
};
use serde_json::json;

use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        BloockServer, Error, GetProofRequest, GetProofResponse, Proof as ItemsProof,
        ProofServiceHandler, ValidateRootRequest, ValidateRootResponse, VerifyProofRequest,
        VerifyProofResponse, VerifyRecordsRequest, VerifyRecordsResponse,
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
        let config_data = match map_config(req.config_data.clone()) {
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
            Err(e) => return GetProofResponse::new_error(&client, e.to_string(), &req).await,
        };

        let proof = match client.get_proof(records).await {
            Ok(proof) => proof,
            Err(e) => return GetProofResponse::new_error(&client, e.to_string(), &req).await,
        };

        GetProofResponse::new_success(&client, proof.into(), &req).await
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
            Err(e) => return ValidateRootResponse::new_error(&client, e.to_string(), &req).await,
        };

        let timestamp = match client.validate_root(root, req.network().into()).await {
            Ok(proof) => proof,
            Err(e) => return ValidateRootResponse::new_error(&client, e.to_string(), &req).await,
        };

        ValidateRootResponse::new_success(&client, timestamp as u64, &req).await
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

        let req_proof: Result<Proof, BridgeError> = match req.proof.clone() {
            Some(proof) => proof.try_into(),
            None => {
                return VerifyProofResponse::new_error(
                    &client,
                    "Missing proof in request".to_string(),
                    &req,
                )
                .await
            }
        };
        let proof = match req_proof {
            Ok(proof) => proof,
            Err(e) => return VerifyProofResponse::new_error(&client, e.to_string(), &req).await,
        };

        let record = match client.verify_proof(proof) {
            Ok(record) => record,
            Err(e) => return VerifyProofResponse::new_error(&client, e.to_string(), &req).await,
        };

        VerifyProofResponse::new_success(&client, record.get_hash(), &req).await
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
            Err(e) => return VerifyRecordsResponse::new_error(&client, e.to_string(), &req).await,
        };

        let timestamp = match client
            .verify_records(records, Some(req.network().into()))
            .await
        {
            Ok(timestamp) => timestamp,
            Err(e) => return VerifyRecordsResponse::new_error(&client, e.to_string(), &req).await,
        };

        VerifyRecordsResponse::new_success(&client, timestamp as u64, &req).await
    }
}

impl GetProofResponse {
    async fn new_success(
        client: &BloockClient,
        proof: ItemsProof,
        req: &GetProofRequest,
    ) -> GetProofResponse {
        Self::send_event(client, req, None).await;

        GetProofResponse {
            proof: Some(proof),
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &GetProofRequest,
    ) -> GetProofResponse {
        Self::send_event(client, req, Some(&err)).await;

        GetProofResponse {
            proof: None,
            error: Some(proof_error(err)),
        }
    }

    async fn send_event(client: &BloockClient, req: &GetProofRequest, error: Option<&str>) {
        let event_attr = json! ({
            "records": req.records,
        });

        let error = match error {
            Some(_) => Some(BridgeError::ProofError.to_string()),
            None => None,
        };

        client
            .send_event(
                BloockServer::ProofServiceGetProof.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl ValidateRootResponse {
    async fn new_success(
        client: &BloockClient,
        timestamp: u64,
        req: &ValidateRootRequest,
    ) -> ValidateRootResponse {
        Self::send_event(client, req, None).await;

        ValidateRootResponse {
            timestamp,
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &ValidateRootRequest,
    ) -> ValidateRootResponse {
        Self::send_event(client, req, Some(&err)).await;

        ValidateRootResponse {
            timestamp: 0,
            error: Some(proof_error(err)),
        }
    }

    async fn send_event(client: &BloockClient, req: &ValidateRootRequest, error: Option<&str>) {
        let network: Network = req.network().into();
        let event_attr = json!({ "network": String::from(network) });

        let error = match error {
            Some(_) => Some(BridgeError::ProofError.to_string()),
            None => None,
        };

        client
            .send_event(
                BloockServer::ProofServiceValidateRoot.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl VerifyProofResponse {
    async fn new_success(
        client: &BloockClient,
        record: String,
        req: &VerifyProofRequest,
    ) -> VerifyProofResponse {
        Self::send_event(client, req, None).await;

        VerifyProofResponse {
            record: Some(record),
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &VerifyProofRequest,
    ) -> VerifyProofResponse {
        Self::send_event(client, req, Some(&err)).await;

        VerifyProofResponse {
            record: None,
            error: Some(proof_error(err)),
        }
    }

    async fn send_event(client: &BloockClient, _req: &VerifyProofRequest, error: Option<&str>) {
        let event_attr = json!({});

        let error = match error {
            Some(_) => Some(BridgeError::ProofError.to_string()),
            None => None,
        };

        client
            .send_event(
                BloockServer::ProofServiceVerifyProof.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl VerifyRecordsResponse {
    async fn new_success(
        client: &BloockClient,
        timestamp: u64,
        req: &VerifyRecordsRequest,
    ) -> VerifyRecordsResponse {
        Self::send_event(client, req, None).await;

        VerifyRecordsResponse {
            timestamp,
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &VerifyRecordsRequest,
    ) -> VerifyRecordsResponse {
        Self::send_event(client, req, Some(&err)).await;

        VerifyRecordsResponse {
            timestamp: 0,
            error: Some(proof_error(err)),
        }
    }

    async fn send_event(client: &BloockClient, req: &VerifyRecordsRequest, error: Option<&str>) {
        let network: Network = req.network().into();
        let event_attr = json! ({
            "network": String::from(network),
            "records_size": req.records.len(),
        });

        let error = match error {
            Some(_) => Some(BridgeError::ProofError.to_string()),
            None => None,
        };

        client
            .send_event(
                BloockServer::ProofServiceVerifyProof.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

fn proof_error(err: String) -> Error {
    Error {
        kind: BridgeError::ProofError.to_string(),
        message: err,
    }
}
