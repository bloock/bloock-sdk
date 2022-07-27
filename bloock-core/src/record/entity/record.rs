use serde::{Deserialize, Serialize};

use crate::{error::{BloockResult, OperationalError}, proof::entity::proof::Proof};

use super::document::Document;

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

    pub fn from_bytes_array(src: Vec<u8>) -> Self {
        todo!()
    }

    pub fn from_document(document: Document) -> Self {
        todo!()
    }

    pub fn get_hash(&self) -> String {
        self.hash.clone()
    }

    pub fn is_valid(&self) -> bool {
        self.hash.len() == 64 && hex::decode(&self.hash).is_ok()
    }

    pub fn get_proof(&self) -> Option<Proof> {
        todo!()
    }

    pub fn set_proof(&self, proof: &Proof) {
        todo!()
    }

    pub fn retrieve(&self) {
        todo!()
    } 

    pub fn get_hash_bytes(&self) -> BloockResult<Vec<u8>> {
        match hex::decode(&self.hash) {
            Ok(bytes) => Ok(bytes),
            Err(e) => Err(OperationalError::Decoding(e.to_string()).into())
        }
    }

    pub fn sign(&self) {
        todo!()
    }

    pub fn verify(&self) {
        todo!()
    }
}
