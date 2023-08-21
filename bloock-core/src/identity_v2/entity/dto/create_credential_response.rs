use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateCredentialResponse {
    pub id: String,
    pub anchor_id: Option<i64>,
}
