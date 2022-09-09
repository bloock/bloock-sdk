use serde::{Deserialize, Serialize};
use thiserror::Error as ThisError;

pub mod aes;

pub type Result<T> = std::result::Result<T, EncrypterError>;

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct EncryptionHeader {
    pub alg: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Encryption {
    pub header: EncryptionHeader,
    pub protected: String,
}

pub trait Encrypter {
    fn encrypt(&self, payload: &[u8]) -> Result<Encryption>;
}

pub trait Decrypter {
    fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EncrypterError {}
