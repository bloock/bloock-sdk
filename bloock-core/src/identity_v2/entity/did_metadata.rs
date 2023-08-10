use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct DidMetadata {
    pub method: String,
    pub blockchain: String,
    pub network: String,
}
