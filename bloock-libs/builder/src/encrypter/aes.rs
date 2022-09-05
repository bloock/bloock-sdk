use serde_json::json;

use super::Encrypter;

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
    fn encrypt(&self, _payload: &Option<Vec<u8>>) -> crate::Result<serde_json::Value> {
        Ok(json!({
            "encryption": "encryption1",
            "header": {}
        }))
    }

    fn decrypt(&self, _cipher_text: &Option<Vec<u8>>) -> crate::Result<Vec<u8>> {
        todo!()
    }
}
