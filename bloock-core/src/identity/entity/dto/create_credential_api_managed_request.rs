use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateCredentialApiManagedRequest {
    pub schema_id: String,
    pub holder_did: String,
    pub credential_subject: Vec<CredentialSubjectValue>,
    pub expiration: i64,
    pub version: i32,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CredentialSubjectValue {
    pub key: String,
    pub value: Value,
}