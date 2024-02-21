use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateIssuerRequest {
    pub did_method: String,
    pub bn_128_public_key: String,
    pub name: Option<String>,
    pub description: Option<String>,
    pub image: Option<String>,
    pub publish_interval: i64,
    pub key: String,
}
