use crate::{entity::key::Managed, KeysError, Result};
use bloock_http::Client;
use serde::{Deserialize, Serialize};

pub struct OtpAccessControlResult {
    pub secret: String,
    pub secret_qr: String,
    pub recovery_codes: Vec<String>,
}

pub struct OtpAccessControl {
    api_host: String,
    api_key: String,
    environment: Option<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct SetupOtpAccessControlRequest {}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct SetupOtpAccessControlResponse {
    pub secret: String,
    pub secret_qr: String,
    pub recovery_codes: Vec<String>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct RecoverOtpAccessControlRequest {
    pub recovery_code: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
struct RecoverOtpAccessControlResponse {
    secret: String,
    secret_qr: String,
}

impl OtpAccessControl {
    pub fn new(api_host: String, api_key: String, environment: Option<String>) -> Self {
        Self {
            api_host,
            api_key,
            environment,
        }
    }

    pub async fn setup(&self, key: &Managed) -> Result<OtpAccessControlResult> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let client = bloock_http::BloockHttpClient::new(
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );

        let res: SetupOtpAccessControlResponse = client
            .post_json(
                format!("{}/keys/v1/keys/{}/access", self.api_host, managed.id),
                SetupOtpAccessControlRequest {},
                None,
            )
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(OtpAccessControlResult {
            secret: res.secret,
            secret_qr: res.secret_qr,
            recovery_codes: res.recovery_codes,
        })
    }

    pub async fn recover(&self, key: &Managed, code: String) -> Result<OtpAccessControlResult> {
        let managed = match key {
            Managed::Key(k) => k.clone(),
            Managed::Certificate(c) => c.key.clone(),
        };

        let client = bloock_http::BloockHttpClient::new(
            self.api_key.clone(),
            self.environment.clone(),
            None,
        );

        let res: SetupOtpAccessControlResponse = client
            .post_json(
                format!(
                    "{}/keys/v1/keys/{}/access/totp/recovery",
                    self.api_host, managed.id
                ),
                RecoverOtpAccessControlRequest {
                    recovery_code: code,
                },
                None,
            )
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(OtpAccessControlResult {
            secret: res.secret,
            secret_qr: res.secret_qr,
            recovery_codes: res.recovery_codes,
        })
    }
}
