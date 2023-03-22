use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateSchemaRequest {
    pub schema_name: String,
    pub schema_type: String,
    pub attributes: Value,
}
