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
pub enum KeyError {}

impl From<KeyError> for BloockError {
    fn from(err: KeyError) -> Self {
        Self(ErrorKind::Key(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::KeyService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(config_data.get_config().api_key));

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
