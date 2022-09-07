use crate::Result;
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub mod ecsda;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct Signature {
    pub header: SignatureHeader,
    pub protected: String,
    pub signature: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct SignatureHeader {
    pub alg: String,
    pub kid: String,
}

pub trait Signer {
    fn sign(&self, payload: &[u8]) -> Result<Signature>;
    fn verify(&self, signature: &Value) -> Result<bool>;
}
