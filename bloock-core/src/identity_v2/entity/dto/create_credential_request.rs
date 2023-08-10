use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateCredentialRequest {
    pub credential_id: String,
    pub core_claim: String,
    pub bn_128_signature: String,
    pub keccak_256_hash: String,
}
