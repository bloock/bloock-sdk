use std::fmt;

use crate::aes::AES_ALG;
use crate::ecies::ECIES_ALG;
use crate::rsa::RSA_ALG;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod aes;
pub mod ecies;
pub mod rsa;

pub type Result<T> = std::result::Result<T, EncrypterError>;

pub enum EncryptionAlg {
    A256gcm,
    Rsa,
    Ecies,
}

impl TryFrom<&str> for EncryptionAlg {
    type Error = EncrypterError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            AES_ALG => Ok(Self::A256gcm),
            RSA_ALG => Ok(Self::Rsa),
            ECIES_ALG => Ok(Self::Ecies),
            _ => Err(EncrypterError::InvalidAlgorithm()),
        }
    }
}

impl fmt::Display for EncryptionAlg {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            EncryptionAlg::A256gcm => write!(f, "{AES_ALG}"),
            EncryptionAlg::Rsa => write!(f, "{RSA_ALG}"),
            EncryptionAlg::Ecies => write!(f, "{ECIES_ALG}"),
        }
    }
}

pub trait Encrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>>;
    fn get_alg(&self) -> &str;
}

pub trait Decrypter {
    fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EncrypterError {
    #[error("Failed to encrypt: {0}")]
    FailedToEncrypt(String),
    #[error("Invalid key: {0}")]
    InvalidKey(String),
    #[error("Failed to encrypt in-place: {0}")]
    FailedToEncryptInPlace(String),
    #[error("Couldn't random fill nonce: {0}")]
    FailedToFillNonce(String),
    #[error("Couldn't generate random salt: {0}")]
    FailedToGenerateSalt(String),
    #[error("Length of decoded data is <= NONCE_LEN")]
    InvalidPayloadLength(),
    #[error("Invalid payload")]
    InvalidPayload(),
    #[error("Invalid Base64 data")]
    InvalidBase64(),
    #[error("Failed to decrypt: {0}")]
    FailedToDecrypt(String),
    #[error("Document is not encrypted")]
    NotEncrypted(),
    #[error("Document is encrypted. Metadata cannot be modified")]
    Encrypted(),
    #[error("Error generating RSA key pair: {0}")]
    ErrorGeneratingRsaKeyPair(String),
    #[error("Invalid algorithm")]
    InvalidAlgorithm(),
    #[error("Could not retrieve encryption algorithm")]
    CouldNotRetrieveAlgorithm(),
}
