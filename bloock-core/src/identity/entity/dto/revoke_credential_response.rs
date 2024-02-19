use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct RevokeCredentialResponse {
    pub success: bool,
    pub new_state: String,
}
