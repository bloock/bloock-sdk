use thiserror::Error;

#[derive(Error, Debug, PartialEq, Eq, Clone)]
pub enum BridgeError {
    #[error("Couldn't serialize response: {0}")]
    ResponseSerialization(String),
    #[error("Invalid argument")]
    InvalidArgument,
}
