use std::convert::TryInto;
use thiserror::Error as ThisError;

pub mod keccak;

pub type Result<T> = std::result::Result<T, HasherError>;

pub trait Hasher {
    fn generate_hash(data: &[u8]) -> H256;
}

pub type H256 = [u8; 32];

pub fn from_hex(hex: &str) -> Result<H256> {
    let d = hex::decode(hex).map_err(|_| HasherError::InvalidHashEncoding)?;
    d.try_into().map_err(|_| HasherError::InvalidHashEncoding)
}

#[derive(ThisError, Debug)]
pub enum HasherError {
    #[error("Invalid hash encoding")]
    InvalidHashEncoding,
}
