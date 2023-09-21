use crate::{entity::alg::RSA_ALG, Decrypter, Encrypter, EncrypterError, Result};
use async_trait::async_trait;
use bloock_http::{BloockHttpClient, Client};
use bloock_keys::keys::managed::ManagedKey;
use serde::{Deserialize, Serialize};

#[derive(Serialize)]
struct EncryptRequest {
    key_id: String,
    algorithm: String,
    payload: String,
}

#[derive(Deserialize)]
struct EncryptResponse {
    cipher: String,
}

#[derive(Serialize)]
struct DecryptRequest {
    key_id: String,
    algorithm: String,
    cipher: String,
}

#[derive(Deserialize)]
struct DecryptResponse {
    payload: String,
}

pub struct ManagedRsaEncrypter {
    managed_key: ManagedKey,
    api_host: String,
    api_key: String,
}

impl ManagedRsaEncrypter {
    pub fn new(managed_key: ManagedKey, api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self {
            managed_key,
            api_host,
            api_key,
        })
    }
}

#[async_trait(?Send)]
impl Encrypter for ManagedRsaEncrypter {
    async fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
        let http = BloockHttpClient::new(self.api_key.clone(), None);

        let req = EncryptRequest {
            key_id: self.managed_key.id.clone(),
            algorithm: "RSA1_5".to_string(),
            payload: base64_url::encode(payload),
        };
        let res: EncryptResponse = http
            .post_json(format!("{}/keys/v1/encrypt", self.api_host), req, None)
            .await
            .map_err(|e| EncrypterError::FailedToEncrypt(e.to_string()))?;

        Ok(res.cipher.into_bytes())
    }

    fn get_alg(&self) -> &str {
        RSA_ALG
    }
}

pub struct ManagedRsaDecrypter {
    managed_key: ManagedKey,
    api_host: String,
    api_key: String,
}

impl ManagedRsaDecrypter {
    pub fn new(managed_key: ManagedKey, api_host: String, api_key: String) -> Box<Self> {
        Box::new(Self {
            managed_key,
            api_host,
            api_key,
        })
    }
}

#[async_trait(?Send)]
impl Decrypter for ManagedRsaDecrypter {
    async fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>> {
        let http = BloockHttpClient::new(self.api_key.clone(), None);

        let req = DecryptRequest {
            key_id: self.managed_key.id.clone(),
            algorithm: "RSA1_5".to_string(),
            cipher: String::from_utf8_lossy(cipher_text).to_string(),
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
    use crate::{
        managed::rsa::{ManagedRsaDecrypter, ManagedRsaEncrypter},
        Decrypter, Encrypter,
    };
    use bloock_keys::keys::managed::ManagedKey;

    #[tokio::test]
    async fn test_rsa_encryption() {
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

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let encrypter =
            ManagedRsaEncrypter::new(managed_key.clone(), api_host.clone(), api_key.clone());

        let ciphertext = encrypter.encrypt(payload.as_bytes()).await.unwrap();
        assert_ne!(ciphertext, payload.as_bytes());

        let decrypter =
            ManagedRsaDecrypter::new(managed_key.clone(), api_host.clone(), api_key.clone());

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).await.unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload.as_bytes(), decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[tokio::test]
    async fn test_rsa_encryption_invalid_decryption_key() {
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

        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();

        let encrypter =
            ManagedRsaEncrypter::new(managed_key.clone(), api_host.clone(), api_key.clone());

        let ciphertext = encrypter.encrypt(payload_bytes).await.unwrap();

        let managed_key_params = bloock_keys::keys::managed::ManagedKeyParams {
            name: None,
            key_type: bloock_keys::KeyType::Rsa2048,
            protection: bloock_keys::entity::protection_level::ProtectionLevel::SOFTWARE,
            expiration: None,
        };
        let invalid_key =
            ManagedKey::new(&managed_key_params, api_host.clone(), api_key.clone(), None)
                .await
                .unwrap();
        let decrypter =
            ManagedRsaDecrypter::new(invalid_key.clone(), api_host.clone(), api_key.clone());

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).await;
        assert!(decrypted_payload_bytes.is_err());
    }

    #[tokio::test]
    async fn test_rsa_decryption_invalid_payload() {
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

        let unencrypted_payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let decrypter =
            ManagedRsaDecrypter::new(managed_key.clone(), api_host.clone(), api_key.clone());
        assert!(decrypter
            .decrypt(unencrypted_payload.as_bytes())
            .await
            .is_err());
    }
}
