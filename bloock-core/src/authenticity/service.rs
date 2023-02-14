use crate::{config::service::ConfigService, error::BloockResult, record::entity::record::Record};
use bloock_http::Client;
use bloock_signer::{ecdsa::EcdsaSigner, ens::EnsSigner, Signature};
use std::sync::Arc;

pub struct AuthenticityService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> AuthenticityService<H> {
    pub fn sign_ecdsa(
        &self,
        mut record: Record,
        signer: Box<EcdsaSigner>,
    ) -> BloockResult<Signature> {
        record.sign(signer)
    }

    pub fn sign_ens(&self, mut record: Record, signer: Box<EnsSigner>) -> BloockResult<Signature> {
        record.sign(signer)
    }

    pub fn verify(&self, mut record: Record) -> BloockResult<bool> {
        record.verify()
    }
}

#[cfg(test)]
mod tests {
    use crate::authenticity;
    use crate::record::document::Document;
    use crate::record::entity::record::Record;
    use bloock_http::MockClient;
    use bloock_signer::ecdsa::{EcdsaSigner, EcdsaSignerArgs};
    use bloock_signer::ens::{EnsSigner, EnsSignerArgs};
    use std::sync::Arc;

    #[tokio::test]
    async fn sign_ecdsa() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let key_pair = EcdsaSigner::generate_keys().unwrap();

        let signer = EcdsaSigner::new_boxed(EcdsaSignerArgs::new(&key_pair.0, None));
        let result = service.sign_ecdsa(record, signer).unwrap();

        assert_eq!(result.header.alg, "ES256K");
        assert_ne!(result.signature.len(), 0);
    }

    #[tokio::test]
    async fn sign_ens() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = authenticity::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let key_pair = EcdsaSigner::generate_keys().unwrap();

        let signer = EnsSigner::new_boxed(EnsSignerArgs::new(&key_pair.0));
        let result = service.sign_ens(record, signer).unwrap();

        assert_eq!(result.header.alg, "ENS");
        assert_ne!(result.signature.len(), 0);
    }
}
