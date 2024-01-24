use bloock_http::Client;
use serde::{Deserialize, Serialize};

use crate::{entity::key::Managed, KeysError, Result};

#[derive(Default)]
pub struct SecretAccessControl {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct SetupSecretAccessControlRequest {
    pub secret: String,
    pub email: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct SetupSecretAccessControlResponse {}

impl SecretAccessControl {
    pub fn new(api_host: String, api_key: String, environment: Option<String>) -> Self {
        Self {
            api_host,
            api_key,
            environment,
        }
    }

    pub async fn setup(&self, key: &Managed, secret: String, email: String) -> Result<()> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let client = bloock_http::BloockHttpClient::new(
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );

        let _: SetupSecretAccessControlResponse = client
            .post_json(
                format!("{}/keys/v1/keys/{}/access", self.api_host, managed.id),
                SetupSecretAccessControlRequest { secret, email },
                None,
            )
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(())
    }
}
