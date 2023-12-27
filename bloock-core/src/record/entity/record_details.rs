use crate::{error::BloockResult, integrity::entity::proof::Proof, record::document::Document};
use bloock_encrypter::entity::encryption_key::EncryptionKey;
use bloock_hasher::{keccak::Keccak256, Hasher};
use bloock_signer::entity::{alg::SignAlg, signature::Signature};

#[derive(Clone, Debug, PartialEq)]
pub struct IntegrityDetails {
    pub hash: String,
    pub proof: Option<Proof>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct SignatureDetails {
    pub signature: Signature,
    pub sign_alg: SignAlg,
    pub key: String,
    pub subject: Option<String>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct AuthenticityDetails {
    pub signatures: Vec<Signature>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct EncryptionDetails {
    pub encrypt_alg: Option<String>,
    pub key: Option<EncryptionKey>,
}

#[derive(Clone, Debug, PartialEq)]
pub struct AvailabilityDetails {
    pub content_type: Option<String>,
    pub size: usize,
}

#[derive(Clone, Debug, PartialEq)]
pub struct RecordDetails {
    pub integrity: Option<IntegrityDetails>,
    pub authenticity: Option<AuthenticityDetails>,
    pub encryption: Option<EncryptionDetails>,
    pub availability: Option<AvailabilityDetails>,
}

impl RecordDetails {
    pub fn new(document: &Document) -> BloockResult<Self> {
        let mut details = RecordDetails {
            integrity: None,
            authenticity: None,
            encryption: None,
            availability: None,
        };

        // Encryption details
        if document.is_encrypted() {
            details.encryption = Some(EncryptionDetails {
                encrypt_alg: document.get_encryption_alg().ok().map(|a| a.to_string()),
                key: document.get_encryption_key().ok(),
            })
        } else {
            // Integrity details
            let proof = document.get_proof();
            let hash = match proof.clone() {
                Some(proof) => proof.get_hash()?,
                None => Keccak256::hash(&[document.build()?.as_slice()]),
            };
            details.integrity = Some(IntegrityDetails {
                hash: hex::encode(&hash),
                proof: proof,
            });
        }

        // Authenticity details
        let signatures = document.get_signatures().unwrap_or_default();
        if !signatures.is_empty() {
            details.authenticity = Some(AuthenticityDetails { signatures })
        }

        // Availability details
        let payload = document.build()?;
        details.availability = Some(AvailabilityDetails {
            content_type: document.get_content_type(),
            size: payload.len(),
        });

        Ok(details)
    }
}

#[cfg(test)]
mod tests {
    use bloock_encrypter::entity::alg::EncryptionAlg;
    use bloock_keys::{
        certificates::{
            local::{LocalCertificate, LocalCertificateParams},
            CertificateSubject,
        },
        keys::local::{LocalKey, LocalKeyParams},
    };

    use super::*;
    use crate::{config, record};

    const PAYLOAD: &[u8] = include_bytes!("../../../assets/dummy-image.jpeg");
    const HASH_PAYLOAD: &str = "70c0be9edaf6cc8ac299cb87ef34380fde6a452fff0158a46633e77511616fff";
    const HASH_SIGNED_PAYLOAD: &str =
        "71f261e9548274d9074abd5ae4c3be15cf30f0a6202a27750d8fa39b6b146e00";

    #[tokio::test]
    async fn test_record_details_plain_record() {
        let service = record::configure_test(config::configure_test().config_data);

        let details = service
            .from_file(PAYLOAD.to_vec())
            .unwrap()
            .get_details()
            .await
            .unwrap();

        assert_eq!(
            details.integrity,
            Some(IntegrityDetails {
                hash: HASH_PAYLOAD.to_string(),
                proof: None
            })
        );
        assert_eq!(details.authenticity, None);
        assert_eq!(details.encryption, None);
        assert_eq!(
            details.availability,
            Some(AvailabilityDetails {
                content_type: Some("image/jpeg".to_string()),
                size: PAYLOAD.len()
            })
        );
    }

    #[tokio::test]
    async fn test_record_details_plain_record_with_encrypter() {
        let service = record::configure_test(config::configure_test().config_data);

        let local_key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        })
        .unwrap();
        let payload = service
            .from_file(PAYLOAD.to_vec())
            .unwrap()
            .with_encrypter(&local_key.clone().into())
            .build()
            .await
            .unwrap()
            .serialize()
            .unwrap();

        let details = service
            .from_file(payload.clone())
            .unwrap()
            .get_details()
            .await
            .unwrap();

        assert_eq!(details.integrity, None);
        assert_eq!(details.authenticity, None);
        assert_eq!(
            details.encryption,
            Some(EncryptionDetails {
                encrypt_alg: Some(EncryptionAlg::A256gcm.to_string()),
                key: None
            })
        );
        assert_eq!(
            details.availability,
            Some(AvailabilityDetails {
                content_type: None,
                size: payload.len()
            })
        );
    }

    // #[tokio::test]
    // async fn test_record_details_plain_record_with_encrypter_certificate() {
    //     let service = record::configure_test(config::configure_test().config_data);

    //     let local_cert = LocalCertificate::new(&LocalCertificateParams {
    //         key_type: bloock_keys::KeyType::Rsa4096,
    //         subject: CertificateSubject {
    //             common_name: "Bloock".to_string(),
    //             organizational_unit: None,
    //             organization: None,
    //             location: None,
    //             state: None,
    //             country: None,
    //         },
    //         password: "".to_string(),
    //         expiration: 0,
    //     })
    //     .unwrap();
    //     let payload = service
    //         .from_file(PAYLOAD.to_vec())
    //         .unwrap()
    //         .with_encrypter(&local_cert.clone().into())
    //         .build()
    //         .await
    //         .unwrap()
    //         .serialize()
    //         .unwrap();

    //     let details = service
    //         .from_file(payload.clone())
    //         .unwrap()
    //         .get_details()
    //         .await
    //         .unwrap();

    //     assert_eq!(details.integrity, None);
    //     assert_eq!(details.authenticity, None);
    //     assert_eq!(
    //         details.encryption,
    //         Some(EncryptionDetails {
    //             encrypt_alg: Some(EncryptionAlg::Rsa),
    //             key: Some(EncryptionKey {
    //                 key: local_cert.key.key,
    //                 subject: Some(local_cert.certificate.tbs_certificate.subject.to_string())
    //             })
    //         })
    //     );
    //     assert_eq!(
    //         details.availability,
    //         Some(AvailabilityDetails {
    //             content_type: None,
    //             size: payload.len()
    //         })
    //     );
    // }

    #[tokio::test]
    async fn test_record_details_plain_record_with_signer() {
        let local_key: LocalKey<String> = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "04d922c1e1d0a0e1f1837c2358fd899c8668b6654595e3e4aa88a69f7f66b00ff888ceff77fc0d48a6f1bcaab3a0833b880ffda5981c35ce09f1c8f60b8528bb22".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        let service = record::configure_test(config::configure_test().config_data);

        let payload = service
            .from_file(PAYLOAD.to_vec())
            .unwrap()
            .with_signer(&local_key.clone().into(), None)
            .build()
            .await
            .unwrap()
            .serialize()
            .unwrap();

        let details = service
            .from_file(payload.clone())
            .unwrap()
            .get_details()
            .await
            .unwrap();

        assert_eq!(
            details.integrity,
            Some(IntegrityDetails {
                hash: HASH_SIGNED_PAYLOAD.to_string(),
                proof: None
            })
        );

        assert_eq!(details.authenticity.clone().unwrap().signatures.len(), 1);
        let signature = &details.authenticity.unwrap().signatures[0];
        assert_eq!(signature.alg, SignAlg::Es256k);
        assert!(!signature.signature.is_empty());
        assert!(!signature.message_hash.is_empty());
        assert_eq!(signature.key, local_key.key);
        assert_eq!(signature.subject, None);
        assert_eq!(details.encryption, None);
        assert_eq!(
            details.availability,
            Some(AvailabilityDetails {
                content_type: Some("image/jpeg".to_string()),
                size: payload.len()
            })
        );
    }

    #[tokio::test]
    async fn test_record_details_plain_record_with_signer_certificate() {
        let local_cert = LocalCertificate::new(&LocalCertificateParams {
            key_type: bloock_keys::KeyType::Rsa2048,
            subject: CertificateSubject {
                common_name: "Bloock".to_string(),
                organizational_unit: None,
                organization: None,
                location: None,
                state: None,
                country: None,
            },
            password: "".to_string(),
            expiration: 0,
        })
        .unwrap();

        let service = record::configure_test(config::configure_test().config_data);

        let payload = service
            .from_file(PAYLOAD.to_vec())
            .unwrap()
            .with_signer(&local_cert.clone().into(), None)
            .build()
            .await
            .unwrap()
            .serialize()
            .unwrap();

        let details = service
            .from_file(payload.clone())
            .unwrap()
            .get_details()
            .await
            .unwrap();

        assert!(!details.integrity.clone().unwrap().hash.is_empty());
        assert!(details.integrity.unwrap().proof.is_none());

        assert_eq!(details.authenticity.clone().unwrap().signatures.len(), 1);
        let signature = &details.authenticity.unwrap().signatures[0];
        assert_eq!(signature.alg, SignAlg::Rsa);
        assert!(!signature.signature.is_empty());
        assert!(!signature.message_hash.is_empty());
        assert_eq!(signature.key, local_cert.key.key);
        assert_eq!(
            signature.subject,
            Some(local_cert.certificate.tbs_certificate.subject.to_string())
        );
        assert_eq!(details.encryption, None);
        assert_eq!(
            details.availability,
            Some(AvailabilityDetails {
                content_type: Some("image/jpeg".to_string()),
                size: payload.len()
            })
        );
    }

    #[tokio::test]
    async fn test_record_details_plain_record_with_signer_and_encrypter() {
        let local_key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        })
        .unwrap();

        let local_aes_key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        })
        .unwrap();

        let service = record::configure_test(config::configure_test().config_data);

        let payload = service
            .from_file(PAYLOAD.to_vec())
            .unwrap()
            .with_signer(&local_key.clone().into(), None)
            .with_encrypter(&local_aes_key.clone().into())
            .build()
            .await
            .unwrap()
            .serialize()
            .unwrap();

        let details = service
            .from_file(payload.clone())
            .unwrap()
            .get_details()
            .await
            .unwrap();

        assert_eq!(details.integrity, None);
        assert_eq!(details.authenticity, None);
        assert_eq!(
            details.encryption,
            Some(EncryptionDetails {
                encrypt_alg: Some(EncryptionAlg::A256gcm.to_string()),
                key: None
            })
        );
        assert_eq!(
            details.availability,
            Some(AvailabilityDetails {
                content_type: None,
                size: payload.len()
            })
        );
    }
}
