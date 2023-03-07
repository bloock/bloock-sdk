use crate::{config::service::ConfigService, error::BloockResult};
use bloock_http::Client;
use bloock_keys::{
    local::{LocalKey, LocalKeyParams},
    managed::{ManagedKey, ManagedKeyParams, ProtectionLevel},
    KeyType,
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
        )
        .await
        .map_err(|e| KeyError::GenerateManagedKeyError(e.to_string()).into())
    }
}
