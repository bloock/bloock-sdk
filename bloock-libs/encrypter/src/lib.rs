use async_trait::async_trait;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod entity;
pub mod local;
pub mod managed;

pub type Result<T> = std::result::Result<T, EncrypterError>;

#[async_trait(?Send)]
pub trait Encrypter {
    async fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>>;
    fn get_alg(&self) -> &str;
}

#[async_trait(?Send)]
pub trait Decrypter {
    async fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>>;
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
