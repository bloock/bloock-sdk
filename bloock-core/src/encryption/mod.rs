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
    #[error("Unable to parse data to publish")]
    PayloadParseError(),
    #[error("Publish error - {0}")]
    PublishError(String),
    #[error("Load error - {0}")]
    LoadError(String),
}

impl From<EncryptionError> for BloockError {
    fn from(err: EncryptionError) -> Self {
        Self(ErrorKind::Encryption(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::EncryptionService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(config_data.get_config().api_key));

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
