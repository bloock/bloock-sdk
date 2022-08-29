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

pub mod entity;
pub mod service;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum RecordError {
    #[error("Invalid record")]
    InvalidRecord(),
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
