use crate::{
    config::{self, config_data::ConfigData},
    error::{BloockError, ErrorKind},
};
use bloock_http::BloockHttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error;

pub mod service;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EncryptionError {
    #[error("No payload found")]
    PayloadNotFoundError(),
    #[error("Error happened while encrypting: {0}")]
    EncryptionError(String),
    #[error("Error happened while decrypting: {0}")]
    DecryptionError(String),
    #[error("Couldn't decrypt because record is not encrypted")]
    NotEncryptedError(),
}

impl From<EncryptionError> for BloockError {
    fn from(err: EncryptionError) -> Self {
        Self(ErrorKind::Encryption(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::EncryptionService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(config_data.get_config().api_key, None));

    service::EncryptionService {
        http: Arc::clone(&bloock_http_client),
        config_service: config::configure(config_data),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::EncryptionService<MockClient> {
    service::EncryptionService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
