use crate::Result;
use serde_json::Value;

pub mod aes;

pub trait Encrypter {
    fn encrypt(&self, payload: &Option<Vec<u8>>) -> Result<Value>;
    fn decrypt(&self, cipher_text: &Option<Vec<u8>>) -> Result<Vec<u8>>;
}
