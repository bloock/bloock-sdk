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
pub enum ProofError {
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
}

impl From<ProofError> for BloockError {
    fn from(err: ProofError) -> Self {
        Self(ErrorKind::Proof(err))
    }
}

pub fn configure(
    http: Arc<BloockHttpClient>,
    config_data: Arc<ConfigData>,
) -> service::ProofService<BloockHttpClient> {
    service::ProofService {
        http: Arc::clone(&http),
        config_service: config::configure(Arc::clone(&config_data)),
        blockchain_client: Blockchain {},
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::ProofService<MockClient> {
    service::ProofService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
        blockchain_client: Blockchain {},
    }
}
