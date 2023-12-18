use bloock_http::BloockHttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use bloock_web3::blockchain::Blockchain;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error;

use crate::{
    config::{self, config_data::ConfigData},
    error::{BloockError, ErrorKind},
};

pub mod entity;
pub mod service;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum IntegrityError {
    #[error("Invalid number of records")]
    InvalidNumberOfRecords(),
    #[error("Blockchain Error - {0}")]
    BlockchainError(String),
    #[error("Verification Error - {0}")]
    VerificationError(String),
    #[error("Invalid depth")]
    InvalidDepth(),
    #[error("Invalid bitmap")]
    InvalidBitmap(),
    #[error("Invalid leaf")]
    InvalidLeaf,
    #[error("Invalid node")]
    InvalidNode,
    #[error("Invalid proof")]
    InvalidProof,
    #[error("Invalid verification")]
    InvalidVerification,
    #[error("The proof's hash can only be retrieved from proofs of only one record")]
    CannotRetrieveHash(),
    #[error("Only proofs for one record are allowed to be set")]
    OnlyOneRecordProof(),
    #[error("This proof is from another record")]
    ProofFromAnotherRecord(),
    #[error("Wait Anchor timed out")]
    AnchorTimeout(),
    #[error("No network available for verification")]
    NoNetworkAvailable,
}

impl From<IntegrityError> for BloockError {
    fn from(err: IntegrityError) -> Self {
        Self(ErrorKind::Integrity(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::IntegrityService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(
        config_data.get_config().api_key,
        config_data.get_config().environment,
        None,
    ));

    service::IntegrityService {
        http: bloock_http_client,
        config_service: config::configure(config_data),
        blockchain_client: Blockchain {},
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::IntegrityService<MockClient> {
    service::IntegrityService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
        blockchain_client: Blockchain {},
    }
}
