use crate::{
    error::{BloockError, BloockResult, InfrastructureError, OperationalError},
    integrity::{entity::proof::Proof, IntegrityError},
    record::{document::Document, RecordError},
};
use bloock_encrypter::{entity::alg::EncryptionAlg, Decrypter, Encrypter};
use bloock_hasher::{from_hex, keccak::Keccak256, Hasher, H256};
use bloock_keys::entity::key::Key;
use bloock_signer::entity::signature::Signature;
use std::cmp::Ordering;

#[derive(Debug, Clone, Eq)]
pub struct Record {
    pub(crate) document: Option<Document>,
    hash: H256,
}

impl Record {
    pub fn new(document: Document) -> BloockResult<Self> {
        if document.is_encrypted() {
            return Err(OperationalError::CannotCreateRecordFromEncryptedDocument().into());
        }

        let hash = match document.get_proof() {
            Some(proof) => proof.get_hash()?,
            None => Keccak256::generate_hash(&[document.build()?.as_slice()]),
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

    pub async fn sign(&mut self, key: &Key) -> BloockResult<Signature> {
        let doc = match &mut self.document {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        let signature = doc.sign(key).await?;
        Ok(signature)
    }

    pub async fn verify(&self) -> BloockResult<bool> {
        let doc = match self.document.clone() {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        let signature = doc.verify().await?;
        Ok(signature)
    }

    pub async fn encrypt(&mut self, encrypter: Box<dyn Encrypter>) -> BloockResult<()> {
        let doc = match &mut self.document {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        doc.encrypt(encrypter).await?;
        Ok(())
    }

    pub async fn decrypt(&mut self, decrypter: Box<dyn Decrypter>) -> BloockResult<()> {
        let doc = match &mut self.document {
            Some(doc) => doc,
            None => return Err(RecordError::DocumentNotFound.into()),
        };

        doc.decrypt(decrypter).await?;
        Ok(())
    }

    pub fn get_hash(&self) -> String {
        hex::encode(self.hash)
    }

    pub fn get_hash_bytes(&self) -> H256 {
        self.hash
    }

    /*pub fn get_payload(&self) -> Option<&Vec<u8>> {
        match &self.document {
            Some(d) => Some(&d.payload),
            None => None,
        }
    }*/

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
            Some(d) => d.build(),
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
    use bloock_keys::keys::local::LocalKey;

    use super::*;
    use crate::{config, integrity::entity::proof::ProofAnchor};

    #[test]
    fn new_record() {
        let config_service = config::configure_test();
        let document = Document::new(
            "Some String".as_bytes(),
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let record = Record::new(document).unwrap();

        assert_eq!(
            String::from("b585bd5a04d10f064ba44be7fae68c9837bd3be24168bc46bdf041fc2762154b"),
            record.get_hash(),
            "Wrong record hash received"
        );
    }

    #[test]
    fn new_record_from_document_with_proof() {
        let config_service = config::configure_test();
        let mut document = Document::new(
            "Some String".as_bytes(),
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

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

    #[tokio::test]
    async fn new_record_from_document_with_signature() {
        let config_service = config::configure_test();
        let mut document = Document::new(
            "Some String".as_bytes(),
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        let record_no_signature = Record::new(document.clone()).unwrap();

        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let signature = document
            .sign(&bloock_keys::entity::key::Key::LocalKey(local_key))
            .await
            .unwrap();

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
            "b33acf7862a66ac2b0b52eb8c5e590b3e2dc792577b88b7f77920a2d9c038871",
            record_with_signature.get_hash(),
            "Wrong record hash received"
        );

        assert_eq!(
            vec![signature],
            record_with_signature.get_signatures().unwrap()
        )
    }
}
