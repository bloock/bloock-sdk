use bloock_http::HttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use bloock_web3::blockchain::Blockchain;
use serde::Serialize;
use std::sync::{Arc, Mutex};
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
    #[error("Blockchain Error")]
    BlockchainError(),
    #[error("Invalid depth")]
    InvalidDepth(),
    #[error("Invalid bitmap")]
    InvalidBitmap(),
}

impl From<ProofError> for BloockError {
    fn from(err: ProofError) -> Self {
        Self(ErrorKind::Proof(err))
    }
}

pub fn configure(
    http: Arc<HttpClient>,
    config_data: Arc<Mutex<ConfigData>>,
) -> service::ProofService<HttpClient> {
    return service::ProofService {
        http: Arc::clone(&http),
        config_service: config::configure(Arc::clone(&config_data)),
        blockchain_client: Blockchain {},
    };
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::ProofService<MockClient> {
    return service::ProofService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
        blockchain_client: Blockchain {},
    };
}
