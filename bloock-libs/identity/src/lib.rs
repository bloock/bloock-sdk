use serde::Serialize;
use thiserror::Error as ThisError;

pub mod did;

pub type Result<T> = std::result::Result<T, IdentityError>;

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum IdentityError {
    #[error("Invalid public key provided")]
    InvalidPublicKey(),
}
