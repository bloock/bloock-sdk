use crate::{config::service::ConfigService, error::BloockResult, record::entity::record::Record};
use bloock_http::Client;
use bloock_keys::entity::key::Key;
use std::sync::Arc;

use super::EncryptionError;

pub struct EncryptionService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> EncryptionService<H> {
    pub async fn encrypt(&self, mut record: Record, key: &Key) -> BloockResult<Record> {
        record
            .encrypt(key)
            .await
            .map_err(|e| EncryptionError::EncryptionError(e.to_string()))?;
        Ok(record)
    }

    pub async fn decrypt(&self, mut record: Record, key: &Key) -> BloockResult<Record> {
        let doc = match record.document.clone() {
            Some(doc) => doc,
            None => return Err(EncryptionError::PayloadNotFoundError().into()),
        };

        if !doc.is_encrypted() {
            return Err(EncryptionError::NotEncryptedError().into());
        }

        record
            .decrypt(key)
            .await
            .map_err(|e| EncryptionError::DecryptionError(e.to_string()))?;

        Ok(record)
    }
}

#[cfg(test)]
mod tests {
    use crate::encryption;
    use crate::record::document::Document;
    use crate::record::entity::record::Record;
    use bloock_http::MockClient;
    use bloock_keys::keys::local::{LocalKey, LocalKeyParams};
    use bloock_keys::KeyType;
    use std::sync::Arc;

    #[tokio::test]
    async fn encrypt_aes() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
                service.config_service.get_environment(),
            )
            .unwrap(),
        )
        .unwrap();

        let local_key = LocalKey::load(
            bloock_keys::KeyType::Aes128,
            "new_password".to_string(),
            None,
        );
        let encrypted = service
            .encrypt(record.clone(), &local_key.clone().into())
            .await
            .unwrap();

        assert_ne!(
            record.clone().serialize().unwrap(),
            encrypted.clone().serialize().unwrap(),
            "Should not return same hash"
        );

        let decrypted = service.decrypt(encrypted, &local_key.into()).await.unwrap();

        assert_eq!(
            record.serialize().unwrap().clone(),
            decrypted.serialize().unwrap().clone(),
            "Should not return same hash"
        )
    }

    #[tokio::test]
    async fn encrypt_rsa() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
                service.config_service.get_environment(),
            )
            .unwrap(),
        )
        .unwrap();

        let local_key_params = LocalKeyParams {
            key_type: KeyType::Rsa2048,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();
        let encrypted = service
            .encrypt(record.clone(), &local_key.clone().into())
            .await
            .unwrap();

        assert_ne!(
            record.clone().serialize().unwrap(),
            encrypted.clone().serialize().unwrap(),
            "Should not return same hash"
        );

        let decrypted = service.decrypt(encrypted, &local_key.into()).await.unwrap();

        assert_eq!(
            record.serialize().unwrap().clone(),
            decrypted.serialize().unwrap().clone(),
            "Should not return same hash"
        )
    }
}
