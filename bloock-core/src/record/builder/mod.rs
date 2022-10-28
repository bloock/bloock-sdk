use super::{entity::record::Record, RecordError};
use crate::{
    error::{BloockResult, InfrastructureError},
    record::document::Document,
};
use bloock_encrypter::{Decrypter, Encrypter};
use bloock_signer::Signer;
use serde_json::Value;

pub struct RecordBuilder {}

impl RecordBuilder {
    pub fn from_record(record: Record) -> BloockResult<Builder> {
        match record.document {
            Some(d) => Ok(Builder::from_document(d)),
            None => Err(RecordError::DocumentNotFound.into()),
        }
    }
    pub async fn from_loader<L: Loader>(loader: L) -> BloockResult<Builder> {
        let bytes = loader
            .retrieve()
            .await
            .map_err(InfrastructureError::PublisherError)?;
        let document = Document::new(&bytes)?;
        Ok(Builder::from_document(document))
    }
    pub fn from_string<S: ToString>(s: S) -> BloockResult<Builder> {
        let string = s.to_string();
        let payload = string.as_bytes();
        Builder::new(payload.to_vec())
    }
    pub fn from_hex(hex: String) -> BloockResult<Builder> {
        let payload = hex::decode(hex).map_err(|_| RecordError::InvalidHex)?;
        Builder::new(payload.to_vec())
    }
    pub fn from_json(json: String) -> BloockResult<Builder> {
        let payload: Value = serde_json::from_str(&json).map_err(|_| RecordError::InvalidJson)?;
        let bytes = serde_json::to_vec(&payload).map_err(|_| RecordError::InvalidJson)?;

        Builder::new(bytes)
    }
    pub fn from_file(file_bytes: Vec<u8>) -> BloockResult<Builder> {
        Builder::new(file_bytes)
    }
    pub fn from_bytes(bytes: Vec<u8>) -> BloockResult<Builder> {
        Builder::new(bytes)
    }
}

pub struct Builder {
    document: Document,
    signer: Option<Box<dyn Signer>>,
    encrypter: Option<Box<dyn Encrypter>>,
    decrypter: Option<Box<dyn Decrypter>>,
}

impl Builder {
    fn new(payload: Vec<u8>) -> BloockResult<Self> {
        let document = Document::new(&payload)?;
        Ok(Self {
            document,
            signer: None,
            encrypter: None,
            decrypter: None,
        })
    }

    fn from_document(document: Document) -> Self {
        Self {
            document,
            signer: None,
            encrypter: None,
            decrypter: None,
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

    pub fn with_decrypter<E: Decrypter + 'static>(mut self, decrypter: E) -> Self {
        self.decrypter = Some(Box::new(decrypter));
        self
    }

    pub fn build(mut self) -> BloockResult<Record> {
        if let Some(signer) = &self.signer {
            let payload = self.document.get_payload();

            let signature = signer
                .sign(&payload)
                .map_err(InfrastructureError::SignerError)?;
            self.document.add_signature(signature);
        }

        if let Some(decrypter) = &self.decrypter {
            let payload = self.document.get_payload();

            let decrypted_payload = decrypter
                .decrypt(&payload, &[/* TODO */])
                .map_err(InfrastructureError::EncrypterError)?;

            self.document.remove_encryption(decrypted_payload);
        }

        // We create the document before encryption since the hash has to be of the unencypted payload
        let mut record = Record::new(self.document.clone());

        if let Some(encrypter) = &self.encrypter {
            let payload = self.document.get_payload();
            let encryption = encrypter
                .encrypt(&payload, &[/* TODO */])
                .map_err(InfrastructureError::EncrypterError)?;

            if let Some(doc) = record.document.as_mut() {
                doc.set_encryption(encryption)
            }
        }

        Ok(record)
    }
}

#[cfg(test)]
mod tests {

    use bloock_publisher::test::{TestLoader, TestLoaderArgs};

    use super::*;

    #[test]
    fn test_from_record() {
        let payload = "Hello world".to_string();

        let r = RecordBuilder::from_string(payload)
            .unwrap()
            .build()
            .unwrap();
        let r2 = RecordBuilder::from_record(r.clone())
            .unwrap()
            .build()
            .unwrap();

        assert_eq!(
            r.document.clone().unwrap().get_payload(),
            r2.document.clone().unwrap().get_payload(),
            "Unexpected payload received"
        );
        assert_eq!(
            r.document.clone().unwrap().get_signatures(),
            r2.document.clone().unwrap().get_signatures(),
            "Unexpected signatures received"
        );
        assert_eq!(
            r.document.clone().unwrap().get_encryption(),
            r2.document.clone().unwrap().get_encryption(),
            "Unexpected encryption received"
        );
        assert_eq!(
            r.document.unwrap().get_proof(),
            r2.document.unwrap().get_proof(),
            "Unexpected proof received"
        );
    }

    #[test]
    fn test_from_string() {
        let payload = "Hello world".to_string();
        let r = RecordBuilder::from_string(payload.clone())
            .unwrap()
            .build()
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            payload.as_bytes(),
            document.get_payload(),
            "Unexpected payload received"
        );
    }

    #[tokio::test]
    async fn test_from_loader() {
        let payload = vec![1, 2, 3, 4, 5];
        let r = RecordBuilder::from_loader(TestLoader::new(TestLoaderArgs {}))
            .await
            .unwrap()
            .build()
            .unwrap();

        assert_eq!(
            payload,
            r.document.clone().unwrap().get_payload(),
            "Unexpected payload received"
        );
    }

    #[test]
    fn test_from_hex() {
        let payload = "1234567890abcdef".to_string();
        let r = RecordBuilder::from_hex(payload.clone())
            .unwrap()
            .build()
            .unwrap();

        let document = r.document.unwrap();
        let document_payload = document.get_payload();

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

        let document = r.document.unwrap();
        let document_payload = document.get_payload();

        assert_eq!(
            payload.as_bytes(),
            document_payload,
            "Unexpected payload received"
        );
    }

    #[test]
    fn test_from_file() {
        let payload = vec![1, 2, 3, 4, 5];
        let r = RecordBuilder::from_file(payload.clone())
            .unwrap()
            .build()
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            payload,
            document.get_payload(),
            "Unexpected payload received"
        );
    }

    #[test]
    fn test_from_bytes() {
        let payload = vec![1, 2, 3, 4, 5];
        let r = RecordBuilder::from_bytes(payload.clone())
            .unwrap()
            .build()
            .unwrap();

        let document = r.document.unwrap();
        let document_payload = document.get_payload();

        assert_eq!(payload, document_payload, "Unexpected payload received");
    }
}
