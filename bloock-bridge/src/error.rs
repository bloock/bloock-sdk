use crate::items::Error as ProtoError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq, Eq, Clone)]
pub enum BridgeError {
    #[error("Couldn't deserialize request: {0}")]
    RequestDeserialization(String),
    #[error("Couldn't serialize response: {0}")]
    ResponseSerialization(String),
    #[error("Invalid argument")]
    InvalidArgument,
    #[error("Anchor error")]
    AnchorError,
}

pub fn config_data_error() -> ProtoError {
    ProtoError {
        kind: BridgeError::InvalidArgument.to_string(),
        message: "Invalid config data".to_string(),
    }
}
