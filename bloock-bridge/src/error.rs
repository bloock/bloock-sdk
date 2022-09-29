use crate::items::Error as ProtoError;
use bloock_core::error::BloockError;
use thiserror::Error;

pub type BridgeResult<T> = Result<T, BridgeError>;

#[derive(Error, Debug, PartialEq, Eq, Clone)]
pub enum BridgeError {
    #[error("Service not found")]
    ServiceNotFound,
    #[error("Couldn't deserialize request: {0}")]
    RequestDeserialization(String),
    #[error("Couldn't serialize response: {0}")]
    ResponseSerialization(String),
    #[error("Invalid argument")]
    InvalidArgument,
    #[error("Anchor error")]
    AnchorError,
    #[error("Record error")]
    RecordError,
    #[error("Proof error")]
    ProofError,
    #[error("Anchor missing from request")]
    MissingAnchor,
    #[error("{0}")]
    BloockError(#[from] BloockError),
}

pub fn config_data_error() -> ProtoError {
    ProtoError {
        kind: BridgeError::InvalidArgument.to_string(),
        message: "Invalid config data".to_string(),
    }
}
