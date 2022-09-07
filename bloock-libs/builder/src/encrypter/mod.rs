use crate::Result;
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub mod aes;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct EncryptionHeader {
    pub alg: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Encryption {
    pub header: EncryptionHeader,
    pub protected: String,
}

pub trait Encrypter {
    fn encrypt(&self, payload: &Vec<u8>) -> Result<Encryption>;
}

pub trait Decrypter {
    fn decrypt(&self, cipher_text: &Vec<u8>) -> Result<Vec<u8>>;
}
