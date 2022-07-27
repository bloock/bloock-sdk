use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct Record {
    pub hash: String,
}

impl Default for Record {
    fn default() -> Self {
        Record {
            hash: String::from("1234"),
        }
    }
}

impl Record {
    pub fn from_hash(_hash: &str) -> Self {
        Record::default()
    }

    pub fn from_hex(_hex: &str) -> Self {
        Record::default()
    }

    pub fn from_string(_string: &str) -> Self {
        Record::default()
    }

    pub fn from_typed_array(_src: &[u8]) -> Self {
        Record::default()
    }

    pub fn from_pdf(_src: &[u8]) -> Self {
        Record::default()
    }

    pub fn from_json(_src: &str) -> Self {
        Record::default()
    }

    pub fn get_hash(&self) -> String {
        self.hash.clone()
    }
}
