use crate::{
    error::{BloockResult, InfrastructureError},
    proof::entity::proof::Proof,
};
use bloock_encrypter::EncrypterError;
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
        let mut parser = FileParser::load(payload).map_err(InfrastructureError::MetadataError)?;

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

        println!("NEW DOCUMENT CREATED: {:#?}", doc);

        Ok(doc)
    }

    pub fn add_signature(&mut self, signature: Signature) -> BloockResult<&mut Self> {
        if self.is_encrypted {
            return Err(InfrastructureError::EncrypterError(EncrypterError::NotEncrypted()).into());
        }
        let signatures = match self.signatures.clone() {
            Some(mut s) => {
                s.push(signature);
                s
            }
            None => vec![signature],
        };

        self.signatures = Some(signatures);
        Ok(self)
    }

    pub fn set_encryption(&mut self, ciphertext: Vec<u8>) -> BloockResult<()> {
        self.update_parser(ciphertext)?;
        self.update_payload()?;

        self.signatures = None;
        self.proof = None;
        self.is_encrypted = true;

        Ok(())
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
            return Err(InfrastructureError::EncrypterError(EncrypterError::NotEncrypted()).into());
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

        println!("==> BUILDING FILE");
        println!("==> IS_ENCRYPTED: {:?}", parser.get::<bool>("is_encrypted"));
        println!(
            "==> SIGNATURES: {:?}",
            parser.get::<Vec<Signature>>("signatures")
        );
        println!("==> PROOF: {:?}", parser.get::<Proof>("proof"));

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
        document
            .add_signature(signer.sign(payload).unwrap())
            .unwrap();
    }

    #[tokio::test]
    async fn test_signed_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let signer = EcsdaSigner::new(EcsdaSignerArgs::new(
            "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c9457",
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
        let encrypter = AesEncrypter::new(AesEncrypterArgs::new("some_password"));

        let mut document = Document::new(payload).unwrap();
        let ciphertext = encrypter.encrypt(&document.get_payload(), &[]).unwrap();
        document.set_encryption(ciphertext).unwrap();

        let built_doc = document.build().unwrap();
        let encrypted_doc = Document::new(&built_doc).unwrap();
        // let encrypted_doc = DefaultParser::load(&encrypted_doc.get_payload()).unwrap();
        let decrypter = AesDecrypter::new(AesDecrypterArgs::new("some_password"));
        let decrypted_payload = decrypter
            .decrypt(&encrypted_doc.get_payload(), &[])
            .unwrap();
        assert_eq!(decrypted_payload, payload);
    }
}
