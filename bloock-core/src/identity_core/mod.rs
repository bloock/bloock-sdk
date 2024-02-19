use serde::Serialize;
use std::sync::Arc;
use thiserror::Error as ThisError;

use bloock_http::BloockHttpClient;

use crate::{
    availability,
    config::{self, config_data::ConfigData},
    error::{BloockError, ErrorKind},
    integrity,
};

pub mod entity;
pub mod service;

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum IdentityCoreError {
    #[error("Error while parsing schema: {0}")]
    SchemaParseError(String),
    #[error("Error while creating credential: {0}")]
    CreateCredentialError(String),
    #[error("Error while updating draft state signature: {0}")]
    UpdateDraftStateSignatureError(String),
    #[error("Empty identity api host provided")]
    EmptyApiHostError(),
    #[error("Error while getting credential proof: {0}")]
    GetCredentialProofError(String),
}

impl From<IdentityCoreError> for BloockError {
    fn from(err: IdentityCoreError) -> Self {
        Self(ErrorKind::IdentityCore(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::IdentityCoreService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(
        config_data.get_config().api_key,
        config_data.get_config().environment,
        None,
    ));
    let availability_service = availability::configure(config_data.clone());
    let integrity_service = integrity::configure(config_data.clone());

    service::IdentityCoreService {
        http: bloock_http_client,
        config_service: config::configure(config_data),
        availability_service,
        integrity_service,
    }
}
