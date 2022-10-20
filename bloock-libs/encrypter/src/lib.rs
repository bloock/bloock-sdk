use serde::{Deserialize, Serialize};
use thiserror::Error as ThisError;

pub mod aes;

pub type Result<T> = std::result::Result<T, EncrypterError>;

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct EncryptionHeader {
    pub alg: String,
    pub enc: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Encryption {
    pub ciphertext: String,
    pub tag: String,
    pub header: EncryptionHeader,
    pub protected: String,
    pub cty: String,
}

pub trait Encrypter {
    fn encrypt(&self, payload: &[u8], associated_data: &[u8], ty: String) -> Result<Encryption>;
}

pub trait Decrypter {
    fn decrypt(&self, cipher_text: &str, associated_data: &[u8]) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EncrypterError {
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
    #[error("Invalid key/nonce/value/aad")]
    BadSeal(),
}
