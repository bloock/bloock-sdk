use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateCredentialResponse {
    pub id: String,
    pub new_state: String,
}
