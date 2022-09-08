use crate::document::Document;
use crate::hasher::{keccak::Keccak256, Hasher};
use crate::{BuilderError, Result};

#[derive(Clone)]
pub struct Record {
    pub document: Document,
    hash: String,
}

impl Record {
    pub fn new(document: Document) -> Self {
        let hash = Keccak256::generate_hash(document.get_payload());
        Self { document, hash }
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

#[cfg(test)]
mod tests {
    use crate::document::types::PayloadType;

    use super::*;

    #[test]
    fn test_new_record() {
        let document = Document::new(
            PayloadType::String.to_header(),
            "Test Data".as_bytes().to_vec(),
            None,
            None,
            None,
        );
        let record = Record::new(document);

        assert_eq!(
            String::from("e287462a142cd6237de5a89891ad82065f6aca6644c161b1a61c933c5d26117a"),
            record.get_hash(),
            "Wrong record hash received"
        )
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
