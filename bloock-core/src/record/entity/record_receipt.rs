use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct RecordReceipt {
    pub anchor: i32,
    pub client: String,
    pub record: String,
    pub status: String,
}
