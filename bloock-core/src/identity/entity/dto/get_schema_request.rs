use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct GetSchemaRequest {
    pub attributes: Vec<String>,
    pub schema_name: String,
    pub schema_type: String,
}
