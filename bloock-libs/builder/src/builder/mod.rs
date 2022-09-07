use crate::document::types::PayloadType;
use crate::document::Document;
use crate::publisher::Loader;
use crate::record::Record;
use crate::{encrypter::Encrypter, signer::Signer};
use crate::{BuilderError, Result};
use serde_json::Value;

pub struct RecordBuilder {}

impl RecordBuilder {
    pub fn from_record(record: Record) -> Builder {
        Builder::from_document(record.document)
    }
    pub fn from_loader<L: Loader>(loader: L) -> Result<Builder> {
        let bytes = loader.retrieve()?;
        let document = Document::deserialize(bytes)?;
        Ok(Builder::from_document(document))
    }
    pub fn from_string(s: String) -> Builder {
        let payload = s.as_bytes();
        Builder::new(payload.to_vec(), PayloadType::String)
    }
    pub fn from_hex(hex: String) -> Result<Builder> {
        let payload = hex::decode(hex).map_err(|e| BuilderError::DecodeError(e.to_string()))?;
        Ok(Builder::new(payload.to_vec(), PayloadType::Hex))
    }
    pub fn from_json(json: Value) -> Result<Builder> {
        let payload =
            serde_json::to_vec(&json).map_err(|e| BuilderError::DecodeError(e.to_string()))?;
        Ok(Builder::new(payload.to_vec(), PayloadType::Json))
    }
    pub fn from_file(file_bytes: Vec<u8>) -> Builder {
        let media_type = infer::get(&file_bytes);
        Builder::new(
            file_bytes,
            PayloadType::File(media_type.map(|t| t.mime_type().to_string())),
        )
    }
    pub fn from_bytes(bytes: Vec<u8>) -> Builder {
        Builder::new(bytes, PayloadType::Bytes)
    }
}

pub struct Builder {
    document: Document,
    signer: Option<Box<dyn Signer>>,
    encrypter: Option<Box<dyn Encrypter>>,
}

impl Builder {
    fn new(payload: Vec<u8>, payload_type: PayloadType) -> Self {
        let document = Document::new(payload_type.to_header(), payload, None, None, None);
        Self {
            document,
            signer: None,
            encrypter: None,
        }
    }
    fn from_document(document: Document) -> Self {
        Self {
            document,
            signer: None,
            encrypter: None,
        }
    }
    pub fn with_signer<S: Signer + 'static>(mut self, signer: S) -> Self {
        self.signer = Some(Box::new(signer));
        self
    }
    pub fn with_encrypter<E: Encrypter + 'static>(mut self, encrypter: E) -> Self {
        self.encrypter = Some(Box::new(encrypter));
        self
    }
    pub fn build(mut self) -> Result<Record> {
        if let Some(signer) = &self.signer {
            let payload = self.document.get_payload()?;

            let signature = signer.sign(&payload).unwrap();
            self.document.add_signature(signature);
        }

        if let Some(encrypter) = &self.encrypter {
            let payload = self.document.get_payload()?;

            let encryption = encrypter.encrypt(&payload).unwrap();
            self.document.set_encryption(encryption);
        }

        Record::new(self.document)
    }
}
