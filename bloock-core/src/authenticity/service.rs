use crate::{
    config::service::ConfigService,
    error::{BloockResult, InfrastructureError},
    integrity::IntegrityError,
    record::entity::record::Record,
};
use bloock_http::Client;
use bloock_signer::{entity::signature::Signature, Signer};
use std::sync::Arc;

use super::AuthenticityError;

pub struct AuthenticityService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> AuthenticityService<H> {
    pub async fn sign(&self, record: Record, signer: Box<dyn Signer>) -> BloockResult<Signature> {
        let payload = record
            .get_payload()
            .ok_or(AuthenticityError::PayloadNotFoundError())?;

        let signature = signer
            .sign(payload)
            .await
            .map_err(InfrastructureError::SignerError)?;

        Ok(signature)
    }

    pub async fn verify(&self, record: Record) -> BloockResult<bool> {
        let signatures = match record.get_signatures() {
            Some(s) => s,
            None => return Err(IntegrityError::InvalidVerification.into()),
        };

        let payload = match record.get_payload() {
            Some(s) => s,
            None => return Err(IntegrityError::InvalidVerification.into()),
        };

        for signature in signatures {
            let verifier = bloock_signer::create_verifier_from_signature(
                &signature,
                self.config_service.get_api_base_url(),
                self.config_service.get_api_key(),
                None,
            )
            .map_err(|e| IntegrityError::VerificationError(e.to_string()))?;
            let verification_response = verifier
                .verify(payload, signature.clone())
                .await
                .map_err(|e| IntegrityError::VerificationError(e.to_string()))?;
            if !verification_response {
                return Ok(false);
            }
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
    use bloock_keys::local::LocalKey;
    use bloock_signer::entity::alg::Algorithms;
    use bloock_signer::local::ecdsa::LocalEcdsaSigner;
    use bloock_signer::local::ens::LocalEnsSigner;
    use std::sync::Arc;

    #[tokio::test]
    async fn sign_ecdsa_local() {
        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let signer = LocalEcdsaSigner::new_boxed(local_key, None);
        let result = service.sign(record, signer).await.unwrap();

        assert_eq!(result.header.alg, Algorithms::Es256k.to_string());
        assert_ne!(result.signature.len(), 0);
    }

    #[tokio::test]
    async fn sign_ens_local() {
        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let signer = LocalEnsSigner::new_boxed(local_key);
        let result = service.sign(record, signer).await.unwrap();

        assert_eq!(result.header.alg, "ENS");
        assert_ne!(result.signature.len(), 0);
    }

    #[tokio::test]
    async fn sign_ecdsa_managed() {
        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let signer = LocalEcdsaSigner::new_boxed(local_key, None);
        let result = service.sign(record, signer).await.unwrap();

        assert_eq!(result.header.alg, Algorithms::Es256k.to_string());
        assert_ne!(result.signature.len(), 0);
    }

    #[tokio::test]
    async fn sign_ens_managed() {
        let local_key_params = bloock_keys::local::LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        };
        let local_key = LocalKey::new(&local_key_params).unwrap();

        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let signer = LocalEnsSigner::new_boxed(local_key);
        let result = service.sign(record, signer).await.unwrap();

        assert_eq!(result.header.alg, "ENS");
        assert_ne!(result.signature.len(), 0);
    }
}
