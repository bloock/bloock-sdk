use crate::{
    error::{BloockResult, InfrastructureError},
    integrity::entity::proof::Proof,
};
use bloock_encrypter::{
    entity::{alg::EncryptionAlg, encryption_key::EncryptionKey},
    EncrypterError,
};
use bloock_hasher::HashAlg;
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

    pub async fn sign(
        &mut self,
        key: &Key,
        hash_alg: Option<HashAlg>,
        access_control: Option<String>,
    ) -> BloockResult<Signature> {
        let signature = self
            .parser
            .sign(
                key,
                hash_alg,
                access_control,
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;

        Ok(signature)
    }

    pub async fn verify(&self) -> BloockResult<bool> {
        let ok = self
            .parser
            .verify(self.api_host.clone(), self.api_key.clone())
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;
        Ok(ok)
    }

    pub async fn encrypt(&mut self, key: &Key, access_control: Option<String>) -> BloockResult<()> {
        self.parser
            .encrypt(
                key,
                access_control,
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;

        Ok(())
    }

    pub async fn decrypt(&mut self, key: &Key, access_control: Option<String>) -> BloockResult<()> {
        self.parser
            .decrypt(
                key,
                access_control,
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map_err(|e| InfrastructureError::MetadataError(e))?;

        Ok(())
    }

    pub fn set_proof(&mut self, proof: Proof) -> BloockResult<()> {
        self.parser
            .set_proof(&proof)
            .map_err(|e| InfrastructureError::MetadataError(e))?;
        Ok(())
    }

    pub fn get_content_type(&self) -> Option<String> {
        self.parser.get_type()
    }

    pub fn is_encrypted(&self) -> bool {
        self.parser.is_encrypted()
    }

    pub fn get_payload(&self) -> BloockResult<Vec<u8>> {
        self.parser
            .get_payload()
            .map_err(|e| InfrastructureError::MetadataError(e).into())
    }

    pub fn get_proof(&self) -> Option<Proof> {
        let proof: Option<Proof> = self.parser.get_proof();
        proof
    }

    pub fn get_signatures(&self) -> Option<Vec<Signature>> {
        self.parser.get_signatures().ok()
    }

    pub fn get_encryption_alg(&self) -> BloockResult<EncryptionAlg> {
        match self.parser.get_encryption_alg() {
            Some(alg) => Ok(alg),
            None => Err(InfrastructureError::EncrypterError(
                EncrypterError::CouldNotRetrieveAlgorithm(),
            )
            .into()),
        }
    }

    pub fn get_encryption_key(&self) -> BloockResult<EncryptionKey> {
        match self.parser.get_encryption_key() {
            Some(key) => Ok(key),
            None => Err(
                InfrastructureError::EncrypterError(EncrypterError::CouldNotRetrieveKey()).into(),
            ),
        }
    }

    pub fn build(&self) -> BloockResult<Vec<u8>> {
        let result = self
            .parser
            .build()
            .map_err(InfrastructureError::MetadataError)?;
        Ok(result)
    }
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
    use bloock_keys::certificates::{
        local::{LocalCertificate, LocalCertificateParams},
        managed::{ManagedCertificate, ManagedCertificateParams},
        CertificateSubject,
    };
    use bloock_keys::{
        keys::local::{LocalKey, LocalKeyParams},
        KeyType,
    };
    use std::{thread::sleep, time::Duration};

    #[tokio::test]
    async fn test_get_content_type_signed() {
        let payload = include_bytes!("./assets/dummy-image.jpeg");
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
            expiration: 1,
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
        document
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Certificate(
                    local_certificate,
                )),
                None,
                None,
            )
            .await
            .unwrap();

        assert_ne!(payload.to_vec(), document.build().unwrap());

        let content_type = document.get_content_type();
        assert_eq!(content_type, Some("image/jpeg".to_string()))
    }

    #[tokio::test]
    async fn test_signed_and_verify_pdf_with_local_certificate_rsa_2048() {
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
            expiration: 1,
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
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Certificate(
                    local_certificate,
                )),
                None,
                None,
            )
            .await
            .unwrap();
        let built_doc = document.build().unwrap();

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
    async fn test_signed_and_verify_pdf_with_local_certificate_rsa_3072() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let certificate_params = LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa3072,
            subject: CertificateSubject {
                common_name: "Google internet Authority G2".to_string(),
                organization: Some("Google Inc".to_string()),
                organizational_unit: Some("IT Department".to_string()),
                country: Some("US".to_string()),
                state: None,
                location: None,
            },
            expiration: 1,
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
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Certificate(
                    local_certificate,
                )),
                None,
                None,
            )
            .await
            .unwrap();
        let built_doc = document.build().unwrap();

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
    async fn test_signed_and_verify_pdf_with_local_key_rsa_2048() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let key_params = LocalKeyParams {
            key_type: KeyType::Rsa2048,
        };
        let key = LocalKey::new(&key_params).unwrap();

        let config_service = config::configure_test();

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let signature: Signature = document
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Key(key)),
                None,
                None,
            )
            .await
            .unwrap();
        let built_doc = document.build().unwrap();

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
    async fn test_signed_and_verify_pdf_with_managed_certificate() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key =
            "test_u4NFCv4ht7ho3fWPWem-UYC3qLHU2HXT5MEQkAV66BSOrKMprZRdIS1bshVZ8QvP".to_string();

        let payload = include_bytes!("./assets/dummy.pdf");
        let certificate_params = ManagedCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "Google internet Authority G2".to_string(),
                organization: Some("Google Inc".to_string()),
                organizational_unit: Some("IT Department".to_string()),
                country: Some("US".to_string()),
                location: None,
                state: None,
            },
            expiration: 5,
        };
        let managed_certificate =
            ManagedCertificate::new(&certificate_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();
        sleep(Duration::from_secs(10));

        let mut document = Document::new(payload, api_host.clone(), api_key.clone()).unwrap();
        let _signature = document
            .sign(
                &Key::Managed(bloock_keys::entity::key::Managed::Certificate(
                    managed_certificate,
                )),
                None,
                None,
            )
            .await
            .unwrap();
        let built_doc = document.build().unwrap();

        let signed_doc: Document =
            Document::new(&built_doc, api_host.clone(), api_key.clone()).unwrap();
        // assert_eq!(signed_doc.get_signatures().unwrap(), vec![signature]);

        let result = signed_doc.verify().await.unwrap();
        assert!(result)
    }

    #[tokio::test]
    async fn test_double_signed_and_verify_pdf() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let certificate_params = LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "Google internet Authority G2".to_string(),
                organization: Some("Google Inc".to_string()),
                organizational_unit: Some("IT Department".to_string()),
                country: Some("US".to_string()),
                location: None,
                state: None,
            },
            expiration: 1,
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
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Certificate(
                    local_certificate,
                )),
                None,
                None,
            )
            .await
            .unwrap();

        let certificate_params2 = LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "Google internet Authority G2".to_string(),
                organization: Some("Google Inc".to_string()),
                organizational_unit: Some("IT Department".to_string()),
                country: Some("US".to_string()),
                location: None,
                state: None,
            },
            expiration: 1,
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
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Certificate(
                    local_certificate2,
                )),
                None,
                None,
            )
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

        let mut document = Document::new(
            payload,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();
        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        document
            .encrypt(&local_key.clone().into(), None)
            .await
            .unwrap();

        let built_doc = document.build().unwrap();
        let mut encrypted_doc = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        encrypted_doc
            .decrypt(&local_key.into(), None)
            .await
            .unwrap();
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
                    root: Some("root".to_string()),
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

        document
            .encrypt(&local_key.clone().into(), None)
            .await
            .unwrap();

        let built_doc = document.build().unwrap();
        let mut encrypted_doc = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        encrypted_doc
            .decrypt(&local_key.into(), None)
            .await
            .unwrap();
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

    #[tokio::test]
    async fn test_encrypted_pdf_with_proof_and_signatures() {
        let payload = include_bytes!("./assets/dummy.pdf");
        let config_service = config::configure_test();

        let local_key_params = LocalKeyParams {
            key_type: KeyType::Aes128,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
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
            expiration: 1,
            password: "password".to_string(),
        };
        let local_certificate = LocalCertificate::new(&certificate_params).unwrap();

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
                    root: Some("root".to_string()),
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

        let signature = document
            .sign(
                &Key::Local(bloock_keys::entity::key::Local::Certificate(
                    local_certificate,
                )),
                None,
                None,
            )
            .await
            .unwrap();

        let expected_payload = document.build().unwrap();

        let original_record = Record::new(document.clone()).unwrap();

        document
            .encrypt(&local_key.clone().into(), None)
            .await
            .unwrap();

        let built_doc = document.build().unwrap();
        let mut encrypted_doc = Document::new(
            &built_doc,
            config_service.get_api_base_url(),
            config_service.get_api_key(),
        )
        .unwrap();

        encrypted_doc
            .decrypt(&local_key.into(), None)
            .await
            .unwrap();

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
        assert_eq!(decrypted_record.get_signatures().unwrap(), vec![signature]);
        assert_eq!(decrypted_record.get_proof().unwrap(), proof);
    }
}
