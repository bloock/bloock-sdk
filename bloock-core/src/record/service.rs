use super::builder::Builder;
use super::entity::record::Record;
use super::RecordError;
use crate::config::service::ConfigService;
use crate::error::BloockResult;
use serde_json::Value;

pub struct RecordService {
    pub config_service: ConfigService,
}

impl RecordService {
    pub fn from_record(&self, record: Record) -> BloockResult<Builder> {
        match record.document {
            Some(d) => Ok(Builder::from_document(d)),
            None => Err(RecordError::DocumentNotFound.into()),
        }
    }
    pub fn from_string<S: ToString>(&self, s: S) -> BloockResult<Builder> {
        let string = s.to_string();
        let payload = string.as_bytes();
        Builder::new(
            payload.to_vec(),
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
        )
    }
    pub fn from_hex(&self, hex: String) -> BloockResult<Builder> {
        let payload = hex::decode(hex).map_err(|_| RecordError::InvalidHex)?;
        Builder::new(
            payload.to_vec(),
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
        )
    }
    pub fn from_json(&self, json: String) -> BloockResult<Builder> {
        let payload: Value = serde_json::from_str(&json).map_err(|_| RecordError::InvalidJson)?;
        let bytes = serde_json::to_vec(&payload).map_err(|_| RecordError::InvalidJson)?;

        Builder::new(
            bytes,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
        )
    }
    pub fn from_file(&self, file_bytes: Vec<u8>) -> BloockResult<Builder> {
        Builder::new(
            file_bytes,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
        )
    }
    pub fn from_bytes(&self, bytes: Vec<u8>) -> BloockResult<Builder> {
        Builder::new(
            bytes,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
        )
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        config,
        integrity::entity::{
            anchor::AnchorNetwork,
            proof::{Proof, ProofAnchor},
        },
        record::{self, document::Document},
    };

    use bloock_encrypter::local::aes::{LocalAesDecrypter, LocalAesEncrypter};
    use bloock_keys::keys::local::LocalKey;
    use bloock_keys::{entity::key::Key::LocalKey as LocalKeyEntity, keys::local::LocalKeyParams};
    use bloock_signer::entity::alg::SignAlg;

    #[tokio::test]
    async fn test_from_record() {
        let service = record::configure_test(config::configure_test().config_data);

        let payload = "Hello world".to_string();
        let r = service.from_string(payload).unwrap().build().await.unwrap();
        let r2 = service
            .from_record(r.clone())
            .unwrap()
            .build()
            .await
            .unwrap();

        assert_eq!(
            r.document.clone().unwrap().build(),
            r2.document.clone().unwrap().build(),
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

    #[tokio::test]
    async fn test_from_string() {
        let service = record::configure_test(config::configure_test().config_data);

        let payload = "Hello world".to_string();
        let r = service
            .from_string(payload.clone())
            .unwrap()
            .build()
            .await
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            payload.as_bytes(),
            document.build().unwrap(),
            "Unexpected payload received"
        );
    }

    #[tokio::test]
    async fn test_from_hex() {
        let service = record::configure_test(config::configure_test().config_data);

        let payload = "1234567890abcdef".to_string();
        let r = service
            .from_hex(payload.clone())
            .unwrap()
            .build()
            .await
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            hex::decode(payload).unwrap(),
            document.build().unwrap(),
            "Unexpected payload received"
        );
    }

    #[tokio::test]
    async fn test_from_json() {
        let service = record::configure_test(config::configure_test().config_data);

        let payload = "{\"hello\":\"world\"}".to_string();
        let r = service
            .from_json(payload.clone())
            .unwrap()
            .build()
            .await
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            payload.as_bytes(),
            document.build().unwrap(),
            "Unexpected payload received"
        );
    }

    #[tokio::test]
    async fn test_from_file() {
        let service = record::configure_test(config::configure_test().config_data);

        let payload = vec![1, 2, 3, 4, 5];
        let r = service
            .from_file(payload.clone())
            .unwrap()
            .build()
            .await
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            payload,
            document.build().unwrap(),
            "Unexpected payload received"
        );
    }

    #[tokio::test]
    async fn test_from_bytes() {
        let service = record::configure_test(config::configure_test().config_data);

        let payload = vec![1, 2, 3, 4, 5];
        let r = service
            .from_bytes(payload.clone())
            .unwrap()
            .build()
            .await
            .unwrap();

        let document = r.document.unwrap();

        assert_eq!(
            payload,
            document.build().unwrap(),
            "Unexpected payload received"
        );
    }

    #[tokio::test]
    async fn test_build_record_from_string_no_signature_nor_encryption() {
        let service = record::configure_test(config::configure_test().config_data);

        let content = "hello world!";
        let response = service
            .from_string(content.to_string())
            .unwrap()
            .build()
            .await
            .unwrap();

        let result_payload = String::from_utf8(response.serialize().unwrap()).unwrap();
        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };
        let content = "hello world!";

        let record = service
            .from_string(content.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let document = Document::new(
            &record.clone().serialize().unwrap(),
            service.config_service.get_api_base_url(),
            service.config_service.get_api_key(),
            service.config_service.get_environment(),
        )
        .unwrap();

        let result_signature = document.get_signatures().unwrap();
        let result_algorithm = result_signature[0].clone().alg;
        let result_public_key = result_signature[0].clone().kid;
        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();
        let result_proof = document.get_proof();

        assert_eq!(1, result_signature.len());
        assert_eq!(SignAlg::Es256k, result_algorithm);
        assert_eq!(
            "04d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff888ceff77fc0d48a6f1bcaab3a0833b880ffda5981c35ce09f1c8f60b8528bb22",
            result_public_key
        );
        assert_ne!(content, result_payload);
        assert_eq!(None, result_proof);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_ens_signature() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };
        let content = "hello world!";

        let record = service
            .from_string(content.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let document = Document::new(
            &record.clone().serialize().unwrap(),
            service.config_service.get_api_base_url(),
            service.config_service.get_api_key(),
            service.config_service.get_environment(),
        )
        .unwrap();

        let result_signature = document.get_signatures().unwrap();
        let result_algorithm = result_signature[0].clone().alg;
        let result_public_key = result_signature[0].clone().kid;
        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();
        let result_proof = document.get_proof();

        assert_eq!(1, result_signature.len());
        assert_eq!(SignAlg::Es256k, result_algorithm);
        assert_eq!(
            "04d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff888ceff77fc0d48a6f1bcaab3a0833b880ffda5981c35ce09f1c8f60b8528bb22",
            result_public_key
        );
        assert_ne!(content, result_payload);
        assert_eq!(None, result_proof);
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature_and_encryption() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_aes_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes128,
            key: "some_password".to_string(),
            private_key: None,
            mnemonic: None,
        };

        let content = "hello world!";

        let record = service
            .from_string(content.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(local_aes_key.clone()))
            .build()
            .await
            .unwrap();

        assert_ne!(content.as_bytes(), record.clone().serialize().unwrap());

        let unencrypted_record = service
            .from_record(record.clone())
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(local_aes_key))
            .build()
            .await
            .unwrap();

        let result_signature = unencrypted_record.get_signatures().unwrap();
        assert_eq!(1, result_signature.len());
        assert_ne!(
            record.serialize().unwrap(),
            unencrypted_record.serialize().unwrap()
        );
    }

    #[tokio::test]
    async fn test_build_record_from_pdf_set_encryption() {
        let service = record::configure_test(config::configure_test().config_data);

        let params = LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&params).unwrap();

        let local_aes_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes128,
            key: "some_password".to_string(),
            private_key: None,
            mnemonic: None,
        };
        let payload = include_bytes!("./document/assets/dummy.pdf");

        let default_record = service
            .from_file(payload.to_vec())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key.clone()))
            .build()
            .await
            .unwrap();
        let expected_signatures = default_record.get_signatures();

        let encrypted_record = service
            .from_file(payload.to_vec())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(local_aes_key.clone()))
            .build()
            .await
            .unwrap();

        assert_eq!(default_record.get_hash(), encrypted_record.get_hash());

        let unencrypted_record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(local_aes_key))
            .build()
            .await
            .unwrap();

        assert_eq!(unencrypted_record.get_signatures(), expected_signatures);
        assert_eq!(default_record.get_hash(), unencrypted_record.get_hash());
    }

    #[tokio::test]
    async fn test_build_record_with_encryption_and_decryption() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_aes_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes128,
            key: "some_password".to_string(),
            private_key: None,
            mnemonic: None,
        };

        let content = "hello world!";

        let encrypted_record = service
            .from_string(content.to_string())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(local_aes_key.clone()))
            .build()
            .await
            .unwrap();

        assert_ne!(
            content.as_bytes(),
            encrypted_record.clone().serialize().unwrap()
        );

        let record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(local_aes_key))
            .build()
            .await
            .unwrap();

        assert_eq!(content.as_bytes(), record.serialize().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_set_signature_encryption_and_decryption() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };
        let local_aes_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes128,
            key: "some_password".to_string(),
            private_key: None,
            mnemonic: None,
        };
        let content = "hello world!";

        let record = service
            .from_string(content.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(local_aes_key.clone()))
            .build()
            .await
            .unwrap();

        let decrypted_record = service
            .from_record(record.clone())
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(local_aes_key))
            .build()
            .await
            .unwrap();

        assert_ne!(
            record.serialize().unwrap(),
            decrypted_record.serialize().unwrap()
        );
    }

    #[tokio::test]
    async fn test_build_record_set_proof_encryption_and_decryption() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_aes_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes128,
            key: "some_password".to_string(),
            private_key: None,
            mnemonic: None,
        };

        let content = "hello world!";

        let mut record = service
            .from_string(content.to_string())
            .unwrap()
            .build()
            .await
            .unwrap();

        record
            .set_proof(Proof {
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
                leaves: vec![bloock_hasher::from_hex(
                    "57caa176af1ac0433c5df30e8dabcd2ec1af1e92a26eced5f719b88458777cd6",
                )
                .unwrap()],
                nodes: vec![[0u8; 32]],
            })
            .unwrap();

        let encrypted_record = service
            .from_record(record.clone())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(local_aes_key.clone()))
            .build()
            .await
            .unwrap();

        assert_eq!(encrypted_record.get_proof(), None);
        assert_ne!(
            encrypted_record.clone().serialize().unwrap(),
            record.clone().serialize().unwrap()
        );

        let decrypted_record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(local_aes_key))
            .build()
            .await
            .unwrap();

        assert_eq!(
            record.serialize().unwrap(),
            decrypted_record.serialize().unwrap()
        );
    }

    #[tokio::test]
    async fn test_build_record_from_hex() {
        let service = record::configure_test(config::configure_test().config_data);

        let content = "776463776463776377637765";
        service
            .from_hex(content.to_string())
            .unwrap()
            .build()
            .await
            .unwrap();
    }

    #[tokio::test]
    async fn test_build_record_from_json() {
        let service = record::configure_test(config::configure_test().config_data);

        let content = "{\"hello\":\"world\"}";
        service
            .from_json(content.to_string())
            .unwrap()
            .build()
            .await
            .unwrap();
    }

    #[tokio::test]
    async fn test_build_record_from_file() {
        let service = record::configure_test(config::configure_test().config_data);

        let content = "hello world!";
        let record = service
            .from_file(content.as_bytes().to_vec())
            .unwrap()
            .build()
            .await
            .unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_bytes() {
        let service = record::configure_test(config::configure_test().config_data);

        let content = "hello world!";
        let record = service
            .from_bytes(content.as_bytes().to_vec())
            .unwrap()
            .build()
            .await
            .unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_record() {
        let service = record::configure_test(config::configure_test().config_data);

        let content = "hello world!";
        let record = service
            .from_string(content.to_string())
            .unwrap()
            .build()
            .await
            .unwrap();

        let record = service.from_record(record).unwrap().build().await.unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }
}

#[cfg(test)]
mod hash_tests {
    use crate::{
        config,
        integrity::entity::{
            anchor::AnchorNetwork,
            proof::{Proof, ProofAnchor},
        },
        record,
    };

    use bloock_encrypter::local::aes::{LocalAesDecrypter, LocalAesEncrypter};
    use bloock_hasher::{keccak::Keccak256, Hasher};
    use bloock_keys::entity::key::Key::LocalKey as LocalKeyEntity;
    use bloock_keys::keys::local::LocalKey;

    const PAYLOAD: &str = "hello world";
    const HASH_PAYLOAD: &str = "47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
    const HASH_SIGNED_PAYLOAD: &str =
        "68acebf86e3b28759b992ca014400be20c142034947a0bd19d1070ac195277c8";
    const HASH_DOUBLY_SIGNED_PAYLOAD: &str =
        "ee567d744907df44353f3a39c478b80f4f499a3de87cad9356dce9cf0d078426";

    const LOCAL_AES_KEY: LocalKey<&str> = LocalKey {
        key_type: bloock_keys::KeyType::Aes256,
        key: "some_password",
        private_key: None,
        mnemonic: None,
    };

    fn get_test_proof(hash: &str) -> Proof {
        Proof {
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
            leaves: vec![bloock_hasher::from_hex(hash).unwrap()],
            nodes: vec![[0u8; 32]],
        }
    }

    #[tokio::test]
    async fn build_plain_record() {
        let service = record::configure_test(config::configure_test().config_data);

        let record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        assert_eq!(record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_plain_record_with_encrypter() {
        let service = record::configure_test(config::configure_test().config_data);

        let record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());
        assert_ne!(
            String::from_utf8(record.clone().serialize().unwrap()).unwrap(),
            PAYLOAD
        );

        assert_eq!(record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_plain_record_with_signer() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let expected_hash = hex::encode(Keccak256::generate_hash(&[record
            .clone()
            .serialize()
            .unwrap()
            .as_slice()]));

        assert_eq!(expected_hash, HASH_SIGNED_PAYLOAD);

        assert_eq!(record.get_hash(), expected_hash);
    }

    #[tokio::test]
    async fn build_plain_record_with_signer_and_encrypter() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());
        assert_eq!(record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrypted_record() {
        let service = record::configure_test(config::configure_test().config_data);

        let encrypted_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(!record.is_encrypted());

        let result_payload = String::from_utf8(record.clone().serialize().unwrap()).unwrap();

        assert_eq!(PAYLOAD, result_payload);

        assert_eq!(record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrypted_record_decrypt_and_encrypt() {
        let service = record::configure_test(config::configure_test().config_data);

        let encrypted_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let final_record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        let result_payload = String::from_utf8(final_record.clone().serialize().unwrap()).unwrap();

        assert_ne!(PAYLOAD, result_payload);

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrypted_record_decrypt_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let encrypted_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let final_record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        assert!(!final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrypted_record_decrypt_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let encrypted_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let final_record = service
            .from_record(encrypted_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_record() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let signed_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let final_record = service
            .from_record(signed_record)
            .unwrap()
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_record_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let signed_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let final_record = service
            .from_record(signed_record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_record_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let signed_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let final_record = service
            .from_record(signed_record)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key_2))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_record_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let signed_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        let final_record = service
            .from_record(signed_record)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key_2))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_and_encrypted_record() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_and_encrypted_record_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record.clone())
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_and_encrypted_record_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let signed_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        let final_record = service
            .from_record(signed_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key_2))
            .build()
            .await
            .unwrap();

        assert!(!final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_signed_and_encrypted_record_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let signed_record = service
            .from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        let final_record = service
            .from_record(signed_record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key_2))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof() {
        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        let final_record = service.from_record(record).unwrap().build().await.unwrap();

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_encrypt() {
        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        assert!(final_record.get_proof().is_none());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.get_proof().is_none());
        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrpted_record_with_proof() {
        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrpted_record_with_proof_and_encrypt() {
        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrpted_record_with_proof_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_encrpted_record_with_proof_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service.from_string(PAYLOAD).unwrap().build().await.unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = service.from_record(record).unwrap().build().await.unwrap();

        assert!(final_record.get_proof().is_some());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key_2))
            .build()
            .await
            .unwrap();

        assert!(final_record.get_proof().is_none());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key_2))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_is_encrypted() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_is_encrypted_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_is_encrypted_and_sign() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key_2))
            .build()
            .await
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[tokio::test]
    async fn build_from_record_with_proof_and_signature_and_is_encrypted_and_sign_and_encrypt() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let local_key_2: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let mut record = service
            .from_string(PAYLOAD)
            .unwrap()
            .with_signer(LocalKeyEntity(local_key))
            .build()
            .await
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = service
            .from_record(record)
            .unwrap()
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = service
            .from_record(record)
            .unwrap()
            .with_decrypter(LocalAesDecrypter::new(LOCAL_AES_KEY))
            .with_signer(LocalKeyEntity(local_key_2))
            .with_encrypter(LocalAesEncrypter::new(LOCAL_AES_KEY))
            .build()
            .await
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }
}
