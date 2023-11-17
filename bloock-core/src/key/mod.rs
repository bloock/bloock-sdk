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
pub enum KeyError {
    #[error("Error generating local key: {0}")]
    GenerateLocalKeyError(String),
    #[error("Error generating managed key: {0}")]
    GenerateManagedKeyError(String),
    #[error("Error loading local key: {0}")]
    LoadLocalKeyError(String),
    #[error("Error loading managed key: {0}")]
    LoadManagedKeyError(String),
    #[error("Error generating local certificate: {0}")]
    GenerateLocalCertificateError(String),
    #[error("Error loading local certificate: {0}")]
    LoadLocalCertificateError(String),
    #[error("Error generating managed certificate: {0}")]
    GenerateManagedCertificateError(String),
    #[error("Error loading managed certificate: {0}")]
    LoadManagedCertificateError(String),
    #[error("Error importing managed certificate: {0}")]
    ImportManagedCertificateError(String),
}

impl From<KeyError> for BloockError {
    fn from(err: KeyError) -> Self {
        Self(ErrorKind::Key(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::KeyService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(
        config_data.get_config().api_key,
        config_data.get_config().environment,
    ));

    service::KeyService {
        http: Arc::clone(&bloock_http_client),
        config_service: config::configure(config_data),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::KeyService<MockClient> {
    service::KeyService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
