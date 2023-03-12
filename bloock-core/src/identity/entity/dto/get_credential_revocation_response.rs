use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetCredentialRevocationResponse {
    pub timestamp: u128,
}
