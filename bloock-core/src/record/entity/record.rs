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

    pub fn from_typed_array(_src: &[u8]) -> Self {
        todo!()
    }

    pub fn from_uint8_array(src: &[u8]) -> Self {
        Self {
            hash: Self::HASHING_ALGORITHM.generate_hash(src),
        }
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
