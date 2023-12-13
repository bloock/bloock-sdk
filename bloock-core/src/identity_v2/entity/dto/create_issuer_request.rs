use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateIssuerRequest {
    pub did_metadata: DidMetadata,
    pub bn_128_public_key: String,
    pub name: Option<String>,
    pub description: Option<String>,
    pub image: Option<String>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct DidMetadata {
    pub method: String,
    pub blockchain: String,
    pub network: String,
}
