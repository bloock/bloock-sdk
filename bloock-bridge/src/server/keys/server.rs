use crate::{
    items::{
        GenerateLocalKeyRequest, GenerateLocalKeyResponse, GenerateManagedKeyRequest,
        GenerateManagedKeyResponse, KeyServiceHandler, LoadLocalKeyRequest, LoadLocalKeyResponse,
        LoadManagedKeyRequest, LoadManagedKeyResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::key;

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
}
