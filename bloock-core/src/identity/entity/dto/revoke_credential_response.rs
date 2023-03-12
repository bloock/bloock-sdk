use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RevokeCredentialResponse {
    pub timestamp: i64,
}
