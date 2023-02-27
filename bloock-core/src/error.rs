use crate::authenticity::AuthenticityError;
use crate::availability::AvailabilityError;
use crate::config::ConfigError;
use crate::encryption::EncryptionError;
use crate::event::EventError;
use crate::integrity::IntegrityError;
use crate::key::KeyError;
use crate::record::RecordError;
use crate::webhook::WebhookError;
use bloock_encrypter::EncrypterError;
use bloock_hasher::HasherError;
use bloock_http::HttpError;
use bloock_metadata::MetadataError;
use bloock_signer::SignerError;
use std::fmt;

use serde::Serialize;
use thiserror::Error;

pub type BloockResult<T> = Result<T, BloockError>;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum ErrorKind {
    #[error("Config error: {0}")]
    Config(#[from] ConfigError),
    #[error("Record error: {0}")]
    Record(#[from] RecordError),
    #[error("Integrity error: {0}")]
    Integrity(#[from] IntegrityError),
    #[error("Authenticity error: {0}")]
    Authenticity(#[from] AuthenticityError),
    #[error("Publish error: {0}")]
    Availability(#[from] AvailabilityError),
    #[error("Encryption error: {0}")]
    Encryption(#[from] EncryptionError),
    #[error("Key error: {0}")]
    Key(#[from] KeyError),
    #[error("Webhook error: {0}")]
    Webhook(#[from] WebhookError),
    #[error("Event error: {0}")]
    Event(#[from] EventError),
    #[error("Infrastructure error: {0}")]
    Infrastructure(#[from] InfrastructureError),
    #[error("Operational error: {0}")]
    Operational(#[from] OperationalError),
}

#[derive(Debug, Clone, Serialize, Eq, PartialEq)]
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
            e => panic!("Expected ErrorKind::Parse; was: {e}"),
        }
    }
}

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum InfrastructureError {
    #[error("Http Client error: {0}")]
    Http(#[from] HttpError),
    #[error("{0}")]
    HasherError(#[from] HasherError),
    #[error("{0}")]
    SignerError(#[from] SignerError),
    #[error("{0}")]
    EncrypterError(#[from] EncrypterError),
    #[error("{0}")]
    MetadataError(#[from] MetadataError),
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
    #[error("Decoding error: {0}")]
    Decoding(String),
    #[error("Invalid Hash")]
    InvalidHash(),
    #[error("Could not merge hashes")]
    MergeError(),
    #[error("Cannot create record from an encrypted document")]
    CannotCreateRecordFromEncryptedDocument(),
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
