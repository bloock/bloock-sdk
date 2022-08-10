use thiserror::Error;

#[derive(Error, Debug, PartialEq, Eq, Clone)]
pub enum BridgeError {
    #[error("Couldn't deserialize request: {0}")]
    RequestDeserialization(String),
    #[error("Couldn't serialize response: {0}")]
    ResponseSerialization(String),
    #[error("Invalid argument")]
    InvalidArgument,
}
