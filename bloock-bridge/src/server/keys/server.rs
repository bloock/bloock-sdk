use crate::{
    items::{
        GenerateLocalKeyRequest, GenerateLocalKeyResponse, GenerateManagedKeyRequest,
        GenerateManagedKeyResponse, KeyProtectionLevel, KeyServiceHandler, KeyType, LocalKey,
        ManagedKey,
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

        let client = key::configure(config_data.clone());
        let key = client
            .generate_local_key(req.key_type().into())
            .map_err(|e| e.to_string())?;

        let key_type: KeyType = key.key_type.into();
        Ok(GenerateLocalKeyResponse {
            local_key: Some(LocalKey {
                key: key.key,
                key_type: key_type.into(),
                private_key: key.private_key,
            }),
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

        let key_protection: KeyProtectionLevel = key.protection.into();
        let key_type: KeyType = key.key_type.into();

        Ok(GenerateManagedKeyResponse {
            managed_key: Some(ManagedKey {
                key: key.public_key,
                protection: key_protection.into(),
                key_type: key_type.into(),
                name: key.name,
                expiration: key.expiration,
            }),
            error: None,
        })
    }
}
