use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateIssuerRequest {
    pub did_metadata: DidMetadata,
    pub bn_128_public_key: String
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct DidMetadata {
    pub method: String,
    pub blockchain: String,
    pub network: String
}