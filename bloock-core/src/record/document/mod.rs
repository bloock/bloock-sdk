use crate::{
    error::{BloockResult, InfrastructureError},
    proof::entity::proof::Proof,
};
use bloock_encrypter::{EncrypterError, EncryptionAlg};
use bloock_metadata::{FileParser, MetadataParser};
use bloock_signer::Signature;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, Eq, PartialEq)]
pub struct Metadata {
    pub signatures: Option<Vec<Signature>>,
    pub proof: Option<Proof>,
    pub is_encrypted: bool,
}

#[derive(Clone, Debug)]
pub struct Document {
    parser: FileParser,
    is_encrypted: bool,

    pub payload: Vec<u8>,
    pub signatures: Option<Vec<Signature>>,
    pub proof: Option<Proof>,
}

impl Document {
    pub fn new(payload: &[u8]) -> BloockResult<Self> {
        let parser = FileParser::load(payload).map_err(InfrastructureError::MetadataError)?;

        let is_encrypted = parser.get("is_encrypted").unwrap_or(false);
        let proof = parser.get("proof");
        let signatures = parser.get("signatures");

        let payload = parser
            .get_data()
            .map_err(InfrastructureError::MetadataError)?;

        let doc = Document {
            parser,
            payload,
            proof,
            signatures,
            is_encrypted,
        };

        Ok(doc)
    }

    pub fn add_signature(&mut self, signature: Signature) -> BloockResult<&mut Self> {
        if self.is_encrypted {
            return Err(InfrastructureError::EncrypterError(EncrypterError::Encrypted()).into());
        }
        let signatures = match self.signatures.clone() {
            Some(mut s) => {
                s.push(signature);
                s
            }
            None => vec![signature],
        };

        self.signatures = Some(signatures);

        if self.proof.is_some() {
            self.proof = None;
        }

        Ok(self)
    }

    pub fn set_encryption(&mut self, ciphertext: Vec<u8>, alg: &str) -> BloockResult<()> {
        self.update_parser(ciphertext)?;
        self.update_payload()?;

        self.signatures = None;
        self.proof = None;
        self.is_encrypted = true;

        self.set_encryption_alg(alg)?;

        Ok(())
    }

    fn set_encryption_alg(&mut self, alg: &str) -> BloockResult<()> {
        self.parser
            .set("encryption_alg", &alg)
            .map_err(|err| InfrastructureError::MetadataError(err).into())
    }

    pub fn get_encryption_alg(&self) -> BloockResult<EncryptionAlg> {
        match self.parser.get::<String>("encryption_alg") {
            Some(alg) => alg
                .as_str()
                .try_into()
                .map_err(|err| InfrastructureError::EncrypterError(err).into()),
            None => Err(InfrastructureError::EncrypterError(
                EncrypterError::CouldNotRetrieveAlgorithm(),
            )
            .into()),
        }
    }

    pub fn remove_encryption(&mut self, decrypted_payload: Vec<u8>) -> BloockResult<()> {
        self.update_parser(decrypted_payload)?;
        self.update_payload()?;

        self.is_encrypted = false;
        self.proof = self.parser.get("proof");
        self.signatures = self.parser.get("signatures");
        Ok(())
    }

    pub fn is_encrypted(&self) -> bool {
        self.is_encrypted
    }

    pub fn set_proof(&mut self, proof: Proof) -> BloockResult<()> {
        if self.is_encrypted {
            return Err(InfrastructureError::EncrypterError(EncrypterError::Encrypted()).into());
        }

        self.proof = Some(proof);
        Ok(())
    }

    pub fn get_signatures(&self) -> Option<Vec<Signature>> {
        self.signatures.clone()
    }

    pub fn get_proof(&self) -> Option<Proof> {
        self.proof.clone()
    }

    pub fn get_payload(&self) -> Vec<u8> {
        self.payload.clone()
    }

    fn update_parser(&mut self, payload: Vec<u8>) -> BloockResult<()> {
        self.parser = FileParser::load(&payload).map_err(InfrastructureError::MetadataError)?;
        Ok(())
    }

    fn update_payload(&mut self) -> BloockResult<()> {
        self.payload = self
            .parser
            .get_data()
            .map_err(InfrastructureError::MetadataError)?;
        Ok(())
    }

    pub fn build(&mut self) -> BloockResult<Vec<u8>> {
        let metadata = Metadata {
            signatures: self.get_signatures(),
            proof: self.get_proof(),
            is_encrypted: self.is_encrypted,
        };

        Self::build_file(&mut self.parser, metadata)
    }

    fn build_file(parser: &mut FileParser, metadata: Metadata) -> BloockResult<Vec<u8>> {
        if metadata.is_encrypted {
            parser
                .set("is_encrypted", &true)
                .map_err(InfrastructureError::MetadataError)?;
        }

        match metadata.proof {
            Some(proof) => parser
                .set("proof", &proof)
                .map_err(InfrastructureError::MetadataError)?,
            None => {
                let proof: Option<Proof> = parser.get("proof");
                if proof.is_some() {
                    parser
                        .del("proof")
                        .map_err(InfrastructureError::MetadataError)?;
                }
            }
        }

        if let Some(signatures) = metadata.signatures {
            parser
                .set("signatures", &signatures)
                .map_err(InfrastructureError::MetadataError)?;
        }

        let result = parser.build().map_err(InfrastructureError::MetadataError)?;
        Ok(result)
    }
}

impl PartialEq for Document {
    fn eq(&self, other: &Self) -> bool {
        self.get_payload() == other.get_payload()
    }
}

impl Eq for Document {}

#[cfg(test)]
mod tests {

    use bloock_encrypter::{
        aes::{AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs},
        Decrypter, Encrypter,
    };

    use bloock_signer::{
        ecdsa::{EcdsaSigner, EcdsaSignerArgs},
        SignatureHeader, Signer,
    };

    use crate::{
        anchor::entity::anchor::AnchorNetwork, proof::entity::anchor::ProofAnchor,
        record::entity::record::Record,
    };

    use super::*;

    #[tokio::test]
    async fn test_signed_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let signer = EcdsaSigner::new(EcdsaSignerArgs::new(
            "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c9457",
            None,
        ));

        let mut document = Document::new(payload).unwrap();
        let signature = signer.sign(payload).unwrap();
        document.add_signature(signature.clone()).unwrap();
        let built_doc = document.build().unwrap();
        let signed_doc = Document::new(&built_doc).unwrap();
        assert_eq!(signed_doc.get_signatures().unwrap(), vec![signature]);
    }

    #[tokio::test]
    async fn test_encrypted_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password", &[]));

        let mut document = Document::new(payload).unwrap();
        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        let ciphertext = encrypter.encrypt(&document.build().unwrap()).unwrap();
        document
            .set_encryption(ciphertext, encrypter.get_alg())
            .unwrap();

        let built_doc = document.build().unwrap();
        let encrypted_doc = Document::new(&built_doc).unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password", &[]));
        let decrypted_payload = decrypter.decrypt(&encrypted_doc.get_payload()).unwrap();

        assert_eq!(decrypted_payload, expected_payload);

        let decrypted_doc = Document::new(&decrypted_payload).unwrap();
        let decrypted_record = Record::new(decrypted_doc).unwrap();

        assert_eq!(original_record.get_hash(), decrypted_record.get_hash());
    }
    #[tokio::test]
    async fn test_encrypted_pdf_with_proof() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password", &[]));

        let mut document = Document::new(payload).unwrap();

        let proof = Proof {
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
        };

        document.set_proof(proof.clone()).unwrap();

        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        let ciphertext = encrypter.encrypt(&document.build().unwrap()).unwrap();
        document
            .set_encryption(ciphertext, encrypter.get_alg())
            .unwrap();

        let built_doc = document.build().unwrap();
        let encrypted_doc = Document::new(&built_doc).unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password", &[]));
        let decrypted_payload = decrypter.decrypt(&encrypted_doc.get_payload()).unwrap();

        assert_eq!(decrypted_payload, expected_payload);

        let decrypted_doc = Document::new(&decrypted_payload).unwrap();
        let decrypted_record = Record::new(decrypted_doc).unwrap();

        assert_eq!(original_record.get_hash(), decrypted_record.get_hash());
        assert_eq!(decrypted_record.get_proof().unwrap(), proof);
    }

    #[tokio::test]
    async fn test_encrypted_pdf_with_proof_and_signatures() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password", &[]));

        let mut document = Document::new(payload).unwrap();

        let proof = Proof {
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
        };

        let signature = Signature {
            header: SignatureHeader {
                alg: "ES256K".to_string(),
                kid: "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8".to_string(),
            },
            protected: "e30".to_string(),
            signature: "945efccb10955499e50bd4e1eeadb51aac9136f3e91b8d29c1b817cb42284268500b5f191693a0d927601df5f282804a6eacf5ff8a1522bda5c2ec4dc681750b".to_string(),
        };

        document.set_proof(proof).unwrap();

        document.add_signature(signature.clone()).unwrap();

        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        let ciphertext = encrypter.encrypt(&document.build().unwrap()).unwrap();
        document
            .set_encryption(ciphertext, encrypter.get_alg())
            .unwrap();

        let built_doc = document.build().unwrap();
        let encrypted_doc = Document::new(&built_doc).unwrap();

        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password", &[]));
        let decrypted_payload = decrypter.decrypt(&encrypted_doc.get_payload()).unwrap();

        assert_eq!(decrypted_payload, expected_payload);

        let decrypted_doc = Document::new(&decrypted_payload).unwrap();
        let decrypted_record = Record::new(decrypted_doc).unwrap();

        assert_eq!(original_record.get_hash(), decrypted_record.get_hash());
        assert_eq!(decrypted_record.get_signatures().unwrap(), vec![signature]);
        assert!(decrypted_record.get_proof().is_none());
    }
}
