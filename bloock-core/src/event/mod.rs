use crate::config::{self, config_data::ConfigData};
use crate::error::BloockError;
use crate::error::ErrorKind;
#[cfg(test)]
use bloock_http::MockClient;
use bloock_http::SimpleHttpClient;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error as ThisError;

pub mod entity;
pub mod service;

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EventError {
    #[error("Error sending event")]
    PushError(),
}

impl From<EventError> for BloockError {
    fn from(err: EventError) -> Self {
        Self(ErrorKind::Event(err))
    }
}

pub fn configure(
    http: Arc<SimpleHttpClient>,
    config_data: Arc<ConfigData>,
) -> service::EventService<SimpleHttpClient> {
    service::EventService {
        http: Arc::clone(&http),
        config_service: config::configure(Arc::clone(&config_data)),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::EventService<MockClient> {
    service::EventService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
