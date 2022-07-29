use std::cmp::Ordering;

use bloock_hashing::hashing::{Hashing, Keccak256};
use serde::{Deserialize, Serialize};

use crate::error::{BloockResult, OperationalError};

#[derive(Serialize, Deserialize, Clone)]
pub struct Record {
    pub hash: String,
}

impl Record {
    const HASHING_ALGORITHM: Keccak256 = Keccak256 {};

    pub fn from_hash(hash: &str) -> Self {
        Self {
            hash: hash.to_string(),
        }
    }

    pub fn from_hex(hex_str: &str) -> BloockResult<Self> {
        let bytes = match hex::decode(hex_str) {
            Ok(bytes) => bytes,
            Err(e) => return Err(OperationalError::Decoding(e.to_string()).into()),
        };
        Ok(Self {
            hash: Self::HASHING_ALGORITHM.generate_hash(&bytes),
        })
    }

    pub fn from_string(string: &str) -> Self {
        Self {
            hash: Self::HASHING_ALGORITHM.generate_hash(string.as_bytes()),
        }
    }

    pub fn from_typed_array(src: &[u8]) -> Self {
        Self {
            hash: Self::HASHING_ALGORITHM.generate_hash(src),
        }
    }

    pub fn from_pdf(_src: &[u8]) -> Self {
        todo!()
    }

    pub fn from_json(_src: &str) -> Self {
        todo!()
    }

    pub fn get_hash(&self) -> String {
        self.hash.clone()
    }

    pub fn is_valid(&self) -> bool {
        self.hash.len() == 64 && hex::decode(&self.hash).is_ok()
    }

    pub fn get_uint8_array_hash(&self) -> BloockResult<Vec<u8>> {
        match hex::decode(&self.hash) {
            Ok(bytes) => Ok(bytes),
            Err(e) => Err(OperationalError::Decoding(e.to_string()).into()),
        }
    }
}

impl PartialEq for Record {
    fn eq(&self, other: &Self) -> bool {
        self.hash == other.hash
    }
}

impl Eq for Record {}

impl PartialOrd for Record {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        self.hash.partial_cmp(&other.hash)
    }
}

impl Ord for Record {
    fn cmp(&self, other: &Self) -> Ordering {
        self.hash.cmp(&other.hash)
    }
}

#[cfg(test)]
mod tests {
    use crate::record::entity::record::Record;

    #[test]
    fn test_from_hash() {
        let hash = "test_hash";
        assert_eq!(Record::from_hash(hash).get_hash(), hash)
    }

    #[test]
    fn test_from_string() {
        let str = "testing keccak";
        assert_eq!(
            Record::from_string(str).get_hash(),
            "7e5e383e8e70e55cdccfccf40dfc5d4bed935613dffc806b16b4675b555be139".to_string()
        )
    }

    #[test]
    fn test_from_uint8() {
        let array = &[
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16,
            16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
            17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17, 17,
        ];
        assert_eq!(
            Record::from_typed_array(array).get_hash(),
            "e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994a5".to_string()
        );
    }

    #[test]
    fn test_is_valid_ok() {
        let record =
            Record::from_hash("1010101010101010101010101010101010101010101010101010101010101010");
        assert!(record.is_valid());
    }

    #[test]
    fn test_is_valid_wrong_char() {
        let record =
            Record::from_hash("G010101010101010101010101010101010101010101010101010101010101010");
        assert!(record.is_valid() == false);
    }
}
