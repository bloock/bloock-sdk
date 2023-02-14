use super::builder::Builder;
use super::entity::record::Record;
use super::RecordError;
use crate::error::BloockResult;
use serde_json::Value;

pub struct RecordService {}

impl RecordService {
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

#[cfg(test)]
mod tests {
    use crate::{
        integrity::entity::{
            anchor::AnchorNetwork,
            proof::{Proof, ProofAnchor},
        },
        record::document::Document,
    };

    use super::*;
    use bloock_encrypter::aes::{AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs};
    use bloock_hasher::{keccak::Keccak256, Hasher};
    use bloock_signer::{
        ecdsa::{EcdsaSigner, EcdsaSignerArgs, ECDSA_ALG},
        ens::{EnsSigner, EnsSignerArgs, ENS_ALG},
        Signature, SignatureHeader,
    };

    #[test]
    fn test_from_record() {
        let payload = "Hello world".to_string();

        let r = RecordService::from_string(payload)
            .unwrap()
            .build()
            .unwrap();
        let r2 = RecordService::from_record(r.clone())
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
        let r = RecordService::from_string(payload.clone())
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
        let r = RecordService::from_hex(payload.clone())
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
        let r = RecordService::from_json(payload.clone())
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
        let r = RecordService::from_file(payload.clone())
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
        let r = RecordService::from_bytes(payload.clone())
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

        let response = RecordService::from_string(content.to_string())
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

        let record = RecordService::from_string(content.to_string())
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
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let content = "hello world!";

        let record = RecordService::from_string(content.to_string())
            .unwrap()
            .with_signer(EnsSigner::new_boxed(EnsSignerArgs::new(private)))
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
    }

    #[tokio::test]
    async fn test_build_record_from_string_set_signature_and_encryption() {
        let private = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
        let password = "some_password";
        let content = "hello world!";

        let record = RecordService::from_string(content.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_ne!(content.as_bytes(), record.clone().serialize().unwrap());

        let unencrypted_record = RecordService::from_record(record)
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
        let payload = include_bytes!("./document/assets/dummy.pdf");

        let default_record = RecordService::from_file(payload.to_vec())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .build()
            .unwrap();

        let encrypted_record = RecordService::from_file(payload.to_vec())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(default_record.get_hash(), encrypted_record.get_hash());

        let unencrypted_record = RecordService::from_record(encrypted_record)
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
                signature: "30d9b2f48b3504c86dbf1072417de52b0f64651582b2002bc180ddb950aa21a23f121bfaaed6a967df08b6a7d2c8e6d54b7203c0a7b84286c85b79564e61141600".to_string(),
                message_hash: hex::encode(Keccak256::generate_hash(unencrypted_record.get_payload().unwrap())),
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

        let encrypted_record = RecordService::from_string(content.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_ne!(
            content.as_bytes(),
            encrypted_record.clone().serialize().unwrap()
        );

        let record = RecordService::from_record(encrypted_record)
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

        let record = RecordService::from_string(content.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(private, None)))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        let record = RecordService::from_record(record)
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

        let mut record = RecordService::from_string(content.to_string())
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
                leaves: vec![bloock_hasher::from_hex(
                    "57caa176af1ac0433c5df30e8dabcd2ec1af1e92a26eced5f719b88458777cd6",
                )
                .unwrap()],
                nodes: vec![[0u8; 32]],
            })
            .unwrap();

        let encrypted_record = RecordService::from_record(record.clone())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(encrypted_record.get_proof(), None);
        assert_ne!(encrypted_record.get_payload(), record.get_payload());

        let record = RecordService::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(content.as_bytes(), record.get_payload().unwrap());
    }

    #[tokio::test]
    async fn test_build_record_from_hex() {
        let content = "776463776463776377637765";

        RecordService::from_hex(content.to_string())
            .unwrap()
            .build()
            .unwrap();
    }

    #[tokio::test]
    async fn test_build_record_from_json() {
        let content = "{\"hello\":\"world\"}";

        RecordService::from_json(content.to_string())
            .unwrap()
            .build()
            .unwrap();
    }

    #[tokio::test]
    async fn test_build_record_from_file() {
        let content = "hello world!";

        let record = RecordService::from_file(content.as_bytes().to_vec())
            .unwrap()
            .build()
            .unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_bytes() {
        let content = "hello world!";

        let record = RecordService::from_bytes(content.as_bytes().to_vec())
            .unwrap()
            .build()
            .unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }

    #[tokio::test]
    async fn test_build_record_from_record() {
        let content = "hello world!";

        let record = RecordService::from_string(content.to_string())
            .unwrap()
            .build()
            .unwrap();

        let record = RecordService::from_record(record).unwrap().build().unwrap();

        let result_payload = String::from_utf8(record.serialize().unwrap()).unwrap();

        assert_eq!(content, result_payload);
    }
}

#[cfg(test)]
mod hash_tests {
    use crate::integrity::entity::{
        anchor::AnchorNetwork,
        proof::{Proof, ProofAnchor},
    };

    use super::RecordService;
    use bloock_encrypter::aes::{AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs};
    use bloock_hasher::{keccak::Keccak256, Hasher};
    use bloock_signer::ecdsa::{EcdsaSigner, EcdsaSignerArgs};

    const PAYLOAD: &str = "hello world";
    const HASH_PAYLOAD: &str = "47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
    const HASH_SIGNED_PAYLOAD: &str =
        "35af08da6fbcd93a3ec5a85d44333de4b062c2ba88d9077fff174b7793abaa63";
    const HASH_DOUBLY_SIGNED_PAYLOAD: &str =
        "5f9064051ec1994a53119ccbeb6ad1a2c04754a8a9faf8b0d951b931376b9332";

    const PRIVATE_KEY: &str = "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb";
    const PRIVATE_KEY2: &str = "694d2e2c735f7d19fa1104576983176a6d7327f48cd33a5e0bc8efc5587e3547";

    fn get_test_proof(hash: &str) -> Proof {
        Proof {
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
            leaves: vec![bloock_hasher::from_hex(hash).unwrap()],
            nodes: vec![[0u8; 32]],
        }
    }

    #[test]
    fn build_plain_record() {
        let record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        assert_eq!(record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_plain_record_with_encrypter() {
        let record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());
        assert_ne!(
            String::from_utf8(record.clone().serialize().unwrap()).unwrap(),
            PAYLOAD
        );

        assert_eq!(record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_plain_record_with_signer() {
        let record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        let expected_hash = hex::encode(Keccak256::generate_hash(
            &record.clone().serialize().unwrap(),
        ));

        assert_eq!(expected_hash, HASH_SIGNED_PAYLOAD);

        assert_eq!(record.get_hash(), expected_hash);
    }

    #[test]
    fn build_plain_record_with_signer_and_encrypter() {
        let record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());
        assert_eq!(record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_encrypted_record() {
        let password = "password";

        let encrypted_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let record = RecordService::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(!record.is_encrypted());

        let result_payload = String::from_utf8(record.clone().serialize().unwrap()).unwrap();

        assert_eq!(PAYLOAD, result_payload);

        assert_eq!(record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_from_encrypted_record_decrypt_and_encrypt() {
        let password = "password";

        let encrypted_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let final_record = RecordService::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        let result_payload = String::from_utf8(final_record.clone().serialize().unwrap()).unwrap();

        assert_ne!(PAYLOAD, result_payload);

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_from_encrypted_record_decrypt_and_sign() {
        let password = "password";

        let encrypted_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let final_record = RecordService::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        assert!(!final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_encrypted_record_decrypt_and_sign_and_encrypt() {
        let password = "password";

        let encrypted_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(encrypted_record.is_encrypted());

        let final_record = RecordService::from_record(encrypted_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_record() {
        let signed_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        let final_record = RecordService::from_record(signed_record)
            .unwrap()
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_record_and_encrypt() {
        let signed_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        let final_record = RecordService::from_record(signed_record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_record_and_sign() {
        let signed_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        let final_record = RecordService::from_record(signed_record)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_record_and_sign_and_encrypt() {
        let signed_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        let final_record = RecordService::from_record(signed_record)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_and_encrypted_record() {
        let password = "password";

        let record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_and_encrypted_record_and_encrypt() {
        let password = "password";

        let record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record.clone())
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_and_encrypted_record_and_sign() {
        let password = "password";

        let signed_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        let final_record = RecordService::from_record(signed_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new("password", &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .build()
            .unwrap();

        assert!(!final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_signed_and_encrypted_record_and_sign_and_encrypt() {
        let password = "password";

        let signed_record = RecordService::from_string(PAYLOAD.to_string())
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        let final_record = RecordService::from_record(signed_record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new("password", &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        let final_record = RecordService::from_record(record).unwrap().build().unwrap();

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_encrypt() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_sign() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        assert!(final_record.get_proof().is_none());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_sign_and_encrypt() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(final_record.get_proof().is_none());
        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_encrpted_record_with_proof() {
        let password = "password";
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_from_encrpted_record_with_proof_and_encrypt() {
        let password = "password";
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_PAYLOAD);
    }

    #[test]
    fn build_from_encrpted_record_with_proof_and_sign() {
        let password = "password";
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_encrpted_record_with_proof_and_sign_and_encrypt() {
        let password = "password";
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .build()
            .unwrap();

        record.set_proof(get_test_proof(HASH_PAYLOAD)).unwrap();

        assert!(record.get_proof().is_some());

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = RecordService::from_record(record).unwrap().build().unwrap();

        assert!(final_record.get_proof().is_some());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_encrypt() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_sign() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .build()
            .unwrap();

        assert!(final_record.get_proof().is_none());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_sign_and_encrypt() {
        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        assert!(record.get_proof().is_some());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new("password", &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_is_encrypted() {
        let password = "password";

        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_is_encrypted_and_encrypt() {
        let password = "password";

        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_is_encrypted_and_sign() {
        let password = "password";

        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .build()
            .unwrap();

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }

    #[test]
    fn build_from_record_with_proof_and_signature_and_is_encrypted_and_sign_and_encrypt() {
        let password = "password";

        let mut record = RecordService::from_string(PAYLOAD)
            .unwrap()
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY,
                None,
            )))
            .build()
            .unwrap();

        record
            .set_proof(get_test_proof(HASH_SIGNED_PAYLOAD))
            .unwrap();

        record = RecordService::from_record(record)
            .unwrap()
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(record.is_encrypted());

        let final_record = RecordService::from_record(record)
            .unwrap()
            .with_decrypter(AesDecrypter::new(AesDecrypterArgs::new(password, &[])))
            .with_signer(EcdsaSigner::new_boxed(EcdsaSignerArgs::new(
                PRIVATE_KEY2,
                None,
            )))
            .with_encrypter(AesEncrypter::new(AesEncrypterArgs::new(password, &[])))
            .build()
            .unwrap();

        assert!(final_record.is_encrypted());

        assert_eq!(final_record.get_hash(), HASH_DOUBLY_SIGNED_PAYLOAD);
    }
}
