use serde::Serialize;
use thiserror::Error as ThisError;

pub mod aes;
pub mod rsa;

pub type Result<T> = std::result::Result<T, EncrypterError>;

pub trait Encrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>>;
}

pub trait Decrypter {
    fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EncrypterError {
    #[error("Failed to encrypt: {0}")]
    FailedToEncrypt(String),
    #[error("Failed to encrypt in-place: {0}")]
    FailedToEncryptInPlace(String),
    #[error("Couldn't random fill nonce: {0}")]
    FailedToFillNonce(String),
    #[error("Couldn't generate random salt: {0}")]
    FailedToGenerateSalt(String),
    #[error("Length of decoded data is <= NONCE_LEN")]
    InvalidPayloadLength(),
    #[error("Invalid Base64 data")]
    InvalidBase64(),
    #[error("Failed to decrypt: {0}")]
    FailedToDecrypt(String),
    #[error("Document is not encrypted")]
    NotEncrypted(),
    #[error("Document is encrypted. Metadata cannot be modified")]
    Encrypted(),
}
