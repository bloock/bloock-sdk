use std::cmp::Ordering;

use bloock_hasher::{keccak::Keccak256, Hasher, H256};

use crate::{
    error::BloockResult,
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
        let hash = Keccak256::generate_hash(document.get_payload());
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

    pub fn get_proof(&self) -> Option<&Proof> {
        match &self.document {
            Some(d) => d.proof.as_ref(),
            None => None,
        }
    }

    pub fn serialize(self) -> BloockResult<String> {
        match self.document {
            Some(d) => d.serialize(),
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

#[cfg(test)]
mod tests {

    use crate::record::document::types::PayloadType;

    use super::*;

    #[test]
    fn test_new_record() {
        let document = Document::new(
            PayloadType::String.to_header(),
            "Some String".as_bytes().to_vec(),
            None,
            None,
            None,
        );
        let record = Record::new(document);

        assert_eq!(
            String::from("b585bd5a04d10f064ba44be7fae68c9837bd3be24168bc46bdf041fc2762154b"),
            record.get_hash(),
            "Wrong record hash received"
        );
    }

    #[test]
    fn test_record_serialize() {
        let payload = "Test Data".as_bytes().to_vec();
        let document = Document::new(
            PayloadType::String.to_header(),
            payload.clone(),
            None,
            None,
            None,
        );
        let record = Record::new(document);

        let expected_headers =
            base64_url::encode(&serde_json::to_vec(&PayloadType::String.to_header()).unwrap());
        let expected_payload = base64_url::encode(&payload);
        let expected_output = format!("{}.{}...", expected_headers, expected_payload);

        assert_eq!(
            expected_output,
            record.serialize().unwrap(),
            "Wrong record hash received"
        )
    }
}
