use crate::{error::{BloockError, ErrorKind}, config::{config_data::ConfigData, self}};
use serde::Serialize;
use thiserror::Error;
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

pub fn configure(config_data: ConfigData) -> service::RecordService {
    service::RecordService {
        config_service: config::configure(config_data),
    }
}

#[cfg(test)]
pub fn configure_test(config_data: ConfigData) -> service::RecordService {
    service::RecordService {
        config_service: config::configure(config_data),
    }
}
