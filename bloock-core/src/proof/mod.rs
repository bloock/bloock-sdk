use bloock_http::HttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use serde::Serialize;
use thiserror::Error;
use std::sync::Arc;

use crate::error::{BloockError, ErrorKind};

pub mod entity;
pub mod service;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum ProofError {
    #[error("Invalid number of records")]
    InvalidNumberOfRecords(),
    #[error("Invalid signature")]
    InvalidSignature(),
    #[error("Blockchain Error")]
    BlockchainError(),
}

impl From<ProofError> for BloockError {
    fn from(err: ProofError) -> Self {
        Self(ErrorKind::Proof(err))
    }
}

pub fn configure(http: Arc<HttpClient>) -> service::ProofService<HttpClient> {
    return service::ProofService {
        http: Arc::clone(&http),
    };
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::ProofService<MockClient> {
    return service::ProofService {
        http: Arc::clone(&http),
    };
}
