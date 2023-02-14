use std::cmp::Ordering;

use bloock_encrypter::{Decrypter, Encrypter, EncrypterError, EncryptionAlg};
use bloock_hasher::{from_hex, keccak::Keccak256, Hasher, H256};
use bloock_signer::{Signature, Signer};

use crate::{
    error::{BloockError, BloockResult, InfrastructureError, OperationalError},
    integrity::{entity::proof::Proof, IntegrityError},
    record::{document::Document, RecordError},
};

#[derive(Debug, Clone, Eq)]
pub struct Record {
    pub(crate) document: Option<Document>,
    hash: H256,
}

impl Record {
    pub fn new(mut document: Document) -> BloockResult<Self> {
        if document.is_encrypted() {
            return Err(OperationalError::CannotCreateRecordFromEncryptedDocument().into());
        }

        let hash = match document.get_proof() {
            Some(proof) => proof.get_hash()?,
            None => Keccak256::generate_hash(&document.build()?),
        };

        Ok(Self {
            document: Some(document),
            hash,
        })
    }

    pub fn new_with_hash(document: Document, hash: &str) -> BloockResult<Self> {
        let hash = bloock_hasher::from_hex(hash).map_err(InfrastructureError::HasherError)?;

        Ok(Self {
            document: Some(document),
            hash,
        })
    }

    pub fn from_hash(hash: H256) -> Self {
        Self {
            document: None,
            hash,
        }
    }

    pub fn encrypt(mut self, encrypter: Box<dyn Encrypter>) -> BloockResult<Self> {
        let mut doc = match self.document {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        let payload = doc.build()?;
        let ciphertext = encrypter
            .encrypt(&payload)
            .map_err(InfrastructureError::EncrypterError)?;

        doc = doc.set_encryption(ciphertext, encrypter.get_alg())?;

        self.document = Some(doc);
        Ok(self)
    }

    pub fn decrypt(mut self, decrypter: Box<dyn Decrypter>) -> BloockResult<Self> {
        let mut doc = match self.document {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        if !doc.is_encrypted() {
            Err(EncrypterError::NotEncrypted()).map_err(InfrastructureError::EncrypterError)?;
        }

        let payload = doc.get_payload();

        let decrypted_payload = decrypter
            .decrypt(&payload)
            .map_err(InfrastructureError::EncrypterError)?;

        doc = doc.remove_encryption(decrypted_payload)?;

        self.document = Some(doc);
        Ok(self)
    }

    pub fn sign(&mut self, signer: Box<dyn Signer>) -> BloockResult<Signature> {
        let doc = match &mut self.document {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        let payload = doc.get_payload();

        let signature = signer
            .sign(&payload)
            .map_err(InfrastructureError::SignerError)?;

        doc.add_signature(signature.clone())?;

        Ok(signature)
    }

    pub fn verify(&mut self) -> BloockResult<bool> {
        let signatures = match self.get_signatures() {
            Some(s) => s,
            None => return Err(IntegrityError::InvalidVerification.into()),
        };

        let payload = match self.get_payload() {
            Some(s) => s,
            None => return Err(IntegrityError::InvalidVerification.into()),
        };

        for signature in signatures {
            let verifier = bloock_signer::create_verifier_from_signature(&signature)
                .map_err(|e| IntegrityError::VerificationError(e.to_string()))?;
            let verification_response = verifier
                .verify(payload, signature.clone())
                .map_err(|e| IntegrityError::VerificationError(e.to_string()))?;
            if !verification_response {
                return Ok(false);
            }
        }

        Ok(true)
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

    pub fn get_signatures(&self) -> Option<Vec<Signature>> {
        match &self.document {
            Some(d) => d.get_signatures(),
            None => None,
        }
    }

    pub fn get_proof(&self) -> Option<Proof> {
        match &self.document {
            Some(d) => d.get_proof(),
            None => None,
        }
    }

    pub fn set_proof(&mut self, proof: Proof) -> BloockResult<()> {
        match self.document.as_mut() {
            Some(d) => {
                if proof.leaves.len() > 1 {
                    return Err(IntegrityError::OnlyOneRecordProof().into());
                }

                if proof.leaves[0] != self.hash {
                    return Err(IntegrityError::ProofFromAnotherRecord().into());
                }
                d.set_proof(proof)
            }
            None => Err(RecordError::DocumentNotFound.into()),
        }
    }

    pub fn serialize(self) -> BloockResult<Vec<u8>> {
        match self.document {
            Some(mut d) => d.build(),
            None => Err(RecordError::DocumentNotFound.into()),
        }
    }

    pub fn is_encrypted(&self) -> bool {
        match &self.document {
            Some(doc) => doc.is_encrypted(),
            None => false,
        }
    }

    pub fn get_encryption_alg(&self) -> BloockResult<EncryptionAlg> {
        match &self.document {
            Some(doc) => doc.get_encryption_alg(),
            None => Err(RecordError::EncryptionError("Record is not encrypted".to_string()).into()),
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

impl TryFrom<&String> for Record {
    type Error = BloockError;
    fn try_from(s: &String) -> BloockResult<Self> {
        Ok(Record::from_hash(
            from_hex(s).map_err(InfrastructureError::HasherError)?,
        ))
    }
}

#[cfg(test)]
mod tests {

    use crate::integrity::entity::proof::ProofAnchor;

    use super::*;
    use bloock_signer::SignatureHeader;

    #[test]
    fn new_record() {
        let document = Document::new("Some String".as_bytes()).unwrap();
        let record = Record::new(document).unwrap();

        assert_eq!(
            String::from("b585bd5a04d10f064ba44be7fae68c9837bd3be24168bc46bdf041fc2762154b"),
            record.get_hash(),
            "Wrong record hash received"
        );
    }

    #[test]
    fn new_record_from_document_with_proof() {
        let mut document = Document::new("Some String".as_bytes()).unwrap();

        let hash = "02aae7e86eb50f61a62083a320475d9d60cbd52749dbf08fa942b1b97f50aee5";

        let proof = Proof {
            leaves: vec![from_hex(hash).unwrap()],
            nodes: vec![],
            depth: "0004000600060005".to_string(),
            bitmap: "bfdf7000".to_string(),
            anchor: ProofAnchor {
                anchor_id: 35554,
                networks: vec![],
                root: "9a09a4e4f831092c64e48ba23faf2f809f12f27e99440ca1e4991dd945391695"
                    .to_string(),
                status: "Success".to_string(),
            },
        };

        document.set_proof(proof).unwrap();

        let record = Record::new(document).unwrap();

        assert_eq!(hash, record.get_hash(), "Wrong record hash received");
    }

    #[test]
    fn new_record_from_document_with_signature() {
        let mut document = Document::new("Some String".as_bytes()).unwrap();

        let record_no_signature = Record::new(document.clone()).unwrap();

        document.signatures = Some(vec![Signature {
            protected: "e30".to_string(),
            header: SignatureHeader {
                alg: "ES256K".to_string(),
                kid: "12c4855e2b4b0ff60b939d943b00043b7fb7b9f3f44ce1c89f8e8402fd3fcb8052".to_string(),
            },
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: hex::encode(Keccak256::generate_hash(&document.get_payload())),
        }]);

        let record_with_signature = Record::new(document).unwrap();

        assert_ne!(
            record_no_signature.get_hash(),
            record_with_signature.get_hash()
        );

        assert_eq!(
            "b585bd5a04d10f064ba44be7fae68c9837bd3be24168bc46bdf041fc2762154b",
            record_no_signature.get_hash(),
            "Wrong record hash received"
        );

        assert_eq!(
            "0aeac2e7a80b7ae3e8d0e22ecda4902eb943d2354579ef2772d9b82ffc42f016",
            record_with_signature.get_hash(),
            "Wrong record hash received"
        );
    }
}
