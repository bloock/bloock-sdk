use crate::{entity::key::Managed, KeysError, Result};
use bloock_http::Client;
use serde::{Deserialize, Serialize};

pub struct TotpAccessControlResult {
    pub secret: String,
    pub secret_qr: String,
    pub recovery_codes: Vec<String>,
}

pub struct TotpAccessControl {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct SetupTotpAccessControlRequest {}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct SetupTotpAccessControlResponse {
    pub secret: String,
    pub secret_qr: String,
    pub recovery_code: Vec<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct RecoverTotpAccessControlRequest {
    pub recovery_code: String,
}

impl TotpAccessControl {
    pub fn new(api_host: String, api_key: String, environment: Option<String>) -> Self {
        Self {
            api_host,
            api_key,
            environment,
        }
    }

    pub async fn setup(&self, key: &Managed) -> Result<TotpAccessControlResult> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let client = bloock_http::BloockHttpClient::new(
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );

        let res: SetupTotpAccessControlResponse = client
            .post_json(
                format!("{}/keys/v1/keys/{}/access", self.api_host, managed.id),
                SetupTotpAccessControlRequest {},
                None,
            )
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(TotpAccessControlResult {
            secret: res.secret,
            secret_qr: res.secret_qr,
            recovery_codes: res.recovery_code,
        })
    }

    pub async fn recover(&self, key: &Managed, code: String) -> Result<TotpAccessControlResult> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let client = bloock_http::BloockHttpClient::new(
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );

        let res: SetupTotpAccessControlResponse = client
            .post_json(
                format!(
                    "{}/keys/v1/keys/{}/access/totp/recovery",
                    self.api_host, managed.id
                ),
                RecoverTotpAccessControlRequest {
                    recovery_code: code,
                },
                None,
            )
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(TotpAccessControlResult {
            secret: res.secret,
            secret_qr: res.secret_qr,
            recovery_codes: res.recovery_code,
        })
    }
}
