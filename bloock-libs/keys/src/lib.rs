use bloock_hasher::HashAlg;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod access_control;
pub mod algs;
pub mod certificates;
pub mod entity;
pub mod keys;

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

    pub fn default_hash_alg(&self) -> HashAlg {
        match self {
            KeyType::EcP256k => HashAlg::Sha256,
            KeyType::BJJ => HashAlg::Poseidon,
            KeyType::Rsa2048 => HashAlg::Sha256,
            KeyType::Rsa3072 => HashAlg::Sha256,
            KeyType::Rsa4096 => HashAlg::Sha256,
            KeyType::Aes128 => HashAlg::Sha256,
            KeyType::Aes256 => HashAlg::Sha256,
        }
    }
}

pub enum CertificateType {
    PEM,
    PFX,
}

impl CertificateType {
    pub fn new(extension: &str) -> Result<CertificateType> {
        match extension {
            "pem" => Ok(CertificateType::PEM),
            "pfx" => Ok(CertificateType::PFX),
            _ => Err(KeysError::InvalidCertificateTypeError()),
        }
    }

    pub fn get_certificate_type(&self) -> String {
        match self {
            CertificateType::PEM => ".pem".to_string(),
            CertificateType::PFX => ".pfx".to_string(),
        }
    }
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum KeysError {
    #[error("Failed to generate EC key: {0}")]
    GenerateECKeyError(String),
    #[error("Failed to generate rsa key: {0}")]
    GenerateRsaKeyError(String),
    #[error("Failed to generate bjj key")]
    GenerateBjjKeyError,
    #[error("Invalid key provided")]
    InvalidKeyProvided,
    #[error("Failed to create new local certificate: {0}")]
    NewLocalCertificateError(String),
    #[error("Failed to load local certificate: {0}")]
    LoadLocalCertificateError(String),
    #[error("Invalid key type provided")]
    InvalidKeyTypeError(),
    #[error("Invalid certificate type provided")]
    InvalidCertificateTypeError(),
    #[error("Failed to create managed key: {0}")]
    ManagedKeyRequestError(String),
    #[error("Failed to create managed certificate: {0}")]
    ManagedCertificateRequestError(String),
    #[error("Error certificate type is not supported for this operation")]
    ErrorCertificateTypeNotSupported(),
}
