use crate::anchor::AnchorError;
use crate::config::ConfigError;
use bloock_http::HttpError;
use std::fmt;

use serde::Serialize;
use thiserror::Error;

pub type BloockResult<T> = Result<T, BloockError>;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum ErrorKind {
    #[error("Config error: {0}")]
    Config(#[from] ConfigError),
    #[error("Anchor error: {0}")]
    Anchor(#[from] AnchorError),
    #[error("Infrastructure error: {0}")]
    Infrastructure(#[from] InfrastructureError),
    #[error("Operational error: {0}")]
    Operational(#[from] OperationalError),
}

#[derive(Debug, Clone, Serialize)]
#[serde(into = "FormattedBloockError")]
pub struct BloockError(pub ErrorKind);

impl std::error::Error for BloockError {}

impl fmt::Display for BloockError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)?;
        Ok(())
    }
}

#[cfg(test)]
impl BloockError {
    pub fn unwrap_operational(self) -> OperationalError {
        match self.0 {
            ErrorKind::Operational(e) => e,
            e => panic!("Expected ErrorKind::Parse; was: {}", e),
        }
    }
}

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum InfrastructureError {
    #[error("Http Client error: {0}")]
    Http(#[from] HttpError),
}

impl From<InfrastructureError> for BloockError {
    fn from(err: InfrastructureError) -> Self {
        Self(ErrorKind::Infrastructure(err))
    }
}

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum OperationalError {
    #[error("Serialization error: {0}")]
    Serialization(String),
    #[error("We hit an unexpected error.")]
    Unknown,
}

impl From<OperationalError> for BloockError {
    fn from(err: OperationalError) -> Self {
        Self(ErrorKind::Operational(err))
    }
}

#[derive(Clone, Serialize)]
pub struct FormattedBloockError {
    pub kind: ErrorKind,
    pub formatted: String,
}

impl From<BloockError> for FormattedBloockError {
    fn from(other: BloockError) -> Self {
        Self {
            formatted: other.to_string(),
            kind: other.0,
        }
    }
}
