use serde::Serialize;
use thiserror::Error as ThisError;

pub mod keys;
pub mod local;
pub mod managed;

pub type Result<T> = std::result::Result<T, KeysError>;

#[derive(Clone, Debug, PartialEq)]
pub enum KeyType {
    EcP256k,
    Rsa2048,
    Rsa3072,
    Rsa4096,
}

impl KeyType {
    pub fn new(key_type: &str, key_curve: Option<&str>, key_size: Option<u32>) -> Result<KeyType> {
        match key_type {
            "EC" => match key_curve {
                Some("P-256K") => Ok(KeyType::EcP256k),
                _ => Err(KeysError::InvalidKeyTypeError()),
            },
            "RSA" => match key_size {
                Some(2048) => Ok(KeyType::Rsa2048),
                Some(3072) => Ok(KeyType::Rsa3072),
                Some(4096) => Ok(KeyType::Rsa4096),
                _ => Err(KeysError::InvalidKeyTypeError()),
            },
            _ => Err(KeysError::InvalidKeyTypeError()),
        }
    }

    pub fn get_key_type(&self) -> String {
        match self {
            KeyType::EcP256k => "EC".to_string(),
            KeyType::Rsa2048 => "RSA".to_string(),
            KeyType::Rsa3072 => "RSA".to_string(),
            KeyType::Rsa4096 => "RSA".to_string(),
        }
    }

    pub fn get_key_curve(&self) -> Option<String> {
        match self {
            KeyType::EcP256k => Some("P-256K".to_string()),
            KeyType::Rsa2048 => None,
            KeyType::Rsa3072 => None,
            KeyType::Rsa4096 => None,
        }
    }

    pub fn get_key_size(&self) -> Option<u32> {
        match self {
            KeyType::EcP256k => None,
            KeyType::Rsa2048 => Some(2048),
            KeyType::Rsa3072 => Some(3072),
            KeyType::Rsa4096 => Some(4096),
        }
    }
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum KeysError {
    #[error("Failed to generate rsa key: {0}")]
    GenerateRsaKeyError(String),
    #[error("Invalid key type provided")]
    InvalidKeyTypeError(),
    #[error("Failed to create managed key: {0}")]
    ManagedKeyRequestError(String),
}
