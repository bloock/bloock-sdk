use thiserror::Error as ThisError;

pub mod hashing;
pub mod merge;

pub type Result<T> = std::result::Result<T, HashingError>;

#[derive(ThisError, Debug)]
pub enum HashingError {}
