use crate::{
    config::service::ConfigService, error::BloockResult, integrity::IntegrityError,
    record::entity::record::Record,
};
use bloock_http::Client;
use bloock_keys::entity::key::Key;
use bloock_signer::entity::signature::Signature;
use std::sync::Arc;

pub struct AuthenticityService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> AuthenticityService<H> {
    pub async fn sign(&self, mut record: Record, key: &Key) -> BloockResult<Signature> {
        let signature = record.sign(key).await?;

        Ok(signature)
    }

    pub async fn verify(&self, record: Record) -> BloockResult<bool> {
        let verification_response = record
            .verify()
            .await
            .map_err(|e| IntegrityError::VerificationError(e.to_string()))?;
        if !verification_response {
            return Ok(false);
        }

        Ok(true)
    }
}

#[cfg(test)]
mod tests {
    use crate::authenticity;
    use crate::record::document::Document;
    use crate::record::entity::record::Record;
    use bloock_http::MockClient;
    use bloock_keys::keys::local::LocalKey;
    use bloock_signer::entity::alg::SignAlg;
    use std::sync::Arc;

    #[tokio::test]
    async fn sign_ecdsa_local() {
        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
            )
            .unwrap(),
        )
        .unwrap();

        let result = service
            .sign(record, &bloock_keys::entity::key::Key::LocalKey(local_key))
            .await
            .unwrap();

        assert_eq!(result.alg, SignAlg::Es256k);
        assert_ne!(result.signature.len(), 0);
    }

    #[tokio::test]
    async fn sign_ecdsa_managed() {
        let local_key_params = bloock_keys::keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(
            Document::new(
                &payload,
                service.config_service.get_api_base_url(),
                service.config_service.get_api_key(),
            )
            .unwrap(),
        )
        .unwrap();

        let result = service
            .sign(record, &bloock_keys::entity::key::Key::LocalKey(local_key))
            .await
            .unwrap();

        assert_eq!(result.alg, SignAlg::Es256k);
        assert_ne!(result.signature.len(), 0);
    }
}
