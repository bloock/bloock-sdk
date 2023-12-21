use serde::{Deserialize, Serialize};

use super::create_issuer_request::DidMetadata;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateIdentityRequest {
    pub did_metadata: DidMetadata,
    pub bn_128_public_key: String,
}
