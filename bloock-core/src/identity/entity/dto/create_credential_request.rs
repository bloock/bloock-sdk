use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateCredentialRequest {
    pub schema_cid: String,
    pub credential_subject: Value,
    pub expiration: u64,
}
