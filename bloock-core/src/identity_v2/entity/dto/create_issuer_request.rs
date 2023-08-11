use serde::{Serialize, Deserialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateIssuerRequest {
    pub did_metadata: Value,
    pub bn_128_public_key: String
}