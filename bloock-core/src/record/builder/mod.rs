use bloock_encrypter::Encrypter;
use bloock_publisher::Loader;
use bloock_signer::Signer;
use serde_json::Value;

use crate::{
    error::{BloockResult, InfrastructureError},
    record::document::Document,
};

use super::{document::types::PayloadType, entity::record::Record, RecordError};

pub struct RecordBuilder {}

impl RecordBuilder {
    pub fn from_raw(record: String) -> Builder {
        let bytes = record.as_bytes().to_vec();
        match Document::deserialize(bytes.clone()) {
            Ok(d) => Builder::from_document(d),
            Err(_) => Self::from_file(bytes),
        }
    }
    pub fn from_record(record: Record) -> BloockResult<Builder> {
        match record.document {
            Some(d) => Ok(Builder::from_document(d)),
            None => Err(RecordError::DocumentNotFound.into()),
        }
    }
    pub fn from_loader<L: Loader>(loader: L) -> BloockResult<Builder> {
        let bytes = loader
            .retrieve()
            .map_err(InfrastructureError::PublisherError)?;
        let document = Document::deserialize(bytes)?;
        Ok(Builder::from_document(document))
    }
    pub fn from_string<S: ToString>(s: S) -> Builder {
        let string = s.to_string();
        let payload = string.as_bytes();
        Builder::new(payload.to_vec(), PayloadType::String)
    }
    pub fn from_hex(hex: String) -> BloockResult<Builder> {
        let payload = hex::decode(hex).map_err(|_| RecordError::InvalidHex)?;
        Ok(Builder::new(payload.to_vec(), PayloadType::Hex))
    }
    pub fn from_json(json: String) -> BloockResult<Builder> {
        let payload: Value = serde_json::from_str(&json).map_err(|_| RecordError::InvalidJson)?;
        let bytes = serde_json::to_vec(&payload).map_err(|_| RecordError::InvalidJson)?;

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
    pub fn build(mut self) -> BloockResult<Record> {
        if let Some(signer) = &self.signer {
            let payload = self.document.get_payload();

            let signature = signer
                .sign(payload)
                .map_err(InfrastructureError::SignerError)?;
            self.document.add_signature(signature);
        }

        if let Some(encrypter) = &self.encrypter {
            let payload = self.document.get_payload();

            let encryption = encrypter
                .encrypt(payload)
                .map_err(InfrastructureError::EncrypterError)?;
            self.document.set_encryption(encryption);
        }

        Ok(Record::new(self.document))
    }
}

#[cfg(test)]
mod tests {

    use bloock_encrypter::{Encryption, EncryptionHeader};
    use bloock_hasher::from_hex;
    use bloock_publisher::test::{TestLoader, TestLoaderArgs};
    use bloock_signer::{Signature, SignatureHeader};

    use crate::proof::entity::{anchor::ProofAnchor, proof::Proof};

    use super::*;

    #[test]
    fn test_from_record() {
        let payload = "Hello world".to_string();

        let r = RecordBuilder::from_string(payload).build().unwrap();
        let r2 = RecordBuilder::from_record(r.clone())
            .unwrap()
            .build()
            .unwrap();

        assert_eq!(
            r.document.clone().unwrap().headers,
            r2.document.clone().unwrap().headers,
            "Unexpected type received"
        );
        assert_eq!(
            r.document.clone().unwrap().get_payload(),
            r2.document.clone().unwrap().get_payload(),
            "Unexpected payload received"
        );
        assert_eq!(
            r.document.clone().unwrap().signatures,
            r2.document.clone().unwrap().signatures,
            "Unexpected signatures received"
        );
        assert_eq!(
            r.document.clone().unwrap().encryption,
            r2.document.clone().unwrap().encryption,
            "Unexpected encryption received"
        );
        assert_eq!(
            r.document.unwrap().proof,
            r2.document.unwrap().proof,
            "Unexpected proof received"
        );
    }

    #[test]
    fn test_from_string() {
        let payload = "Hello world".to_string();
        let r = RecordBuilder::from_string(payload.clone()).build().unwrap();

        let document = r.document.unwrap();
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

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
        let signatures = vec![Signature {
            protected: "e0".to_string(),
            header: SignatureHeader {
                alg: "ECSDA".to_string(),
                kid: "1234567890abcdef".to_string(),
            },
            signature: "1234567890abcdef1234567890abcdef".to_string(),
        }];
        let encryption = Encryption {
            protected: "e0".to_string(),
            header: EncryptionHeader {
                alg: "ECSDA".to_string(),
            },
        };
        let proof = Proof {
            leaves: vec![from_hex(
                "1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97",
            )
            .unwrap()],
            nodes: vec![from_hex(
                "1ca0e9d9a206f08d38a4e2cf485351674ffc9b0f3175e0cb6dbd8e0e19829b97",
            )
            .unwrap()],
            depth: "000500050004000400040004000400030001".to_string(),
            bitmap: "6d80".to_string(),
            anchor: ProofAnchor {
                anchor_id: 1,
                networks: vec![],
                root: "".to_string(),
                status: "pending".to_string(),
            },
        };
        let document = Document::new(
            headers.clone(),
            payload.clone(),
            Some(signatures.clone()),
            Some(encryption.clone()),
            Some(proof.clone()),
        );
        let r = RecordBuilder::from_loader(TestLoader::new(TestLoaderArgs {
            document: document.serialize().unwrap().as_bytes().to_vec(),
        }))
        .unwrap()
        .build()
        .unwrap();

        assert_eq!(
            headers,
            r.document.clone().unwrap().headers,
            "Unexpected type received"
        );
        assert_eq!(
            &payload,
            r.document.clone().unwrap().get_payload(),
            "Unexpected payload received"
        );
        assert_eq!(
            signatures,
            r.document.clone().unwrap().signatures.unwrap(),
            "Unexpected signatures received"
        );
        assert_eq!(
            encryption,
            r.document.clone().unwrap().encryption.unwrap(),
            "Unexpected encryption received"
        );
        assert_eq!(
            proof,
            r.document.unwrap().proof.unwrap(),
            "Unexpected proof received"
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
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

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

        let document = r.document.unwrap();
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

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

        let document = r.document.unwrap();
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

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

        let document = r.document.unwrap();
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

        assert_eq!(
            PayloadType::Bytes.to_header(),
            document_type,
            "Unexpected type received"
        );
        assert_eq!(&payload, document_payload, "Unexpected payload received");
    }

    #[test]
    fn test_from_raw() {
        let payload = "eyJ0eSI6InN0cmluZyJ9.U29tZSBzdHJpbmc.W3siaGVhZGVyIjp7ImFsZyI6IkVDU0RBIiwia2lkIjoiMTIzNDU2Nzg5MGFiY2RlZiJ9LCJwcm90ZWN0ZWQiOiJlMCIsInNpZ25hdHVyZSI6IjEyMzQ1Njc4OTBhYmNkZWYxMjM0NTY3ODkwYWJjZGVmIn1d.eyJoZWFkZXIiOnsiYWxnIjoiRUNTREEifSwicHJvdGVjdGVkIjoiZTAifQ.eyJhbmNob3IiOnsiYW5jaG9yX2lkIjoxLCJuZXR3b3JrcyI6W10sInJvb3QiOiIiLCJzdGF0dXMiOiJwZW5kaW5nIn0sImJpdG1hcCI6IjZkODAiLCJkZXB0aCI6IjAwMDUwMDA1MDAwNDAwMDQwMDA0MDAwNDAwMDQwMDAzMDAwMSIsImxlYXZlcyI6WyIxY2EwZTlkOWEyMDZmMDhkMzhhNGUyY2Y0ODUzNTE2NzRmZmM5YjBmMzE3NWUwY2I2ZGJkOGUwZTE5ODI5Yjk3Il0sIm5vZGVzIjpbIjFjYTBlOWQ5YTIwNmYwOGQzOGE0ZTJjZjQ4NTM1MTY3NGZmYzliMGYzMTc1ZTBjYjZkYmQ4ZTBlMTk4MjliOTciXX0";
        let r = RecordBuilder::from_raw(payload.to_string()).build().unwrap();

        let document = r.document.unwrap();
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

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
    fn test_from_raw_invalid_format() {
        let payload = "asdf";
        let r = RecordBuilder::from_raw(payload.to_string()).build().unwrap();

        let document = r.document.unwrap();
        let document_type = document.clone().headers;
        let document_payload = document.get_payload();

        assert_eq!(
            PayloadType::File(Some("unknown_file".to_string())).to_header(),
            document_type,
            "Unexpected type received"
        );
        assert_eq!(
            payload.as_bytes(),
            document_payload,
            "Unexpected payload received"
        );
    }
}
