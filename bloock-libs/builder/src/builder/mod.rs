use serde_json::Value;

use crate::document::types::PayloadType;
use crate::document::Document;
use crate::publisher::Loader;
use crate::record::Record;
use crate::{encrypter::Encrypter, signer::Signer};
use crate::{BuilderError, Result};

pub struct RecordBuilder {}

impl RecordBuilder {
    pub fn from_record(record: Record) -> Builder {
        Builder::from_document(record.document)
    }
    pub fn from_loader<L: Loader>(loader: L) -> Result<Builder> {
        let bytes = loader.retrieve()?;
        println!("{}", String::from_utf8(bytes.clone()).unwrap());
        let document = Document::deserialize(bytes)?;
        Ok(Builder::from_document(document))
    }
    pub fn from_string<S: ToString>(s: S) -> Builder {
        let string = s.to_string();
        let payload = string.as_bytes();
        Builder::new(payload.to_vec(), PayloadType::String)
    }
    pub fn from_hex(hex: String) -> Result<Builder> {
        let payload = hex::decode(hex).map_err(|e| BuilderError::DecodeError(e.to_string()))?;
        Ok(Builder::new(payload.to_vec(), PayloadType::Hex))
    }
    pub fn from_json(json: String) -> Result<Builder> {
        let payload: Value = serde_json::from_str(&json).map_err(|_| BuilderError::InvalidJson)?;
        let bytes =
            serde_json::to_vec(&payload).map_err(|e| BuilderError::DecodeError(e.to_string()))?;

        Ok(Builder::new(bytes, PayloadType::Json))
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
            let payload = self.document.get_payload();

            let signature = signer.sign(payload)?;
            self.document.add_signature(signature);
        }

        if let Some(encrypter) = &self.encrypter {
            let payload = self.document.get_payload();

            let encryption = encrypter.encrypt(payload)?;
            self.document.set_encryption(encryption);
        }

        Ok(Record::new(self.document))
    }
}

#[cfg(test)]
mod tests {

    use crate::publisher::test::{TestLoader, TestLoaderArgs};

    use super::*;

    #[test]
    fn test_from_record() {
        let payload = "Hello world".to_string();

        let r = RecordBuilder::from_string(payload).build().unwrap();
        let r2 = RecordBuilder::from_record(r.clone()).build().unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();
        let document_signatures = r.document.clone().signatures;
        let document_encryption = r.document.clone().encryption;
        let document_proof = r.document.clone().proof;

        let document_type2 = r2.document.clone().headers;
        let document_payload2 = r2.document.get_payload();
        let document_signatures2 = r2.document.clone().signatures;
        let document_encryption2 = r2.document.clone().encryption;
        let document_proof2 = r2.document.clone().proof;

        assert_eq!(document_type, document_type2, "Unexpected type received");
        assert_eq!(
            document_payload, document_payload2,
            "Unexpected payload received"
        );
        assert_eq!(
            document_signatures, document_signatures2,
            "Unexpected signatures received"
        );
        assert_eq!(
            document_encryption, document_encryption2,
            "Unexpected encryption received"
        );
        assert_eq!(document_proof, document_proof2, "Unexpected proof received");
    }

    #[test]
    fn test_from_string() {
        let payload = "Hello world".to_string();
        let r = RecordBuilder::from_string(payload.clone()).build().unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();

        assert_eq!(
            PayloadType::String.to_header(),
            document_type,
            "Unexpected type received"
        );
        assert_eq!(
            payload.as_bytes(),
            document_payload,
            "Unexpected payload received"
        );
    }

    #[test]
    fn test_from_loader() {
        let headers = PayloadType::File(Some("application/json".to_string())).to_header();
        let payload = vec![1, 2, 3, 4, 5];
        let document = Document::new(headers.clone(), payload.clone(), None, None, None);
        let r = RecordBuilder::from_loader(TestLoader::new(TestLoaderArgs { document }))
            .unwrap()
            .build()
            .unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();

        assert_eq!(headers, document_type, "Unexpected type received");

        assert_eq!(&payload, document_payload, "Unexpected payload received");
    }

    #[test]
    fn test_from_hex() {
        let payload = "1234567890abcdef".to_string();
        let r = RecordBuilder::from_hex(payload.clone())
            .unwrap()
            .build()
            .unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();

        assert_eq!(
            PayloadType::Hex.to_header(),
            document_type,
            "Unexpected type received"
        );
        assert_eq!(
            hex::decode(payload).unwrap(),
            document_payload,
            "Unexpected payload received"
        );
    }

    #[test]
    fn test_from_json() {
        let payload = "{\"hello\":\"world\"}".to_string();
        let r = RecordBuilder::from_json(payload.clone())
            .unwrap()
            .build()
            .unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();

        assert_eq!(
            PayloadType::Json.to_header(),
            document_type,
            "Unexpected type received"
        );

        assert_eq!(
            payload.as_bytes(),
            document_payload,
            "Unexpected payload received"
        );
    }

    #[test]
    fn test_from_file() {
        let payload = vec![1, 2, 3, 4, 5];
        let r = RecordBuilder::from_file(payload.clone()).build().unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();

        assert_eq!(
            PayloadType::File(None).to_header(),
            document_type,
            "Unexpected type received"
        );
        assert_eq!(&payload, document_payload, "Unexpected payload received");
    }

    #[test]
    fn test_from_bytes() {
        let payload = vec![1, 2, 3, 4, 5];
        let r = RecordBuilder::from_bytes(payload.clone()).build().unwrap();

        let document_type = r.document.clone().headers;
        let document_payload = r.document.get_payload();

        assert_eq!(
            PayloadType::Bytes.to_header(),
            document_type,
            "Unexpected type received"
        );
        assert_eq!(&payload, document_payload, "Unexpected payload received");
    }
}
