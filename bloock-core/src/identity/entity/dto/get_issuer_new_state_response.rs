use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetIssuerNewStateResponse {
    pub new_state: String,
}
