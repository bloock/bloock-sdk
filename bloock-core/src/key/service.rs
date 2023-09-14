use crate::{config::service::ConfigService, error::BloockResult};
use bloock_http::Client;
use bloock_keys::{
    local::{LocalKey, LocalKeyParams},
    managed::{
        ManagedCertificate, ManagedCertificateParams, ManagedKey, ManagedKeyParams, ProtectionLevel,
    },
    CertificateSubject, CertificateType, KeyType,
};
use std::sync::Arc;

use super::KeyError;

pub struct KeyService<H: Client> {
    pub http: Arc<H>,
    pub config_service: ConfigService,
}

impl<H: Client> KeyService<H> {
    pub fn generate_local_key(&self, key_type: KeyType) -> BloockResult<LocalKey<String>> {
        let params = LocalKeyParams { key_type };
        LocalKey::new(&params).map_err(|e| KeyError::GenerateLocalKeyError(e.to_string()).into())
    }

    pub async fn generate_managed_key(
        &self,
        name: Option<String>,
        key_type: KeyType,
        protection: ProtectionLevel,
        expiration: Option<i64>,
    ) -> BloockResult<ManagedKey> {
        let params = ManagedKeyParams {
            name,
            key_type,
            protection,
            expiration,
        };
        ManagedKey::new(
            &params,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            None,
        )
        .await
        .map_err(|e| KeyError::GenerateManagedKeyError(e.to_string()).into())
    }

    pub fn load_local_key(
        &self,
        key_type: KeyType,
        key: String,
        private_key: Option<String>,
    ) -> BloockResult<LocalKey<String>> {
        Ok(LocalKey::load(key_type, key, private_key))
    }

    pub async fn load_managed_key(&self, id: String) -> BloockResult<ManagedKey> {
        ManagedKey::load(
            id,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        )
        .await
        .map_err(|e| KeyError::LoadManagedKeyError(e.to_string()).into())
    }

    pub async fn generate_managed_certificate(
        &self,
        key_type: KeyType,
        expiration: i32,
        cn: String,
        o: String,
        ou: String,
        c: String,
    ) -> BloockResult<ManagedCertificate> {
        let params = ManagedCertificateParams {
            key_type,
            expiration,
            subject: CertificateSubject { cn, o, ou, c },
        };
        ManagedCertificate::new(
            &params,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            None,
        )
        .await
        .map_err(|e| KeyError::GenerateManagedCertificateError(e.to_string()).into())
    }

    pub async fn load_managed_certificate(&self, id: String) -> BloockResult<ManagedCertificate> {
        ManagedCertificate::load(
            id,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        )
        .await
        .map_err(|e| KeyError::LoadManagedCertificateError(e.to_string()).into())
    }

    pub async fn import_managed_certificate(
        &self,
        certificate: Vec<u8>,
        password: Option<String>,
        certificate_type: CertificateType,
    ) -> BloockResult<ManagedCertificate> {
        ManagedCertificate::import(
            certificate,
            password,
            certificate_type,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            None,
        )
        .await
        .map_err(|e| KeyError::ImportManagedCertificateError(e.to_string()).into())
    }
}
