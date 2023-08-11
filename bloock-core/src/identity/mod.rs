use crate::config::{self, config_data::ConfigData};
use crate::error::BloockError;
use crate::error::ErrorKind;
use crate::{availability, integrity};
use bloock_http::BloockHttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error as ThisError;

pub mod entity;
pub mod service;

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum IdentityError {
    #[error("Error while creating key")]
    CreateKeyError(),
    #[error("Error while loading key")]
    LoadKeyError(),
    #[error("Error while creating schema: {0}")]
    CreateSchemaError(String),
    #[error("Error while parsing schema: {0}")]
    SchemaParseError(String),
    #[error("Invalid attribute provided")]
    InvalidAttributeError(),
    #[error("Error while creating credential: {0}")]
    CreateCredentialError(String),
    #[error("Error while getting offer: {0}")]
    GetOfferError(String),
    #[error("Error while redeeming credential: {0}")]
    RedeemCredentialError(String),
    #[error("Error while getting credential: {0}")]
    GetCredentialError(String),
    #[error("Invalid key provided")]
    InvalidKeyProvided(),
    #[error("Invalid proof provided")]
    InvalidProofError(),
    #[error("Invalid proof type provided")]
    InvalidProofTypeProvided(),
    #[error("Invalid signature provided")]
    InvalidSignatureError(),
    #[error("Invalid credential provided")]
    InvalidCredentialError(),
    #[error("Error while revoking credential: {0}")]
    RevokeCredentialError(String),
    #[error("Wait offer timed out")]
    OfferTimeoutError(),
}

impl From<IdentityError> for BloockError {
    fn from(err: IdentityError) -> Self {
        Self(ErrorKind::Identity(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::IdentityService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(
        config_data.get_config().api_key,
        None,
    ));
    let availability_service = availability::configure(config_data.clone());
    let integrity_service = integrity::configure(config_data.clone());

    service::IdentityService {
        http: bloock_http_client,
        config_service: config::configure(config_data),
        availability_service,
        integrity_service,
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::IdentityService<MockClient> {
    service::IdentityService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
        availability_service: availability::configure_test(Arc::clone(&http)),
        integrity_service: integrity::configure_test(Arc::clone(&http)),
    }
}
