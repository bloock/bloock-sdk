use thiserror::Error as ThisError;

pub mod blockchain;

pub type Result<T> = std::result::Result<T, BlockchainError>;

#[derive(ThisError, Debug)]
pub enum BlockchainError {
    #[error("Web3 error - {0}")]
    Web3Error(String),
}
