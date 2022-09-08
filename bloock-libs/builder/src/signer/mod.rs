use crate::Result;
use serde::{Deserialize, Serialize};
use serde_json::Value;

pub mod ecsda;

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct JWSignatures {
    pub signatures: Vec<Signature>,
    pub payload: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Signature {
    pub header: SignatureHeader,
    pub protected: String,
    pub signature: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct SignatureHeader {
    pub alg: String,
    pub kid: String,
}

pub trait Signer {
    fn sign(&self, payload: &[u8]) -> Result<Signature>;
    fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool>;
}

impl From<JWSignatures> for Signature {
    fn from(s: JWSignatures) -> Self {
        Self {
            protected: s.signatures[0].protected.clone(),
            signature: s.signatures[0].signature.clone(),
            header: s.signatures[0].header.clone(),
        }
    }
}
