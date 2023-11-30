use serde::Serialize;

use super::{alg::EncryptionAlg, encryption_key::EncryptionKey};

#[derive(Clone, Serialize)]
pub struct Encryption {
    pub ciphertext: Vec<u8>,
    pub alg: EncryptionAlg,
    pub key: Option<EncryptionKey>,
}
