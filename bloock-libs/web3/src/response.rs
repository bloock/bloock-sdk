use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct Response {
    pub jsonrpc: String,
    pub result: String,
    pub id: u64,
}
