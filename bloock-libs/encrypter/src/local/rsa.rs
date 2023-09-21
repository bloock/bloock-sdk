use crate::{entity::alg::RSA_ALG, Decrypter, Encrypter, EncrypterError, Result};
use async_trait::async_trait;
use bloock_keys::keys::local::LocalKey;
use rsa::{
    pkcs8::{DecodePrivateKey, DecodePublicKey},
    PaddingScheme, PublicKey, RsaPrivateKey, RsaPublicKey,
};

pub struct LocalRsaEncrypter<S: ToString> {
    local_key: LocalKey<S>,
}

impl<S: ToString> LocalRsaEncrypter<S> {
    pub fn new(local_key: LocalKey<S>) -> Box<Self> {
        Box::new(Self { local_key })
    }
}

#[async_trait(?Send)]
impl<S: ToString> Encrypter for LocalRsaEncrypter<S> {
    async fn encrypt(&self, payload: &[u8]) -> Result<Vec<u8>> {
        let mut rng = rand::thread_rng();

        let public_key = RsaPublicKey::from_public_key_pem(&self.local_key.key.to_string())
            .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;

        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();

        public_key
            .encrypt(&mut rng, padding, payload)
            .map_err(|err| EncrypterError::FailedToEncrypt(err.to_string()))
    }

    fn get_alg(&self) -> &str {
        RSA_ALG
    }
}

pub struct LocalRsaDecrypter<S: ToString> {
    local_key: LocalKey<S>,
}

impl<S: ToString> LocalRsaDecrypter<S> {
    pub fn new(local_key: LocalKey<S>) -> Box<Self> {
        Box::new(Self { local_key })
    }
}

#[async_trait(?Send)]
impl<S: ToString + Clone> Decrypter for LocalRsaDecrypter<S> {
    async fn decrypt(&self, cipher_text: &[u8]) -> Result<Vec<u8>> {
        let secret_key = self
            .local_key
            .private_key
            .clone()
            .ok_or_else(|| EncrypterError::InvalidKey("No private key provided".to_string()))?;
        let private_key = RsaPrivateKey::from_pkcs8_pem(&secret_key.to_string())
            .map_err(|err| EncrypterError::InvalidKey(err.to_string()))?;
        let padding = PaddingScheme::new_oaep::<sha2::Sha256>();
        private_key
            .decrypt(padding, cipher_text)
            .map_err(|err| EncrypterError::FailedToDecrypt(err.to_string()))
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        local::rsa::{LocalRsaDecrypter, LocalRsaEncrypter},
        Decrypter, Encrypter,
    };
    use bloock_keys::keys::local::LocalKey;

    #[tokio::test]
    async fn test_rsa_encryption() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let encrypter = LocalRsaEncrypter::new(local_key.clone());

        let ciphertext = encrypter.encrypt(payload.as_bytes()).await.unwrap();
        assert_ne!(ciphertext, payload.as_bytes());

        let decrypter = LocalRsaDecrypter::new(local_key);

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).await.unwrap();
        let decrypted_payload = std::str::from_utf8(&decrypted_payload_bytes).unwrap();

        assert_eq!(payload.as_bytes(), decrypted_payload_bytes);
        assert_eq!(payload, decrypted_payload);
    }

    #[tokio::test]
    async fn test_rsa_encryption_invalid_decryption_key() {
        let payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";
        let payload_bytes = payload.as_bytes();

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let encrypter = LocalRsaEncrypter::new(local_key);

        let ciphertext = encrypter.encrypt(payload_bytes).await.unwrap();

        let invalid_key = LocalKey {
            key_type: bloock_keys::KeyType::Rsa2048,
            key: "invalid_password".to_string(),
            private_key: None,
            mnemonic: None,
        };
        let decrypter = LocalRsaDecrypter::new(invalid_key);

        let decrypted_payload_bytes = decrypter.decrypt(&ciphertext).await;
        assert!(decrypted_payload_bytes.is_err());
    }

    #[tokio::test]
    async fn test_rsa_decryption_invalid_payload() {
        let unencrypted_payload = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let decrypter = LocalRsaDecrypter::new(local_key);
        assert!(decrypter
            .decrypt(unencrypted_payload.as_bytes())
            .await
            .is_err());
    }
}
