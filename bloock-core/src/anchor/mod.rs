use crate::config::{self, config_data::ConfigData};
use crate::error::BloockError;
use crate::error::ErrorKind;
use bloock_http::HttpClient;
#[cfg(test)]
use bloock_http::MockClient;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error as ThisError;

pub mod entity;
pub mod service;

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum AnchorError {
    #[error("Wait Anchor timed out")]
    AnchorTimeout(),
}

impl From<AnchorError> for BloockError {
    fn from(err: AnchorError) -> Self {
        Self(ErrorKind::Anchor(err))
    }
}

pub fn configure(
    http: Arc<HttpClient>,
    config_data: Arc<ConfigData>,
) -> service::AnchorService<HttpClient> {
    service::AnchorService {
        http: Arc::clone(&http),
        config_service: config::configure(Arc::clone(&config_data)),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::AnchorService<MockClient> {
    service::AnchorService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
