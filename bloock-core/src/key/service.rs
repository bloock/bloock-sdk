use super::KeyError;
use crate::{config::service::ConfigService, error::BloockResult};
use bloock_http::Client;
use bloock_keys::{
    access_control::{
        secret::SecretAccessControl,
        totp::{TotpAccessControl, TotpAccessControlResult},
    },
    certificates::CertificateSubject,
    certificates::{
        local::{LocalCertificate, LocalCertificateParams},
        managed::{ManagedCertificate, ManagedCertificateParams},
    },
    entity::{key::Managed, protection_level::ProtectionLevel},
    keys::local::{LocalKey, LocalKeyParams},
    keys::managed::{ManagedKey, ManagedKeyParams},
    CertificateType, KeyType,
};
use std::sync::Arc;

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
        )
        .await
        .map_err(|e| KeyError::GenerateManagedKeyError(e.to_string()).into())
    }

    pub fn load_local_key(&self, key_type: KeyType, key: String) -> BloockResult<LocalKey<String>> {
        LocalKey::load(key_type, key).map_err(|e| KeyError::LoadLocalKeyError(e.to_string()).into())
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

    pub fn generate_local_certificate(
        &self,
        key_type: KeyType,
        password: String,
        subject: CertificateSubject,
        expiration: i32,
    ) -> BloockResult<LocalCertificate<String>> {
        let params = LocalCertificateParams {
            key_type,
            subject,
            password,
            expiration,
        };

        LocalCertificate::new(&params)
            .map_err(|e| KeyError::GenerateLocalKeyError(e.to_string()).into())
    }

    pub fn load_local_certificate(
        &self,
        pkcs12: &[u8],
        password: String,
    ) -> BloockResult<LocalCertificate<String>> {
        LocalCertificate::load_pkcs12(pkcs12, &password)
            .map_err(|e| KeyError::LoadLocalCertificateError(e.to_string()).into())
    }

    pub async fn generate_managed_certificate(
        &self,
        key_type: KeyType,
        expiration: i32,
        subject: CertificateSubject,
    ) -> BloockResult<ManagedCertificate> {
        let params = ManagedCertificateParams {
            key_type,
            expiration,
            subject,
        };

        ManagedCertificate::new(
            &params,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
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
        )
        .await
        .map_err(|e| KeyError::ImportManagedCertificateError(e.to_string()).into())
    }

    pub async fn setup_totp_access_control(
        &self,
        key: &Managed,
    ) -> BloockResult<TotpAccessControlResult> {
        let totp_access_control = TotpAccessControl::new(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        );
        totp_access_control
            .setup(key)
            .await
            .map_err(|e| KeyError::SetupTOTPAccessControlError(e.to_string()).into())
    }

    pub async fn recover_totp_access_control(
        &self,
        key: &Managed,
        code: String,
    ) -> BloockResult<TotpAccessControlResult> {
        let otp_access_control = TotpAccessControl::new(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        );
        otp_access_control
            .recover(key, code)
            .await
            .map_err(|e| KeyError::RecoverTOTPAccessControlError(e.to_string()).into())
    }

    pub async fn setup_secret_access_control(
        &self,
        key: &Managed,
        secret: String,
        email: String,
    ) -> BloockResult<()> {
        let secret_access_control = SecretAccessControl::new(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        );
        secret_access_control
            .setup(key, secret, email)
            .await
            .map_err(|e| KeyError::SetupSecretAccessControlError(e.to_string()).into())
    }
}
