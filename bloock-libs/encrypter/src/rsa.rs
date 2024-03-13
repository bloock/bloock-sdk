use crate::{
    aes::AesEncrypter,
    entity::{
        dto::{
            decrypt_request::DecryptRequest, decrypt_response::DecryptResponse,
            encrypt_request::EncryptRequest, encrypt_response::EncryptResponse,
        },
        encryption::Encryption,
        encryption_key::EncryptionKey,
    },
    Encrypter, EncrypterError, Result,
};
use async_trait::async_trait;
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::{
    certificates::GetX509Certficate,
    entity::key::{Local, Managed},
    keys::local::{LocalKey, LocalKeyParams},
};
use rsa::{
    pkcs8::{DecodePrivateKey, DecodePublicKey},
    PaddingScheme, PublicKey, RsaPrivateKey, RsaPublicKey,
};

pub struct RsaEncrypter {
    api_host: String,
    api_key: String,
}

impl RsaEncrypter {
    pub fn new(api_host: String, api_key: String) -> Self {
        Self {
            api_host,
            api_key,
        }
    }

    pub fn new_boxed(api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self::new(api_host, api_key))
    }
}

#[async_trait(?Send)]
impl Encrypter for RsaEncrypter {
    async fn encrypt_local(&self, payload: &[u8], key: &Local) -> Result<Encryption> {
        let local = match key.clone() {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map(|c| c.tbs_certificate.subject.to_string());

        let aes_key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        })
        .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;

        let aes_encrypter = AesEncrypter::new(
            self.api_host.clone(),
            self.api_key.clone(),
        );

        let ciphertext = aes_encrypter
            .encrypt_local(payload, &aes_key.clone().into())
            .await?;

        let aes_key_encrypted = self
            .internal_encrypt_local(aes_key.key.as_bytes(), key)
            .await?;

        Ok(Encryption {
            ciphertext: ciphertext.ciphertext,
            alg: crate::entity::alg::EncryptionAlg::Rsa,
            key: Some(EncryptionKey {
                key: local.key.to_string(),
                subject,
                aes_key_enc: Some(hex::encode(aes_key_encrypted.ciphertext)),
            }),
        })
    }

    async fn encrypt_managed(
        &self,
        payload: &[u8],
        key: &Managed,
        access_control: Option<String>,
    ) -> Result<Encryption> {
        let managed = match key.clone() {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map(|c| c.tbs_certificate.subject.to_string());

        let aes_key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::Aes256,
        })
        .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;

        let aes_encrypter = AesEncrypter::new(
            self.api_host.clone(),
            self.api_key.clone(),
        );

        let ciphertext = aes_encrypter
            .encrypt_local(payload, &aes_key.clone().into())
            .await?;

        let aes_key_encrypted = self
            .internal_encrypt_managed(aes_key.key.as_bytes(), key, access_control)
            .await?;

        Ok(Encryption {
            ciphertext: ciphertext.ciphertext,
            alg: crate::entity::alg::EncryptionAlg::RsaM,
            key: Some(EncryptionKey {
                key: managed.public_key.to_string(),
                subject,
                aes_key_enc: Some(hex::encode(aes_key_encrypted.ciphertext)),
            }),
        })
    }

    async fn decrypt_local(
        &self,
        payload: &[u8],
        encryption_key: Option<EncryptionKey>,
        key: &Local,
    ) -> Result<Vec<u8>> {
        let encrypted_aes_key = encryption_key
            .and_then(|e| e.aes_key_enc)
            .and_then(|e| hex::decode(e).ok())
            .ok_or_else(|| {
                EncrypterError::InvalidKey("Invalid encryption metadata provided".to_string())
            })?;

        let aes_key = self.internal_decrypt_local(&encrypted_aes_key, key).await?;
        let aes_key = String::from_utf8(aes_key).map_err(|_| {
            EncrypterError::InvalidKey("Invalid encryption metadata provided".to_string())
        })?;
        let aes_key = LocalKey::load(bloock_keys::KeyType::Aes256, aes_key).map_err(|_| {
            EncrypterError::InvalidKey("Invalid encryption metadata provided".to_string())
        })?;

        let aes_encrypter = AesEncrypter::new(
            self.api_host.clone(),
            self.api_key.clone(),
        );

        aes_encrypter
            .decrypt_local(payload, None, &aes_key.into())
            .await
    }

    async fn decrypt_managed(
        &self,
        payload: &[u8],
        encryption_key: Option<EncryptionKey>,
        key: &Managed,
        access_control: Option<String>,
    ) -> Result<Vec<u8>> {
        let encrypted_aes_key = encryption_key
            .and_then(|e| e.aes_key_enc)
            .and_then(|e| hex::decode(e).ok())
            .ok_or_else(|| {
                EncrypterError::InvalidKey("Invalid encryption metadata provided".to_string())
            })?;

        let aes_key = self
            .internal_decrypt_managed(&encrypted_aes_key, key, access_control)
            .await?;
        let aes_key = String::from_utf8(aes_key).map_err(|_| {
            EncrypterError::InvalidKey("Invalid encryption metadata provided".to_string())
        })?;
        let aes_key = LocalKey::load(bloock_keys::KeyType::Aes256, aes_key).map_err(|_| {
            EncrypterError::InvalidKey("Invalid encryption metadata provided".to_string())
        })?;

        let aes_encrypter = AesEncrypter::new(
            self.api_host.clone(),
            self.api_key.clone(),
        );

        aes_encrypter
            .decrypt_local(payload, None, &aes_key.into())
            .await
    }
}

impl RsaEncrypter {
    async fn internal_encrypt_local(&self, payload: &[u8], key: &Local) -> Result<Encryption> {
        let local = match key.clone() {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map(|c| c.tbs_certificate.subject.to_string());

        let mut rng = rand::thread_rng();

        let public_key = RsaPublicKey::from_public_key_pem(&local.key.to_string())
            .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;

        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();

        let ciphertext = public_key
            .encrypt(&mut rng, padding, payload)
            .map_err(|err| EncrypterError::FailedToEncrypt(err.to_string()))?;

        Ok(Encryption {
            ciphertext,
            alg: crate::entity::alg::EncryptionAlg::Rsa,
            key: Some(EncryptionKey {
                key: local.key.to_string(),
                subject,
                aes_key_enc: None,
            }),
        })
    }

    async fn internal_encrypt_managed(
        &self,
        payload: &[u8],
        key: &Managed,
        access_control: Option<String>,
    ) -> Result<Encryption> {
        let managed = match key.clone() {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
            )
            .await
            .map(|c| c.tbs_certificate.subject.to_string());

        let http = BloockHttpClient::new(self.api_key.clone(), None);

        let req = EncryptRequest {
            key_id: managed.id.clone(),
            algorithm: "RSA1_5".to_string(),
            payload: base64_url::encode(payload),
            access_code: access_control,
        };

        let res: EncryptResponse = http
            .post_json(format!("{}/keys/v1/encrypt", self.api_host), req, None)
            .await
            .map_err(|e| EncrypterError::FailedToEncrypt(e.to_string()))?;

        Ok(Encryption {
            ciphertext: res.cipher.into_bytes(),
            alg: crate::entity::alg::EncryptionAlg::RsaM,
            key: Some(EncryptionKey {
                key: managed.public_key.to_string(),
                subject,
                aes_key_enc: None,
            }),
        })
    }

    async fn internal_decrypt_local(&self, payload: &[u8], key: &Local) -> Result<Vec<u8>> {
        let local = match key.clone() {
            Local::Key(k) => k.clone(),
            Local::Certificate(c) => c.key.clone(),
        };

        let secret_key = local
            .private_key
            .clone()
            .ok_or_else(|| EncrypterError::InvalidKey("No private key provided".to_string()))?;
        let private_key = RsaPrivateKey::from_pkcs8_pem(&secret_key.to_string())
            .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;
        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();
        private_key
            .decrypt(padding, payload)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }

    async fn internal_decrypt_managed(
        &self,
        payload: &[u8],
        key: &Managed,
        access_control: Option<String>,
    ) -> Result<Vec<u8>> {
        let managed = match key.clone() {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let http = BloockHttpClient::new(self.api_key.clone(), None);

        let req = DecryptRequest {
            key_id: managed.id.clone(),
            algorithm: "RSA1_5".to_string(),
            cipher: String::from_utf8_lossy(payload).to_string(),
            access_code: access_control,
        };
        let res: DecryptResponse = http
            .post_json(format!("{}/keys/v1/decrypt", self.api_host), req, None)
            .await
            .map_err(|e| EncrypterError::FailedToEncrypt(e.to_string()))?;

        Ok(base64_url::decode(&res.payload).map_err(|_| EncrypterError::InvalidBase64())?)
    }
}

#[cfg(test)]
mod tests {
    use std::thread::sleep;
    use std::time::Duration;

    use crate::entity::alg::EncryptionAlg;

    use super::*;
    use bloock_keys::keys::local::LocalKey;
    use bloock_keys::keys::managed::ManagedKey;

    #[tokio::test]
    async fn test_encrypt_local_key_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let encrypter = RsaEncrypter::new(api_host, api_key);

        let encryption = encrypter
            .encrypt_local(string_payload.as_bytes(), &local_key.clone().into())
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::Rsa);
        assert_eq!(encryption.key.clone().unwrap().key, local_key.key);

        let result = encrypter
            .decrypt_local(
                &encryption.ciphertext,
                encryption.key,
                &local_key.clone().into(),
            )
            .await
            .unwrap();

        assert_eq!(result, string_payload.as_bytes().to_vec());
    }

    #[tokio::test]
    async fn test_encrypt_local_invalid_private_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";
        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::Rsa2048,
            key: "".to_string(),
            private_key: Some(
                "04dfcc5681f773592f44e40cbb69e33996d510a517772dbb20958a64b64e443e87cd7c67f1b1fe44b63f05435ae817139091f6c9c473983800fbf6d2ea74c47b16".to_string(),
            ),
            mnemonic: None,
        };

        let c = RsaEncrypter::new(api_host, api_key);
        let result = c
            .encrypt_local(string_payload.as_bytes(), &local_key.into())
            .await;
        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_encrypt_local_invalid_aes_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let string_payload = "hello world";

        let encrypter = RsaEncrypter::new(api_host, api_key);

        let encryption = encrypter
            .encrypt_local(string_payload.as_bytes(), &local_key.clone().into())
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::Rsa);
        assert_eq!(encryption.key.clone().unwrap().key, local_key.key);

        let result = encrypter
            .decrypt_local(
                &encryption.ciphertext,
                Some(EncryptionKey {
                    key: String::default(),
                    subject: None,
                    aes_key_enc: Some("invalid_aes_key".to_string()),
                }),
                &local_key.clone().into(),
            )
            .await;

        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_decrypt_local_invalid_payload() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let invalid_payload = "invalid_ciphertext";

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
        let encrypter = RsaEncrypter::new(api_host, api_key);

        let result = encrypter
            .decrypt_local(invalid_payload.as_bytes(), None, &local_key.into())
            .await;

        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_encrypt_managed_ok() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();

        sleep(Duration::from_secs(5));

        let string_payload = "hello world";

        let encrypter = RsaEncrypter::new(api_host, api_key);

        let encryption = encrypter
            .encrypt_managed(string_payload.as_bytes(), &managed_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::RsaM);
        assert_eq!(encryption.clone().key.unwrap().key, managed_key.public_key);

        let result = encrypter
            .decrypt_managed(
                &encryption.ciphertext,
                encryption.key,
                &managed_key.into(),
                None,
            )
            .await
            .unwrap();

        assert_eq!(result, string_payload.as_bytes().to_vec());
    }

    #[tokio::test]
    async fn test_decrypt_managed_invalid_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let string_payload = "hello world";

        let managed_key = ManagedKey {
            id: "invalid_id".to_string(),
            name: None,
            key_type: bloock_keys::KeyType::Rsa2048,
            public_key: "invalid_key".to_string(),
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };

        let encrypter = RsaEncrypter::new(api_host, api_key);

        let result = encrypter
            .decrypt_managed(string_payload.as_bytes(), None, &managed_key.into(), None)
            .await;

        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_encrypt_managed_invalid_aes_key() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();

        sleep(Duration::from_secs(5));

        let string_payload = "hello world";

        let encrypter = RsaEncrypter::new(api_host, api_key);

        let encryption = encrypter
            .encrypt_managed(string_payload.as_bytes(), &managed_key.clone().into(), None)
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::RsaM);
        assert_eq!(encryption.clone().key.unwrap().key, managed_key.public_key);

        let result = encrypter
            .decrypt_managed(
                &encryption.ciphertext,
                Some(EncryptionKey {
                    key: String::default(),
                    subject: None,
                    aes_key_enc: Some("invalid_aes_key".to_string()),
                }),
                &managed_key.into(),
                None,
            )
            .await;

        assert!(result.is_err());
    }

    #[tokio::test]
    async fn test_decrypt_managed_invalid_payload() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let invalid_payload = "invalid_ciphertext";

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let managed_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone())
                .await
                .unwrap();

        let signer = RsaEncrypter::new(api_host, api_key);

        let result = signer
            .decrypt_managed(invalid_payload.as_bytes(), None, &managed_key.into(), None)
            .await;

        assert!(result.is_err());
    }
}
