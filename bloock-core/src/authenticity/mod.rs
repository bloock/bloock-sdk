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
pub enum AuthenticityError {
    #[error("No payload found")]
    PayloadNotFoundError(),
}

impl From<AuthenticityError> for BloockError {
    fn from(err: AuthenticityError) -> Self {
        Self(ErrorKind::Authenticity(err))
    }
}

pub fn configure(config_data: ConfigData) -> service::AuthenticityService<BloockHttpClient> {
    let bloock_http_client = Arc::new(BloockHttpClient::new(
        config_data.get_config().api_key,
        None,
    ));

    service::AuthenticityService {
        http: Arc::clone(&bloock_http_client),
        config_service: config::configure(config_data),
    }
}

#[cfg(test)]
pub fn configure_test(http: Arc<MockClient>) -> service::AuthenticityService<MockClient> {
    service::AuthenticityService {
        http: Arc::clone(&http),
        config_service: config::configure_test(),
    }
}
