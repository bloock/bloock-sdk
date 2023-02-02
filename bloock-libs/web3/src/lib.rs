use thiserror::Error as ThisError;

pub mod blockchain;
mod request;
mod response;
mod transport;

pub type Result<T> = std::result::Result<T, BlockchainError>;

#[derive(ThisError, Debug)]
pub enum BlockchainError {
    #[error("Invalid request: {0}")]
    InvalidRequest(String),
    #[error("Web3 error: {0}")]
    Web3Error(String),
}
