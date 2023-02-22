use libsecp256k1::{PublicKey, SecretKey};

use crate::local::LocalKey;

pub struct EcKey {
    pub public_key: String,
    pub private_key: String,
}

impl From<EcKey> for LocalKey {
    fn from(value: EcKey) -> Self {
        Self {
            key_type: crate::KeyType::EcP256k,
            key: value.public_key,
            private_key: Some(value.private_key),
        }
    }
}

impl EcKey {
    pub fn new_ec_p256k() -> EcKey {
        let secret_key = SecretKey::random(&mut rand::rngs::OsRng::default());
        let public_key = PublicKey::from_secret_key(&secret_key);
        EcKey {
            private_key: hex::encode(secret_key.serialize()),
            public_key: hex::encode(public_key.serialize_compressed()),
        }
    }
}
