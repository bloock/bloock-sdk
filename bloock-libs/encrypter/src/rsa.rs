use crate::{
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
};
use rsa::{
    pkcs8::{DecodePrivateKey, DecodePublicKey},
    PaddingScheme, PublicKey, RsaPrivateKey, RsaPublicKey,
};

pub struct RsaEncrypter {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

impl RsaEncrypter {
    pub fn new(api_host: String, api_key: String, environment: Option<String>) -> Self {
        Self {
            api_host,
            api_key,
            environment,
        }
    }

    pub fn new_boxed(api_host: String, api_key: String, environment: Option<String>) -> Box<Self> {
        Box::new(Self::new(api_host, api_key, environment))
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
                self.environment.clone(),
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
            }),
        })
    }

    async fn encrypt_managed(&self, payload: &[u8], key: &Managed) -> Result<Encryption> {
        let managed = match key.clone() {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let subject = key
            .get_certificate(
                self.api_host.clone(),
                self.api_key.clone(),
                self.environment.clone(),
            )
            .await
            .map(|c| c.tbs_certificate.subject.to_string());

        let http = BloockHttpClient::new(self.api_key.clone(), self.environment.clone());

        let req = EncryptRequest {
            key_id: managed.id.clone(),
            algorithm: "RSA1_5".to_string(),
            payload: base64_url::encode(payload),
        };

        let res: EncryptResponse = http
            .post_json(format!("{}/keys/v1/encrypt", self.api_host), req, None)
            .await
            .map_err(|e| EncrypterError::FailedToEncrypt(e.to_string()))?;

        Ok(Encryption {
            ciphertext: res.cipher.into_bytes(),
            alg: crate::entity::alg::EncryptionAlg::Rsa,
            key: Some(EncryptionKey {
                key: managed.public_key.to_string(),
                subject,
            }),
        })
    }

    async fn decrypt_local(&self, payload: &[u8], key: &Local) -> Result<Vec<u8>> {
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

    async fn decrypt_managed(&self, payload: &[u8], key: &Managed) -> Result<Vec<u8>> {
        let managed = match key.clone() {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let http = BloockHttpClient::new(self.api_key.clone(), self.environment.clone());

        let req = DecryptRequest {
            key_id: managed.id.clone(),
            algorithm: "RSA1_5".to_string(),
            cipher: String::from_utf8_lossy(payload).to_string(),
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

        let encrypter = RsaEncrypter::new(api_host, api_key, None);

        let encryption = encrypter
            .encrypt_local(string_payload.as_bytes(), &local_key.clone().into())
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::Rsa);
        assert_eq!(encryption.key.unwrap().key, local_key.key);

        let result = encrypter
            .decrypt_local(&encryption.ciphertext, &local_key.clone().into())
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

        let c = RsaEncrypter::new(api_host, api_key, None);
        let result = c
            .encrypt_local(string_payload.as_bytes(), &local_key.into())
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
        let encrypter = RsaEncrypter::new(api_host, api_key, None);

        let result = encrypter
            .decrypt_local(invalid_payload.as_bytes(), &local_key.into())
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
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        sleep(Duration::from_secs(5));

        let string_payload = "hello world";

        let encrypter = RsaEncrypter::new(api_host, api_key, None);

        let encryption = encrypter
            .encrypt_managed(string_payload.as_bytes(), &managed_key.clone().into())
            .await
            .unwrap();

        assert_eq!(encryption.alg, EncryptionAlg::Rsa);
        assert_eq!(encryption.key.unwrap().key, managed_key.public_key);

        let result = encrypter
            .decrypt_managed(&encryption.ciphertext, &managed_key.into())
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

        let encrypter = RsaEncrypter::new(api_host, api_key, None);

        let result = encrypter
            .decrypt_managed(string_payload.as_bytes(), &managed_key.into())
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
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();

        let signer = RsaEncrypter::new(api_host, api_key, None);

        let result = signer
            .decrypt_managed(invalid_payload.as_bytes(), &managed_key.into())
            .await;

        assert!(result.is_err());
    }
}
