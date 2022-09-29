use self::config_data::ConfigData;
use crate::error::BloockError;
use crate::error::ErrorKind;
use serde::Serialize;
use std::sync::Arc;
use thiserror::Error as ThisError;

pub mod config_data;
pub mod entity;
pub mod service;

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum ConfigError {
    #[error("Could not acces underlying config data")]
    ConfigDataError(),
}

impl From<ConfigError> for BloockError {
    fn from(err: ConfigError) -> Self {
        Self(ErrorKind::Config(err))
    }
}

pub fn configure(config_data: Arc<ConfigData>) -> service::ConfigService {
    service::ConfigService {
        config_data: Arc::clone(&config_data),
    }
}

#[cfg(test)]
pub fn configure_test() -> service::ConfigService {
    let config_data = Arc::new(ConfigData::new("".to_string()));

    service::ConfigService {
        config_data: Arc::clone(&config_data),
    }
}
