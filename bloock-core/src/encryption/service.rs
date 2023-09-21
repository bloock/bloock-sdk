use crate::{
    config::service::ConfigService,
    error::BloockResult,
    record::{document::Document, entity::record::Record},
};
use bloock_encrypter::{Decrypter, Encrypter};
use bloock_http::Client;
use std::sync::Arc;

use super::EncryptionError;

pub struct EncryptionService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> EncryptionService<H> {
    pub async fn encrypt(
        &self,
        record: Record,
        encrypter: Box<dyn Encrypter>,
    ) -> BloockResult<Record> {
        let mut payload = record.clone();
        let bytes = record.serialize()?;
        let ciphertext = encrypter
            .encrypt(&bytes)
            .await
            .map_err(|e| EncryptionError::EncryptionError(e.to_string()))?;

        payload.set_encryption(ciphertext, encrypter.get_alg())?;
        Ok(payload)
    }

    pub async fn decrypt(
        &self,
        record: Record,
        decrypter: Box<dyn Decrypter>,
    ) -> BloockResult<Record> {
        let doc = match record.document {
            Some(doc) => doc,
            None => return Err(EncryptionError::PayloadNotFoundError().into()),
        };

        if !doc.is_encrypted() {
            return Err(EncryptionError::NotEncryptedError().into());
        }

        let payload = doc.get_payload();

        let decrypted_payload = decrypter
            .decrypt(&payload)
            .await
            .map_err(|e| EncryptionError::DecryptionError(e.to_string()))?;

        Record::new(Document::new(&decrypted_payload)?)
    }
}

#[cfg(test)]
mod tests {
    use crate::encryption;
    use crate::record::document::Document;
    use crate::record::entity::record::Record;
    use bloock_encrypter::local::aes::{LocalAesDecrypter, LocalAesEncrypter};
    use bloock_encrypter::local::rsa::{LocalRsaDecrypter, LocalRsaEncrypter};
    use bloock_http::MockClient;
    use bloock_keys::keys::local::{LocalKey, LocalKeyParams};
    use bloock_keys::KeyType;
    use std::sync::Arc;

    #[tokio::test]
    async fn encrypt_aes() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let local_key = LocalKey::load(
            bloock_keys::KeyType::Aes128,
            "new_password".to_string(),
            None,
        );
        let encrypted = service
            .encrypt(record.clone(), LocalAesEncrypter::new(local_key.clone()))
            .await
            .unwrap();

        assert_ne!(
            record.get_payload().unwrap().clone(),
            encrypted.get_payload().unwrap().clone(),
            "Should not return same hash"
        );

        let decrypted = service
            .decrypt(encrypted, LocalAesDecrypter::new(local_key))
            .await
            .unwrap();

        assert_eq!(
            record.get_payload().unwrap().clone(),
            decrypted.get_payload().unwrap().clone(),
            "Should not return same hash"
        )
    }

    #[tokio::test]
    async fn encrypt_rsa() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let local_key_params = LocalKeyParams {
            key_type: KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
        let encrypted = service
            .encrypt(record.clone(), LocalRsaEncrypter::new(local_key.clone()))
            .await
            .unwrap();

        assert_ne!(
            record.get_payload().unwrap().clone(),
            encrypted.get_payload().unwrap().clone(),
            "Should not return same hash"
        );

        let decrypted = service
            .decrypt(encrypted, LocalRsaDecrypter::new(local_key))
            .await
            .unwrap();

        assert_eq!(
            record.get_payload().unwrap().clone(),
            decrypted.get_payload().unwrap().clone(),
            "Should not return same hash"
        )
    }
}
