use serde_json::json;

use super::Signer;

pub struct EcsdaSignerArgs {
    pub private_key: String,
}
impl EcsdaSignerArgs {
    pub fn new(private_key: &str) -> Self {
        Self {
            private_key: private_key.to_string(),
        }
    }
}

pub struct EcsdaSigner {
    _args: EcsdaSignerArgs,
}

impl EcsdaSigner {
    pub fn new(args: EcsdaSignerArgs) -> Self {
        Self { _args: args }
    }

    pub fn generate_keys() -> (String, String) {
        ("public_key".to_string(), "private_key".to_string())
    }
}

impl Signer for EcsdaSigner {
    fn sign(&self, _payload: &[u8]) -> crate::Result<serde_json::Value> {
        Ok(json!({
            "signature": "signature1",
            "header": {}
        }))
    }

    fn verify(&self, _signature: &serde_json::Value) -> crate::Result<serde_json::Value> {
        todo!()
    }
}
