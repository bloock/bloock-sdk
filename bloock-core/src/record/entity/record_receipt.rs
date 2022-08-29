use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq)]
pub struct RecordReceipt {
    pub anchor: i64,
    pub client: String,
    pub record: String,
    pub status: String,
}
