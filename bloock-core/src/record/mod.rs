use bloock_http::HttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error;

use crate::{
    config::{self, config_data::ConfigData},
    error::{BloockError, ErrorKind},
};

pub mod builder;
pub mod document;
pub mod entity;
pub mod service;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum RecordError {
    #[error("Invalid record")]
    InvalidRecord(),
    #[error("Invalid hex provided")]
    InvalidHex,
    #[error("Invalid JSON provided")]
    InvalidJson,
    #[error("Couldn't find document")]
    DocumentNotFound,
    #[error("Couldn't serialize document: {0}")]
    DocumentSerializationError(String),
    #[error("Couldn't deserialize document: {0}")]
    DocumentDeserializationError(String),
    #[error("Error encrypting record: {0}")]
    EncryptionError(String),
}

impl From<RecordError> for BloockError {
    fn from(err: RecordError) -> Self {
        Self(ErrorKind::Record(err))
    }
}

pub fn configure(
    http: Arc<HttpClient>,
    config_data: Arc<ConfigData>,
) -> service::RecordService<HttpClient> {
    service::RecordService {
        http: Arc::clone(&http),
        config_service: config::configure(Arc::clone(&config_data)),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::RecordService<MockClient> {
    service::RecordService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
