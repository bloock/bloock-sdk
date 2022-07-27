use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct RecordReceipt {
    pub hash: String,
}

impl Default for RecordReceipt {
    fn default() -> Self {
        RecordReceipt {
            hash: String::from("1234"),
        }
    }
}
