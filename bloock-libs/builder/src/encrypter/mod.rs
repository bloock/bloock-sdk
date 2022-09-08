use crate::Result;
use serde::{Deserialize, Serialize};

pub mod aes;

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
