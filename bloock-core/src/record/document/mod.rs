use crate::{
    error::{BloockResult, InfrastructureError},
    proof::entity::proof::Proof,
};
use bloock_encrypter::Encryption;
use bloock_metadata::{FileParser, MetadataParser};
use bloock_signer::Signature;
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize, Deserialize, Eq, PartialEq)]
pub struct Metadata {
    pub signatures: Option<Vec<Signature>>,
    pub encryption: Option<Encryption>,
    pub proof: Option<Proof>,
}

#[derive(Clone)]

pub struct Document {
    parser: FileParser,

    pub payload: Vec<u8>,
    pub signatures: Option<Vec<Signature>>,
    pub encryption: Option<Encryption>,
    pub proof: Option<Proof>,
}

impl Document {
    pub fn new(payload: &[u8]) -> BloockResult<Self> {
        let mut parser = FileParser::load(payload).map_err(InfrastructureError::MetadataError)?;

        let proof = parser.get("proof");
        let signatures = parser.get("signatures");
        let encryption = parser.get("encryption");

        let payload = Self::fetch_payload(&mut parser, signatures.clone())?;

        Ok(Document {
            parser,
            payload,
            proof,
            signatures,
            encryption,
        })
    }

    pub fn add_signature(&mut self, signature: Signature) -> &mut Self {
        let signatures = match self.signatures.clone() {
            Some(mut s) => {
                s.push(signature);
                s
            }
            None => vec![signature],
        };

        self.signatures = Some(signatures);
        self
    }

    pub fn set_encryption(&mut self, encryption: Encryption) {
        self.payload = encryption.ciphertext.clone();
        self.encryption = Some(encryption);
    }

    pub fn remove_encryption(&mut self, decrypted_payload: Vec<u8>) {
        self.payload = decrypted_payload;
        self.encryption = None;
    }

    pub fn set_proof(&mut self, proof: Proof) -> &mut Self {
        self.proof = Some(proof);
        self
    }

    pub fn get_signatures(&self) -> Option<Vec<Signature>> {
        self.signatures.clone()
    }
    pub fn get_encryption(&self) -> Option<Encryption> {
        self.encryption.clone()
    }
    pub fn get_proof(&self) -> Option<Proof> {
        self.proof.clone()
    }

    pub fn get_payload(&self) -> Vec<u8> {
        self.payload.clone()
    }

    fn fetch_payload(
        parser: &mut FileParser,
        signatures: Option<Vec<Signature>>,
    ) -> BloockResult<Vec<u8>> {
        let metadata = Metadata {
            signatures: signatures,
            encryption: None,
            proof: None,
        };

        Self::build_file(parser, metadata)
    }

    pub fn build(&mut self) -> BloockResult<Vec<u8>> {
        let metadata = Metadata {
            signatures: self.get_signatures(),
            encryption: self.get_encryption(),
            proof: self.get_proof(),
        };

        Self::build_file(&mut self.parser, metadata)
    }

    fn build_file(parser: &mut FileParser, metadata: Metadata) -> BloockResult<Vec<u8>> {
        if let Some(proof) = metadata.proof {
            parser
                .set("proof", &proof)
                .map_err(InfrastructureError::MetadataError)?;
        }
        if let Some(signatures) = metadata.signatures {
            parser
                .set("signatures", &signatures)
                .map_err(InfrastructureError::MetadataError)?;
        }
        if let Some(encryption) = metadata.encryption {
            parser
                .set("encryption", &encryption)
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

    use bloock_signer::{
        ecsda::{EcsdaSigner, EcsdaSignerArgs},
        Signer,
    };

    use super::*;

    #[tokio::test]
    async fn test_load_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let signer = EcsdaSigner::new(EcsdaSignerArgs::new(
            "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c9457",
        ));

        let mut document = Document::new(payload).unwrap();
        document.add_signature(signer.sign(payload).unwrap());
    }
}
