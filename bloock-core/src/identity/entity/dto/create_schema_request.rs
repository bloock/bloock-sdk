use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateSchemaRequest {
    pub title: String,
    pub schema_type: String,
    pub version: String,
    pub description: String,
    pub attributes: Value,
}
