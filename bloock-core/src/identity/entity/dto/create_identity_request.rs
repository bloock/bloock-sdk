use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateIdentityRequest {
    pub did_method: String,
    pub bn_128_public_key: String,
}
