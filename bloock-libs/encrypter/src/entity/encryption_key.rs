use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Serialize, Deserialize)]
pub struct EncryptionKey {
    pub key: String,
    pub subject: Option<String>,
}
