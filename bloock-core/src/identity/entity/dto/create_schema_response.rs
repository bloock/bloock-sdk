use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateSchemaResponse {
    pub cid_json: String,
    pub cid_json_ld: String,
}
