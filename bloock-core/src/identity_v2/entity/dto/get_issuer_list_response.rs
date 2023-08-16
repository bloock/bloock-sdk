use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetIssuerListResponse {
    pub user_id: String,
    pub did: String,
    pub state: Value,
}
