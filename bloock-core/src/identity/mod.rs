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
    #[error("Error while creating identity: {0}")]
    CreateIdentityError(String),
    #[error("Error while creating issuer: {0}")]
    CreateIssuerError(String),
    #[error("Error while updating draft state signature: {0}")]
    UpdateDraftStateSignatureError(String),
    #[error("Error importing issuer: {0}")]
    ImportIssuerError(String),
    #[error("Error while getting credential offer: {0}")]
    GetCredentialOfferError(String),
    #[error("Error while redeeming credential: {0}")]
    RedeemCredentialError(String),
    #[error("Error while getting credential: {0}")]
    GetCredentialError(String),
    #[error("Invalid key provided")]
    InvalidKeyProvided(),
    #[error("Invalid proof provided")]
    InvalidProofError(),
    #[error("Empty proof field response")]
    EmptyProofFieldError(),
    #[error("Invalid signature provided")]
    InvalidSignatureError(),
    #[error("Invalid credential provided")]
    InvalidCredentialError(),
    #[error("Error while revoking credential: {0}")]
    RevokeCredentialError(String),
    #[error("Wait offer timed out")]
    OfferTimeoutError(),
    #[error("Error while publishing issuer state: {0}")]
    PublishIssuerStateError(String),
    #[error("No unprocessed states for the given issuer")]
    ErrorUnprocessedState(),
    #[error("Error while getting credential proof: {0}")]
    GetCredentialProofError(String),
    #[error("Error while creating verification: {0}")]
    CreateVerificationError(String),
    #[error("Invalid JSON provided")]
    InvalidJson,
    #[error("Wait Verification timed out")]
    VerificationTimeout(),
    #[error("Empty identity api host provided")]
    EmptyApiHostError(),
    #[error("Invalid did method")]
    InvalidDidMethod(),
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
