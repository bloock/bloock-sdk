use serde::Serialize;
use thiserror::Error as ThisError;

pub mod keys;
pub mod local;
pub mod managed;

pub type Result<T> = std::result::Result<T, KeysError>;

#[derive(Clone, Debug, PartialEq)]
pub enum KeyType {
    EcP256k,
    BJJ,
    Rsa2048,
    Rsa3072,
    Rsa4096,
    Aes128,
    Aes256,
}

impl KeyType {
    pub fn new(key_type: &str) -> Result<KeyType> {
        match key_type {
            "EcP256k" => Ok(KeyType::EcP256k),
            "BJJ" => Ok(KeyType::BJJ),
            "Rsa2048" => Ok(KeyType::Rsa2048),
            "Rsa3072" => Ok(KeyType::Rsa3072),
            "Rsa4096" => Ok(KeyType::Rsa4096),
            "Aes128" => Ok(KeyType::Aes128),
            "Aes256" => Ok(KeyType::Aes256),
            _ => Err(KeysError::InvalidKeyTypeError()),
        }
    }

    pub fn get_key_type(&self) -> String {
        match self {
            KeyType::EcP256k => "EcP256k".to_string(),
            KeyType::BJJ => "BJJ".to_string(),
            KeyType::Rsa2048 => "Rsa2048".to_string(),
            KeyType::Rsa3072 => "Rsa3072".to_string(),
            KeyType::Rsa4096 => "Rsa4096".to_string(),
            KeyType::Aes128 => "Aes128".to_string(),
            KeyType::Aes256 => "Aes256".to_string(),
        }
    }
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum KeysError {
    #[error("Failed to generate EC key: {0}")]
    GenerateECKeyError(String),
    #[error("Failed to generate rsa key: {0}")]
    GenerateRsaKeyError(String),
    #[error("Invalid key type provided")]
    InvalidKeyTypeError(),
    #[error("Failed to create managed key: {0}")]
    ManagedKeyRequestError(String),
}
