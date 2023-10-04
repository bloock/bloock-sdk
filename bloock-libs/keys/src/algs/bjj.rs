use crate::{keys::local::LocalKey, KeyType, KeysError, Result};
use babyjubjub_rs::PrivateKey;
use num_bigint::{RandBigInt, ToBigInt};

pub struct BjjKey {
    pub public_key: String,
    pub private_key: String,
}

impl From<BjjKey> for LocalKey<String> {
    fn from(value: BjjKey) -> Self {
        Self {
            key_type: KeyType::BJJ,
            key: value.public_key,
            private_key: Some(value.private_key),
            mnemonic: None,
        }
    }
}

impl BjjKey {
    pub fn new() -> Result<BjjKey> {
        let mut rng = rand::thread_rng();
        let sk_raw = rng
            .gen_biguint(1024)
            .to_bigint()
            .ok_or(KeysError::GenerateBjjKeyError)?;
        let (_, sk_raw_bytes) = sk_raw.to_bytes_be();

        let sk = sk_raw_bytes[..32].to_vec();
        let private = PrivateKey::import(sk.clone()).map_err(|_| KeysError::GenerateBjjKeyError)?;

        let public = private.public();

        Ok(BjjKey {
            public_key: hex::encode(public.compress()),
            private_key: hex::encode(sk),
        })
    }
}
