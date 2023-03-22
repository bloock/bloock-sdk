use crate::{local::LocalKey, KeyType, KeysError, Result};
use rsa::{
    pkcs8::{EncodePrivateKey, EncodePublicKey, LineEnding},
    RsaPrivateKey, RsaPublicKey,
};

pub struct RsaKey {
    pub bit_size: usize,
    pub public_key: String,
    pub private_key: String,
}

impl From<RsaKey> for LocalKey<String> {
    fn from(value: RsaKey) -> Self {
        let key_type = match value.bit_size {
            2048 => KeyType::Rsa2048,
            3072 => KeyType::Rsa3072,
            4096 => KeyType::Rsa4096,
            _ => KeyType::Rsa2048,
        };
        Self {
            key_type,
            key: value.public_key,
            private_key: Some(value.private_key),
            mnemonic: None,
        }
    }
}

impl RsaKey {
    pub fn new_rsa_2048() -> Result<RsaKey> {
        Self::generate_rsa_key(2048)
    }

    pub fn new_rsa_3072() -> Result<RsaKey> {
        Self::generate_rsa_key(3072)
    }

    pub fn new_rsa_4096() -> Result<RsaKey> {
        Self::generate_rsa_key(4096)
    }

    fn generate_rsa_key(bit_size: usize) -> Result<RsaKey> {
        let mut rng = rand::thread_rng();
        let private_key = RsaPrivateKey::new(&mut rng, bit_size)
            .map_err(|err| KeysError::GenerateRsaKeyError(err.to_string()))?;

        let public_key = RsaPublicKey::from(&private_key);

        Ok(RsaKey {
            bit_size,
            public_key: public_key
                .to_public_key_pem(LineEnding::default())
                .map_err(|err| KeysError::GenerateRsaKeyError(err.to_string()))?,
            private_key: private_key
                .to_pkcs8_pem(LineEnding::default())
                .map_err(|err| KeysError::GenerateRsaKeyError(err.to_string()))?
                .to_string(),
        })
    }
}
