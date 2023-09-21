use crate::{keys::local::LocalKey, KeyType, Result};
use rand::{distributions::Alphanumeric, thread_rng, Rng};

pub struct AesKey {
    pub bit_size: usize,
    pub key: String,
}

impl From<AesKey> for LocalKey<String> {
    fn from(value: AesKey) -> Self {
        let key_type = match value.bit_size {
            128 => KeyType::Aes128,
            256 => KeyType::Aes256,
            _ => KeyType::Aes256,
        };

        Self {
            key_type,
            key: value.key,
            private_key: None,
            mnemonic: None,
        }
    }
}

impl AesKey {
    pub fn new_aes_128_key() -> Result<AesKey> {
        Self::generate_aes_key(128)
    }

    pub fn new_aes_256_key() -> Result<AesKey> {
        Self::generate_aes_key(256)
    }

    fn generate_aes_key(key_size: usize) -> Result<AesKey> {
        let rand_string: String = thread_rng()
            .sample_iter(&Alphanumeric)
            .take(16)
            .map(char::from)
            .collect();

        Ok(AesKey {
            bit_size: key_size,
            key: rand_string,
        })
    }
}
