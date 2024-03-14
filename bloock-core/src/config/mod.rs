use self::config_data::ConfigData;
use crate::error::BloockError;
use crate::error::ErrorKind;
use serde::Serialize;
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

pub fn configure(config_data: ConfigData) -> service::ConfigService {
    service::ConfigService { config_data }
}

#[cfg(test)]
pub fn configure_test() -> service::ConfigService {
    let config_data = ConfigData::new("".to_string(), None, "".to_string());

    service::ConfigService { config_data }
}
