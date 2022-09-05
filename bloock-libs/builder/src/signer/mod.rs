use crate::Result;
use serde_json::Value;

pub mod ecsda;

pub trait Signer {
    fn sign(&self, payload: &[u8]) -> Result<Value>;
    fn verify(&self, signature: &Value) -> Result<Value>;
}
