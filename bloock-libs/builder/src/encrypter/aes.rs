use super::{Decrypter, Encrypter, Encryption};

pub struct AesEncrypterArgs {
    pub secret: String,
}
impl AesEncrypterArgs {
    pub fn new(secret: &str) -> Self {
        Self {
            secret: secret.to_string(),
        }
    }
}

pub struct AesEncrypter {
    _args: AesEncrypterArgs,
}

impl AesEncrypter {
    pub fn new(args: AesEncrypterArgs) -> Self {
        Self { _args: args }
    }
}

impl Encrypter for AesEncrypter {
    fn encrypt(&self, _payload: &[u8]) -> crate::Result<Encryption> {
        Ok(Encryption {
            protected: "protected".to_string(),
            header: super::EncryptionHeader {
                alg: "alg".to_string(),
            },
        })
    }
}

pub struct AesDecrypterArgs {
    pub secret: String,
}
impl AesDecrypterArgs {
    pub fn new(secret: &str) -> Self {
        Self {
            secret: secret.to_string(),
        }
    }
}

pub struct AesDecrypter {
    _args: AesDecrypterArgs,
}

impl AesDecrypter {
    pub fn new(args: AesDecrypterArgs) -> Self {
        Self { _args: args }
    }
}

impl Decrypter for AesEncrypter {
    fn decrypt(&self, _cipher_text: &[u8]) -> crate::Result<Vec<u8>> {
        todo!()
    }
}
