use bloock_http::BloockHttpClient;
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
pub enum PublishError {
    #[error("Unable to parse data to publish")]
    PayloadParseError(),
    #[error("Publish error - {0}")]
    PublishError(String),
    #[error("Load error - {0}")]
    LoadError(String),
}

impl From<PublishError> for BloockError {
    fn from(err: PublishError) -> Self {
        Self(ErrorKind::Publish(err))
    }
}

pub fn configure(
    http: Arc<BloockHttpClient>,
    config_data: Arc<ConfigData>,
) -> service::PublishService<BloockHttpClient> {
    service::PublishService {
        http: Arc::clone(&http),
        config_service: config::configure(Arc::clone(&config_data)),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::PublishService<MockClient> {
    service::PublishService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
