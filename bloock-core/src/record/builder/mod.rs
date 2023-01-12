use super::{entity::record::Record, RecordError};
use crate::{
    error::{BloockResult, InfrastructureError},
    record::document::Document,
};
use bloock_encrypter::{Decrypter, Encrypter, EncrypterError};
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

    pub fn with_signer(mut self, signer: Box<dyn Signer>) -> Self {
        self.signer = Some(signer);
        self
    }

    pub fn with_encrypter(mut self, encrypter: Box<dyn Encrypter>) -> Self {
        self.encrypter = Some(encrypter);
        self
    }

    pub fn with_decrypter(mut self, decrypter: Box<dyn Decrypter>) -> Self {
        self.decrypter = Some(decrypter);
        self
    }

    pub fn build(mut self) -> BloockResult<Record> {
        if let Some(signer) = &self.signer {
            let payload = self.document.get_payload();

            let signature = signer
                .sign(&payload)
                .map_err(InfrastructureError::SignerError)?;

            self.document.add_signature(signature)?;
        }

        if let Some(decrypter) = &self.decrypter {
            if !self.document.is_encrypted() {
                Err(EncrypterError::NotEncrypted()).map_err(InfrastructureError::EncrypterError)?;
            }
            let payload = self.document.get_payload();

            let decrypted_payload = decrypter
                .decrypt(&payload)
                .map_err(InfrastructureError::EncrypterError)?;

            self.document.remove_encryption(decrypted_payload)?;
        }

        if let Some(encrypter) = &self.encrypter {
            let payload = self.document.build()?;
            let ciphertext = encrypter
                .encrypt(&payload)
                .map_err(InfrastructureError::EncrypterError)?;

            self.document.set_encryption(ciphertext)?;
        }

        Ok(Record::new(self.document))
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        anchor::entity::anchor::AnchorNetwork,
        proof::entity::{anchor::ProofAnchor, proof::Proof},
    };
    use bloock_encrypter::aes::{AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs};
    use bloock_signer::{
        ecdsa::{EcdsaSigner, EcdsaSignerArgs, ECDSA_ALG},
        Signature, SignatureHeader, ens::{EnsSigner, EnsSignerArgs, ENS_ALG},
    };

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

    #[tokio::test]
    async fn test_build_record_from_string_no_signature_nor_encryption() {
        let content = "hello world!";

        let response = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .build()
            .unwrap();

        let result_payload = String::from_utf8(response.serialize().unwrap()).unwrap();
        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let content = "hello world!";

        let record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .build()
            .unwrap();

        let document = Document::new(&record.clone().serialize().unwrap()).unwrap();

        let result_signature = document.get_signatures().unwrap();
        let result_protected = result_signature[0].clone().protected;
        let result_algorithm = result_signature[0].clone().header.alg;
        let result_public_key = result_signature[0].clone().header.kid;
        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();
        let result_proof = document.get_proof();

        assert_eq!(1, result_signature.len());
        assert_eq!("e30", result_protected);
        assert_eq!(ECDSA_ALG, result_algorithm);
        assert_eq!(
            "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8",
            result_public_key
        );
        assert_ne!(content, result_payload);
        assert_eq!(None, result_proof);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_ens_signature() {
        let (private, public) = EcdsaSigner::generate_keys().unwrap();
        println!("PUB :=> {public}");
        let content = "hello world!";

        let record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .with_signer(EnsSigner::new_boxed(EnsSignerArgs::new(&private)))
            .build()
            .unwrap();

        let document = Document::new(&record.clone().serialize().unwrap()).unwrap();

        let result_signature = document.get_signatures().unwrap();
        let result_protected = result_signature[0].clone().protected;
        let result_algorithm = result_signature[0].clone().header.alg;
        let result_public_key = result_signature[0].clone().header.kid;
        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();
        let result_proof = document.get_proof();

        assert_eq!(1, result_signature.len());
        assert_eq!("e30", result_protected);
        assert_eq!(ENS_ALG, result_algorithm);
        assert_eq!(
            "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8",
            result_public_key
        );
        assert_ne!(content, result_payload);
        assert_eq!(None, result_proof);

        println!("=> => => => => => {:#?}", result_signature[0].get_common_name().await)
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature_and_encryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let content = "hello world!";

        let record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_ne!(content.as_bytes(), record.clone().serialize().unwrap());

        let unencrypted_record = RecordBuilder::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        let result_signature = unencrypted_record.get_signatures().unwrap();
        assert_eq!(1, result_signature.len());
        assert_eq!(
            content.as_bytes(),
            unencrypted_record.get_payload().unwrap()
        );
    }

    #[tokio::test]
    async fn test_build_record_from_pdf_set_encryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let payload = include_bytes!("../../../assets/dummy.pdf");

        let default_record = RecordBuilder::from_file(payload.to_vec())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .build()
            .unwrap();

        let encrypted_record = RecordBuilder::from_file(payload.to_vec())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_ne!(default_record.get_hash(), encrypted_record.get_hash());

        let unencrypted_record = RecordBuilder::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        let expected_signatures = vec![
            Signature {
                header: SignatureHeader {
                    alg: ECDSA_ALG.to_string(),
                    kid: "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8".to_string(),
                },
                protected: "e30".to_string(),
                signature: "30d9b2f48b3504c86dbf1072417de52b0f64651582b2002bc180ddb950aa21a23f121bfaaed6a967df08b6a7d2c8e6d54b7203c0a7b84286c85b79564e611416".to_string(),
            }
        ];

        assert_eq!(
            unencrypted_record.get_signatures().unwrap(),
            expected_signatures
        );
        assert_eq!(default_record.get_hash(), unencrypted_record.get_hash());
    }

    #[tokio::test]
    async fn test_build_record_with_encryption_and_decryption() {
        let password = "some_password";
        let content = "hello world!";

        let encrypted_record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_ne!(
            content.as_bytes(),
            encrypted_record.clone().serialize().unwrap()
        );

        let record = RecordBuilder::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_set_signature_encryption_and_decryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let content = "hello world!";

        let record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        let record = RecordBuilder::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_set_proof_encryption_and_decryption() {
        let password = "some_password";
        let content = "hello world!";

        let mut record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .build()
            .unwrap();

        record
            .set_proof(Proof {
                anchor: ProofAnchor {
                    anchor_id: 1,
                    networks: vec![AnchorNetwork {
                        name: "net".to_string(),
                        state: "state".to_string(),
                        tx_hash: "tx_hash".to_string(),
                    }],
                    root: "root".to_string(),
                    status: "status".to_string(),
                },
                bitmap: "111".to_string(),
                depth: "111".to_string(),
                leaves: vec![[0u8; 32]],
                nodes: vec![[0u8; 32]],
            })
            .unwrap();

        let encrypted_record = RecordBuilder::from_record(record.clone())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(encrypted_record.get_proof(), None);
        assert_ne!(encrypted_record.get_payload(), record.get_payload());

        let record = RecordBuilder::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_from_hex() {
        let content = "776463776463776377637765";

        RecordBuilder::from_hex(content.to_string())
            .unwrap()
            .build()
            .unwrap();
    }

    #[tokio::test]
    async fn test_build_record_from_json() {
        let content = "{\"hello\":\"world\"}";

        RecordBuilder::from_json(content.to_string())
            .unwrap()
            .build()
            .unwrap();
    }

    #[tokio::test]
    async fn test_build_record_from_file() {
        let content = "hello world!";

        let record = RecordBuilder::from_file(content.as_bytes().to_vec())
            .unwrap()
            .build()
            .unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_bytes() {
        let content = "hello world!";

        let record = RecordBuilder::from_bytes(content.as_bytes().to_vec())
            .unwrap()
            .build()
            .unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_record() {
        let content = "hello world!";

        let record = RecordBuilder::from_string(content.to_string())
            .unwrap()
            .build()
            .unwrap();

        let record = RecordBuilder::from_record(record).unwrap().build().unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }
}
