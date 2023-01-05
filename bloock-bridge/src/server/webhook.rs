use super::response_types::ResponseType;
use crate::items::Error;
use crate::{entity_mappings::config::map_config, error::config_data_error};
use crate::{
    error::BridgeError,
    items::{
        BloockServer, VerifyWebhookSignatureRequest, VerifyWebhookSignatureResponse,
        WebhookServiceHandler,
    },
};
use async_trait::async_trait;
use bloock_core::{
    client::{self, BloockClient},
    webhook::signature::verify_signature,
};
use serde_json::json;

impl From<VerifyWebhookSignatureResponse> for ResponseType {
    fn from(res: VerifyWebhookSignatureResponse) -> Self {
        ResponseType::VerifyWebhookSignature(res)
    }
}

pub struct WebhookServer {}

#[async_trait(?Send)]
impl WebhookServiceHandler for WebhookServer {
    async fn verify_webhook_signature(
        &self,
        req: VerifyWebhookSignatureRequest,
    ) -> VerifyWebhookSignatureResponse {
        let config_data = match map_config(req.config_data.clone()) {
            Ok(config) => config,
            Err(_) => {
                return VerifyWebhookSignatureResponse {
                    is_valid: false,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let result = verify_signature(
            &req.payload,
            &req.header,
            &req.secret_key,
            req.enforce_tolerance,
        );

        match result {
            Ok(is_valid) => {
                VerifyWebhookSignatureResponse::new_success(&client, &req, is_valid).await
            }
            Err(err) => {
                VerifyWebhookSignatureResponse::new_error(&client, err.to_string(), &req).await
            }
        }
    }
}

impl VerifyWebhookSignatureResponse {
    async fn new_success(
        client: &BloockClient,
        req: &VerifyWebhookSignatureRequest,
        is_valid: bool,
    ) -> VerifyWebhookSignatureResponse {
        Self::send_event(client, req, None).await;

        VerifyWebhookSignatureResponse {
            is_valid,
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &VerifyWebhookSignatureRequest,
    ) -> VerifyWebhookSignatureResponse {
        Self::send_event(client, req, Some(&err)).await;

        VerifyWebhookSignatureResponse {
            is_valid: false,
            error: Some(Error {
                kind: BridgeError::WebhookError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(
        client: &BloockClient,
        req: &VerifyWebhookSignatureRequest,
        error: Option<&str>,
    ) {
        let event_attr = json!({});

        let error = error.map(|_| BridgeError::AnchorError.to_string());

        client
            .send_event(
                BloockServer::WebhookServiceVerifyWebhookSignature.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}
