use crate::{
    error::{BloockResult, InfrastructureError},
    integrity::entity::proof::Proof,
};
use bloock_encrypter::{entity::alg::EncryptionAlg, Decrypter, Encrypter, EncrypterError};
use bloock_keys::entity::key::Key;
use bloock_metadata::{FileParser, MetadataParser};
use bloock_signer::entity::signature::Signature;

#[derive(Clone, Debug)]
pub struct Document {
    parser: FileParser,
    api_host: String,
    api_key: String,
}

impl Document {
    pub fn new(payload: &[u8], api_host: String, api_key: String) -> BloockResult<Self> {
        let parser = FileParser::load(payload).map_err(InfrastructureError::MetadataError)?;

        Ok(Document {
            parser,
            api_host,
            api_key,
        })
    }

    pub async fn sign(&mut self, key: &Key) -> BloockResult<Signature> {
        if self.is_encrypted() {
            return Err(InfrastructureError::EncrypterError(EncrypterError::Encrypted()).into());
        }

        let signature = self
            .parser
            .sign(key, self.api_host.clone(), self.api_key.clone())
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;

        Ok(signature)
    }

    pub async fn verify(&self) -> BloockResult<bool> {
        if self.is_encrypted() {
            return Err(InfrastructureError::EncrypterError(EncrypterError::Encrypted()).into());
        }

        let ok = self
            .parser
            .verify(self.api_host.clone(), self.api_key.clone())
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;
        Ok(ok)
    }

    pub async fn encrypt(&mut self, encrypter: Box<dyn Encrypter>) -> BloockResult<()> {
        self.parser
            .encrypt(encrypter)
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;

        Ok(())
    }

    pub async fn decrypt(&mut self, decrypter: Box<dyn Decrypter>) -> BloockResult<()> {
        self.parser
            .decrypt(decrypter)
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;

        Ok(())
    }

    pub fn set_proof(&mut self, proof: Proof) -> BloockResult<()> {
        if self.is_encrypted() {
            return Err(InfrastructureError::EncrypterError(EncrypterError::Encrypted()).into());
        }

        self.parser
            .set_proof(&proof)
            .map_err(|e| InfrastructureError::MetadataError(e))?;
        Ok(())
    }

    pub fn is_encrypted(&self) -> bool {
        self.parser.is_encrypted()
    }

    pub fn get_proof(&self) -> Option<Proof> {
        let proof: Option<Proof> = self.parser.get_proof();
        proof
    }

    pub fn get_signatures(&self) -> Option<Vec<Signature>> {
        self.parser.get_signatures().ok()
    }

    pub fn get_encryption_alg(&self) -> BloockResult<EncryptionAlg> {
        match self.parser.get_encryption_algorithm() {
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

    pub fn build(&self) -> BloockResult<Vec<u8>> {
        let result = self
            .parser
            .build()
            .map_err(InfrastructureError::MetadataError)?;
        Ok(result)
    }

    /*pub fn add_signature(&mut self, signature: Signature, key: Key) -> BloockResult<&mut Self> {
        if self.is_encrypted {
            return Err(InfrastructureError::EncrypterError(EncrypterError::Encrypted()).into());
        }

        let signatures = match self.signatures.clone() {
            Some(mut s) => {
                s.push((signature, key));
                s
            }
            None => vec![signature, key],
        };

        self.signatures = Some(signatures);

        if self.proof.is_some() {
            self.proof = None;
        }

        Ok(self)
    }*/

    /*pub fn set_encryption(&mut self, ciphertext: Vec<u8>, alg: &str) -> BloockResult<&mut Self> {
        self.update_parser(ciphertext)?;
        self.update_payload()?;

        self.is_encrypted = true;

        self.set_encryption_alg(alg)?;

        Ok(self)
    }

    fn set_encryption_alg(&mut self, alg: &str) -> BloockResult<()> {
        self.parser
            .set("encryption_alg", &alg)
            .map_err(|err| InfrastructureError::MetadataError(err).into())
    }*/

    /*pub fn remove_encryption(mut self, decrypted_payload: Vec<u8>) -> BloockResult<Self> {
        self.update_parser(decrypted_payload)?;
        self.update_payload()?;

        self.is_encrypted = false;
        self.proof = self.parser.get("proof");
        self.signatures = self.parser.get_signatures();

        Ok(self)
    }*/

    /*pub fn get_signatures(&self) -> Option<(Vec<Signature>, Key)> {
        self.signatures.clone()
    }*/

    /*pub fn get_payload(&self) -> Vec<u8> {
        self.payload.clone()
    }*/

    /*fn update_parser(&mut self, payload: Vec<u8>) -> BloockResult<()> {
        self.parser = FileParser::load(&payload).map_err(InfrastructureError::MetadataError)?;
        Ok(())
    }

    fn update_payload(&mut self) -> BloockResult<()> {
        self.payload = self
            .parser
            .get_data()
            .map_err(InfrastructureError::MetadataError)?;
        Ok(())
    }*/
}

impl PartialEq for Document {
    fn eq(&self, other: &Self) -> bool {
        self.build() == other.build()
    }
}

impl Eq for Document {}

#[cfg(test)]
mod tests {

    use super::*;
    use crate::{
        config,
        integrity::entity::{anchor::AnchorNetwork, proof::ProofAnchor},
        record::entity::record::Record,
    };
    use bloock_encrypter::{
        local::aes::{LocalAesDecrypter, LocalAesEncrypter},
        Decrypter, Encrypter,
    };
    use bloock_hasher::{keccak::Keccak256, Hasher};
    use bloock_keys::{
        certificates::{
            local::{LocalCertificate, LocalCertificateParams},
            CertificateSubject,
        },
        entity::key::Key::LocalCertificate as LocalCertificateEntity,
    };
    use bloock_keys::{
        keys::local::{LocalKey, LocalKeyParams},
        KeyType,
    };
    use bloock_signer::{ecdsa::EcdsaSigner, Signer};
    use std::{env, fs};

    #[tokio::test]
    async fn test_signed_and_verify_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let certificate_params = LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "Google internet Authority G2".to_string(),
                organization: Some("Google Inc".to_string()),
                organizational_unit: Some("IT Department".to_string()),
                country: Some("US".to_string()),
                state: None,
                location: None,
            },
            password: "password".to_string(),
        };
        let local_certificate = LocalCertificate::new(&certificate_params).unwrap();
        let config_service = config::configure_test();

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let signature = document
            .sign(&LocalCertificateEntity(local_certificate))
            .await
            .unwrap();
        let built_doc = document.build().unwrap();
        fs::write(
            "./src/record/document/assets/dummy_out.pdf",
            built_doc.clone(),
        )
        .unwrap();
        let signed_doc: Document = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        assert_eq!(signed_doc.get_signatures().unwrap(), vec![signature]);

        let result = signed_doc.verify().await.unwrap();
        assert!(result)
    }

    #[tokio::test]
    async fn test_double_signed_and_verify_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let certificate_params = LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "bloock".to_string(),
                organizational_unit: None,
                organization: None,
                location: None,
                state: None,
                country: None,
            },
            password: "password".to_string(),
        };
        let local_certificate = LocalCertificate::new(&certificate_params).unwrap();
        let config_service = config::configure_test();

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let signature = document
            .sign(&LocalCertificateEntity(local_certificate))
            .await
            .unwrap();

        let certificate_params2 = LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "bloock2".to_string(),
                organizational_unit: None,
                organization: None,
                location: None,
                state: None,
                country: None,
            },
            password: "password".to_string(),
        };
        let local_certificate2 = LocalCertificate::new(&certificate_params2).unwrap();
        let built_doc_first_sinature = document.build().unwrap();

        let mut document2 = Document::new(
            &built_doc_first_sinature,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let signature2 = document2
            .sign(&LocalCertificateEntity(local_certificate2))
            .await
            .unwrap();
        let built_doc_second_signature = document2.build().unwrap();
        // fs::write(
        //     "./src/record/document/assets/dummy_out2.pdf",
        //     built_doc_second_signature.clone(),
        // )
        // .unwrap();
        let signed_doc: Document = Document::new(
            &built_doc_second_signature,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        assert_eq!(
            signed_doc.get_signatures().unwrap(),
            vec![signature, signature2]
        );

        let result = signed_doc.verify().await.unwrap();
        assert!(result)
    }

    #[tokio::test]
    async fn test_encrypted_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let config_service = config::configure_test();
        let local_key_params = LocalKeyParams {
            key_type: KeyType::Aes128,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
        let encrypter = LocalAesEncrypter::new(local_key.clone());

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        document.encrypt(encrypter).await.unwrap();

        let built_doc = document.build().unwrap();
        let mut encrypted_doc = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        let decrypter = LocalAesDecrypter::new(local_key);
        encrypted_doc.decrypt(decrypter).await.unwrap();
        let decrypted_payload = encrypted_doc.build().unwrap();

        assert_eq!(decrypted_payload, expected_payload);

        let decrypted_doc = Document::new(
            &decrypted_payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let decrypted_record = Record::new(decrypted_doc).unwrap();

        assert_eq!(original_record.get_hash(), decrypted_record.get_hash());
    }

    #[tokio::test]
    async fn test_encrypted_pdf_with_proof() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let config_service = config::configure_test();
        let local_key_params = LocalKeyParams {
            key_type: KeyType::Aes128,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
        let encrypter = LocalAesEncrypter::new(local_key.clone());

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

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

        document.encrypt(encrypter).await.unwrap();

        let built_doc = document.build().unwrap();
        let mut encrypted_doc = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        let decrypter = LocalAesDecrypter::new(local_key);
        encrypted_doc.decrypt(decrypter).await.unwrap();
        let decrypted_payload = encrypted_doc.build().unwrap();

        assert_eq!(decrypted_payload, expected_payload);

        let decrypted_doc = Document::new(
            &decrypted_payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let decrypted_record = Record::new(decrypted_doc).unwrap();

        assert_eq!(original_record.get_hash(), decrypted_record.get_hash());
        assert_eq!(decrypted_record.get_proof().unwrap(), proof);
    }

    /*#[tokio::test]
    async fn test_encrypted_pdf_with_proof_and_signatures() {
        let payload = include_bytes!("./assets/dummy.pdf");

        let local_key_params = LocalKeyParams {
            key_type: KeyType::Aes128,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let encrypter = LocalAesEncrypter::new(local_key.clone());

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

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
            alg: bloock_signer::entity::alg::SignAlg::Es256k,
            kid: "02d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff8".to_string(),
            signature: "945efccb10955499e50bd4e1eeadb51aac9136f3e91b8d29c1b817cb42284268500b5f191693a0d927601df5f282804a6eacf5ff8a1522bda5c2ec4dc681750b".to_string(),
            message_hash: hex::encode(Keccak256::generate_hash(&[payload])),
        };

        document.set_proof(proof).unwrap();

        document
            .add_signature(signature.clone(), local_key.clone())
            .unwrap();

        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        let ciphertext = encrypter.encrypt(&document.build().unwrap()).await.unwrap();
        document
            .set_encryption(ciphertext, encrypter.get_alg())
            .unwrap();

        let built_doc = document.build().unwrap();
        let encrypted_doc = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        let decrypter = LocalAesDecrypter::new(local_key);
        let decrypted_payload = decrypter
            .decrypt(&encrypted_doc.get_payload())
            .await
            .unwrap();

        assert_eq!(decrypted_payload, expected_payload);

        let decrypted_doc = Document::new(
            &decrypted_payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let decrypted_record = Record::new(decrypted_doc).unwrap();

        assert_eq!(original_record.get_hash(), decrypted_record.get_hash());
        assert_eq!(decrypted_record.get_signatures(), Some(vec![signature]));
        assert!(decrypted_record.get_proof().is_none());
    }

    #[tokio::test]
    async fn test_signed_pdf_with_local_certificate() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let local_key_params = LocalKeyParams {
            key_type: KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let config_service = config::configure_test();
        let signer = EcdsaSigner::new(
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        );

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let payload_to_sign = document.get_payload_to_sign().unwrap();
        let signature = signer
            .sign_local(&payload_to_sign, &local_key)
            .await
            .unwrap();
        document
            .add_signature(signature.clone(), local_key.clone())
            .unwrap();
        let built_doc = document.build().unwrap();
        let signed_doc: Document = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        assert_eq!(signed_doc.get_signatures(), Some(vec![signature]));
    }*/
}
