use std::cmp::Ordering;

use bloock_encrypter::Encryption;
use bloock_hasher::{from_hex, keccak::Keccak256, Hasher, H256};
use bloock_signer::Signature;

use crate::{
    error::{BloockError, BloockResult, InfrastructureError},
    proof::entity::proof::Proof,
    record::{document::Document, RecordError},
};

#[derive(Clone, Eq)]
pub struct Record {
    pub(crate) document: Option<Document>,
    hash: H256,
}

impl Record {
    pub fn new(document: Document) -> Self {
        let hash = Keccak256::generate_hash(&document.get_payload());
        Self {
            document: Some(document),
            hash,
        }
    }

    pub fn from_hash(hash: H256) -> Self {
        Self {
            document: None,
            hash,
        }
    }

    pub fn get_hash(&self) -> String {
        hex::encode(self.hash)
    }

    pub fn get_hash_bytes(&self) -> H256 {
        self.hash
    }

    pub fn get_payload(&self) -> Option<&Vec<u8>> {
        match &self.document {
            Some(d) => Some(&d.payload),
            None => None,
        }
    }

    pub fn get_signatures(&self) -> Option<Vec<Signature>> {
        match &self.document {
            Some(d) => d.get_signatures(),
            None => None,
        }
    }

    pub fn get_encryption(&self) -> Option<Encryption> {
        match &self.document {
            Some(d) => d.get_encryption(),
            None => None,
        }
    }

    pub fn get_proof(&self) -> Option<Proof> {
        match &self.document {
            Some(d) => d.get_proof(),
            None => None,
        }
    }

    pub fn serialize(self) -> BloockResult<Vec<u8>> {
        match self.document {
            Some(mut d) => d.build(),
            None => Err(RecordError::DocumentNotFound.into()),
        }
    }
}

impl Ord for Record {
    fn cmp(&self, other: &Self) -> Ordering {
        self.hash.cmp(&other.hash)
    }
}

impl PartialOrd for Record {
    fn partial_cmp(&self, other: &Self) -> Option<Ordering> {
        Some(self.cmp(other))
    }
}

impl PartialEq for Record {
    fn eq(&self, other: &Self) -> bool {
        self.hash == other.hash
    }
}

impl TryFrom<&String> for Record {
    type Error = BloockError;
    fn try_from(s: &String) -> BloockResult<Self> {
        Ok(Record::from_hash(
            from_hex(s).map_err(InfrastructureError::HasherError)?,
        ))
    }
}

#[cfg(test)]
mod tests {

    use super::*;

    #[test]
    fn test_new_record() {
        let document = Document::new(&"Some String".as_bytes().to_vec()).unwrap();
        let record = Record::new(document);

        assert_eq!(
            String::from("b585bd5a04d10f064ba44be7fae68c9837bd3be24168bc46bdf041fc2762154b"),
            record.get_hash(),
            "Wrong record hash received"
        );
    }
}
