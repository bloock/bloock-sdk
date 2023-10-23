use crate::{
    items::{
        GenerateLocalCertificateRequest, GenerateLocalCertificateResponse, GenerateLocalKeyRequest,
        GenerateLocalKeyResponse, GenerateManagedCertificateRequest,
        GenerateManagedCertificateResponse, GenerateManagedKeyRequest, GenerateManagedKeyResponse,
        ImportManagedCertificateRequest, ImportManagedCertificateResponse, KeyServiceHandler,
        LoadLocalCertificateRequest, LoadLocalCertificateResponse, LoadLocalKeyRequest,
        LoadLocalKeyResponse, LoadManagedCertificateRequest, LoadManagedCertificateResponse,
        LoadManagedKeyRequest, LoadManagedKeyResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::key;
use bloock_keys::CertificateType;

pub struct KeyServer {}

#[async_trait(?Send)]
impl KeyServiceHandler for KeyServer {
    async fn generate_local_key(
        &self,
        req: &GenerateLocalKeyRequest,
    ) -> Result<GenerateLocalKeyResponse, String> {
        let config_data = req.get_config_data()?;

        let client = key::configure(config_data);
        let key = client
            .generate_local_key(req.key_type().into())
            .map_err(|e| e.to_string())?;

        Ok(GenerateLocalKeyResponse {
            local_key: Some(key.into()),
            error: None,
        })
    }

    async fn generate_managed_key(
        &self,
        req: &GenerateManagedKeyRequest,
    ) -> Result<GenerateManagedKeyResponse, String> {
        let config_data = req.get_config_data()?;

        let params = req
            .params
            .clone()
            .ok_or_else(|| "invalid params".to_string())?;

        let client = key::configure(config_data.clone());
        let key = client
            .generate_managed_key(
                params.name.clone(),
                params.key_type().into(),
                params.protection().into(),
                params.expiration,
            )
            .await
            .map_err(|e| e.to_string())?;

        Ok(GenerateManagedKeyResponse {
            managed_key: Some(key.into()),
            error: None,
        })
    }

    async fn load_local_key(
        &self,
        req: &LoadLocalKeyRequest,
    ) -> Result<LoadLocalKeyResponse, String> {
        let config_data = req.get_config_data()?;

        let client = key::configure(config_data);
        let key = client
            .load_local_key(
                req.key_type().into(),
                req.key.clone(),
                req.private_key.clone(),
            )
            .map_err(|e| e.to_string())?;

        Ok(LoadLocalKeyResponse {
            local_key: Some(key.into()),
            error: None,
        })
    }

    async fn load_managed_key(
        &self,
        req: &LoadManagedKeyRequest,
    ) -> Result<LoadManagedKeyResponse, String> {
        let config_data = req.get_config_data()?;

        let client = key::configure(config_data.clone());
        let key = client
            .load_managed_key(req.id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(LoadManagedKeyResponse {
            managed_key: Some(key.into()),
            error: None,
        })
    }

    async fn generate_local_certificate(
        &self,
        req: &GenerateLocalCertificateRequest,
    ) -> Result<GenerateLocalCertificateResponse, String> {
        let config_data = req.get_config_data()?;

        let client = key::configure(config_data);

        let params = req
            .params
            .clone()
            .ok_or_else(|| "invalid params".to_string())?;

        let subject = params
            .subject
            .clone()
            .ok_or_else(|| "invalid subject".to_string())?;

        let certificate = client
            .generate_local_certificate(
                params.key_type().into(),
                params.password,
                subject.into(),
                params.expiration,
            )
            .map_err(|e| e.to_string())?;

        Ok(GenerateLocalCertificateResponse {
            local_certificate: Some(certificate.into()),
            error: None,
        })
    }

    async fn generate_managed_certificate(
        &self,
        req: &GenerateManagedCertificateRequest,
    ) -> Result<GenerateManagedCertificateResponse, String> {
        let config_data = req.get_config_data()?;

        let params = req
            .params
            .clone()
            .ok_or_else(|| "invalid params".to_string())?;

        let subject = params
            .subject
            .clone()
            .ok_or_else(|| "invalid subject".to_string())?;

        let client = key::configure(config_data.clone());

        let certificate = client
            .generate_managed_certificate(
                params.key_type().into(),
                params.expiration,
                subject.into(),
            )
            .await
            .map_err(|e| e.to_string())?;

        Ok(GenerateManagedCertificateResponse {
            managed_certificate: Some(certificate.into()),
            error: None,
        })
    }

    async fn load_local_certificate(
        &self,
        req: &LoadLocalCertificateRequest,
    ) -> Result<LoadLocalCertificateResponse, String> {
        let config_data = req.clone().get_config_data()?;

        let client = key::configure(config_data);

        let certificate = client
            .load_local_certificate(&req.pkcs12, req.password.clone())
            .map_err(|e| e.to_string())?;

        Ok(LoadLocalCertificateResponse {
            local_certificate: Some(certificate.into()),
            error: None,
        })
    }

    async fn load_managed_certificate(
        &self,
        req: &LoadManagedCertificateRequest,
    ) -> Result<LoadManagedCertificateResponse, String> {
        let config_data = req.get_config_data()?;

        let client = key::configure(config_data.clone());

        let certificate = client
            .load_managed_certificate(req.id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(LoadManagedCertificateResponse {
            managed_certificate: Some(certificate.into()),
            error: None,
        })
    }

    async fn import_managed_certificate(
        &self,
        req: &ImportManagedCertificateRequest,
    ) -> Result<ImportManagedCertificateResponse, String> {
        let config_data = req.get_config_data()?;

        let client = key::configure(config_data.clone());

        let certificate_type: CertificateType = req.certificate_type().into();

        let certificate = client
            .import_managed_certificate(
                req.certificate.clone(),
                req.password.clone(),
                certificate_type,
            )
            .await
            .map_err(|e| e.to_string())?;

        Ok(ImportManagedCertificateResponse {
            managed_certificate: Some(certificate.into()),
            error: None,
        })
    }
}
