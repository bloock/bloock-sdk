use crate::document::Document;
use crate::hasher::{keccak::Keccak256, Hasher};
use crate::{BuilderError, Result};

pub struct Record {
    pub document: Document,
    hash: String,
}

impl Record {
    pub fn new(document: Document) -> Result<Self> {
        let hash = Keccak256::generate_hash(&document.get_payload()?);
        Ok(Self { document, hash })
    }

    pub fn get_hash(self) -> String {
        self.hash
    }

    pub fn get_hash_bytes(self) -> Result<Vec<u8>> {
        hex::decode(self.hash).map_err(|e| BuilderError::DecodeError(e.to_string()))
    }

    pub fn serialize(self) -> Result<String> {
        self.document.serialize()
    }
}
