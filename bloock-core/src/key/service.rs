use crate::{config::service::ConfigService, error::BloockResult, record::entity::record::Record};
use bloock_encrypter::aes::{AesDecrypter, AesEncrypter};
use bloock_http::Client;
use bloock_keys::{
    local::{LocalKey, LocalKeyParams},
    managed::{ManagedKey, ManagedKeyParams},
};
use std::sync::Arc;

pub struct KeyService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> KeyService<H> {
    pub fn generate_local_key(
        &self,
        record: Record,
        encrypter: Box<AesEncrypter>,
    ) -> BloockResult<LocalKey> {
        let params = LocalKeyParams { key_type: todo!() };
        let key = LocalKey::new(&params);
    }

    pub fn generate_managed_key(
        &self,
        record: Record,
        decrypter: Box<AesDecrypter>,
    ) -> BloockResult<ManagedKey> {
        let params = ManagedKeyParams {
            name: todo!(),
            key_type: todo!(),
            protection: todo!(),
            expiration: todo!(),
        };
        let key = ManagedKey::new(
            &params,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        );
    }
}

#[cfg(test)]
mod tests {
    use crate::encryption;
    use crate::record::document::Document;
    use crate::record::entity::record::Record;
    use bloock_encrypter::{
        aes::{AesDecrypter, AesDecrypterArgs, AesEncrypter, AesEncrypterArgs},
        ecies::{EciesDecrypter, EciesDecrypterArgs, EciesEncrypter, EciesEncrypterArgs},
        rsa::{RsaDecrypter, RsaDecrypterArgs, RsaEncrypter, RsaEncrypterArgs},
    };
    use bloock_http::MockClient;
    use bloock_keys::keys::rsa::RsaKey;
    use std::sync::Arc;

    #[tokio::test]
    async fn encrypt_aes() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let password = "new_password";
        let encrypted = service
            .encrypt_aes(
                record.clone(),
                AesEncrypter::new(AesEncrypterArgs::new(password, &[])),
            )
            .unwrap();

        assert_ne!(
            record.get_payload(),
            encrypted.get_payload(),
            "Should not return same hash"
        );

        let decrypted = service
            .decrypt_aes(
                encrypted,
                AesDecrypter::new(AesDecrypterArgs::new(password, &[])),
            )
            .unwrap();

        assert_eq!(
            record.get_payload(),
            decrypted.get_payload(),
            "Should not return same hash"
        )
    }

    #[tokio::test]
    async fn encrypt_rsa() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let keys = RsaKey::new_rsa_2048().unwrap();
        let encrypted = service
            .encrypt_rsa(
                record.clone(),
                RsaEncrypter::new(RsaEncrypterArgs::new(&keys.public_key)),
            )
            .unwrap();

        assert_ne!(
            record.get_payload(),
            encrypted.get_payload(),
            "Should not return same hash"
        );

        let decrypted = service
            .decrypt_rsa(
                encrypted,
                RsaDecrypter::new(RsaDecrypterArgs::new(&keys.private_key)),
            )
            .unwrap();

        assert_eq!(
            record.get_payload(),
            decrypted.get_payload(),
            "Should not return same hash"
        )
    }

    #[tokio::test]
    async fn encrypt_ecies() {
        let payload: Vec<u8> = vec![1, 2, 3, 4, 5];

        let http = MockClient::default();
        let service = encryption::configure_test(Arc::new(http));

        let record = Record::new(Document::new(&payload).unwrap()).unwrap();

        let key_pair = bloock_encrypter::ecies::generate_ecies_key_pair();
        let encrypted = service
            .encrypt_ecies(
                record.clone(),
                EciesEncrypter::new(EciesEncrypterArgs::new(key_pair.public_key)),
            )
            .unwrap();

        assert_ne!(
            record.get_payload(),
            encrypted.get_payload(),
            "Should not return same hash"
        );

        let decrypted = service
            .decrypt_ecies(
                encrypted,
                EciesDecrypter::new(EciesDecrypterArgs::new(key_pair.private_key)),
            )
            .unwrap();

        assert_eq!(
            record.get_payload(),
            decrypted.get_payload(),
            "Should not return same hash"
        )
    }
}
