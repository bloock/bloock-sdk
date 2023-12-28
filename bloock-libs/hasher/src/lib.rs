use serde::{Deserialize, Deserializer, Serialize, Serializer};
use std::{convert::TryInto, fmt};
use thiserror::Error as ThisError;

pub mod keccak;
pub mod none;
pub mod poseidon;
pub mod sha256;

pub type Result<T> = std::result::Result<T, HasherError>;

const SHA_256_ALG: &str = "SHA_256";
const KECCAK_256_ALG: &str = "KECCAK_256";
const POSEIDON_ALG: &str = "POSEIDON";
const NONE_ALG: &str = "NONE";

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum HashAlg {
    Sha256,
    Keccak256,
    Poseidon,
    None,
}

impl Default for HashAlg {
    fn default() -> Self {
        Self::Sha256
    }
}

impl Serialize for HashAlg {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for HashAlg {
    fn deserialize<D>(deserializer: D) -> std::result::Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        HashAlg::try_from(s.as_str()).map_err(serde::de::Error::custom)
    }
}

impl TryFrom<&str> for HashAlg {
    type Error = HasherError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            SHA_256_ALG => Ok(Self::Sha256),
            KECCAK_256_ALG => Ok(Self::Keccak256),
            POSEIDON_ALG => Ok(Self::Poseidon),
            NONE_ALG => Ok(Self::None),
            _ => Err(HasherError::InvalidAlgorithm),
        }
    }
}

impl fmt::Display for HashAlg {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            HashAlg::Sha256 => write!(f, "{SHA_256_ALG}"),
            HashAlg::Keccak256 => write!(f, "{KECCAK_256_ALG}"),
            HashAlg::Poseidon => write!(f, "{POSEIDON_ALG}"),
            HashAlg::None => write!(f, "{NONE_ALG}"),
        }
    }
}

impl HashAlg {
    pub fn hash(&self, data: &[&[u8]]) -> H256 {
        match self {
            HashAlg::Sha256 => sha256::Sha256::hash(data),
            HashAlg::Keccak256 => keccak::Keccak256::hash(data),
            HashAlg::Poseidon => poseidon::Poseidon::hash(data),
            HashAlg::None => none::None::hash(data),
        }
    }
}

pub trait Hasher {
    fn hash(data: &[&[u8]]) -> H256;
}

pub type H256 = [u8; 32];

pub fn from_hex(hex: &str) -> Result<H256> {
    let d = hex::decode(hex).map_err(|_| HasherError::InvalidHashEncoding)?;
    d.try_into().map_err(|_| HasherError::InvalidHashEncoding)
}

pub fn to_hex(bytes: H256) -> String {
    hex::encode(bytes)
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum HasherError {
    #[error("Invalid hash encoding")]
    InvalidHashEncoding,
    #[error("Invalid hash algorithm")]
    InvalidAlgorithm,
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_sha_256() {
        let data: &[&[u8]] = &["hello world".as_bytes()];

        assert_eq!(
            HashAlg::Sha256.hash(data),
            hex::decode("b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_keccak_256() {
        let data: &[&[u8]] = &["Test Data".as_bytes()];

        assert_eq!(
            HashAlg::Keccak256.hash(data),
            hex::decode("e287462a142cd6237de5a89891ad82065f6aca6644c161b1a61c933c5d26117a")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }

    #[test]
    fn test_poseidon() {
        let data = "hello world".as_bytes();
        let data1: &[u8] = "end world".as_bytes();

        assert_eq!(
            HashAlg::Poseidon.hash(&[data, data1]),
            hex::decode("007d88c5465933fcb9d4cdd70cb3fc8be3df4af9e4736694caa655c5e119910a")
                .unwrap()
                .as_slice(),
            "The hash calculated was incorrect."
        );
    }
}
