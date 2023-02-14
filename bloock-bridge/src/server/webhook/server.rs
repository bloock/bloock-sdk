use crate::items::Error;
use crate::server::response_types::ResponseTypeError;
use crate::{
    error::BridgeError,
    items::{VerifyWebhookSignatureRequest, VerifyWebhookSignatureResponse, WebhookServiceHandler},
};
use async_trait::async_trait;
use bloock_core::webhook::signature::verify_signature;

pub struct WebhookServer {}

#[async_trait(?Send)]
impl WebhookServiceHandler for WebhookServer {
    async fn verify_webhook_signature(
        &self,
        req: &VerifyWebhookSignatureRequest,
    ) -> Result<VerifyWebhookSignatureResponse, String> {
        let is_valid = verify_signature(
            &req.payload,
            &req.header,
            &req.secret_key,
            req.enforce_tolerance,
        )
        .map_err(|e| e.to_string())?;

        Ok(VerifyWebhookSignatureResponse {
            is_valid,
            error: None,
        })
    }
}

impl ResponseTypeError<VerifyWebhookSignatureRequest> for VerifyWebhookSignatureResponse {
    fn build_error(err: String) -> Self {
        Self {
            is_valid: false,
            error: Some(Error {
                kind: BridgeError::WebhookError.to_string(),
                message: err,
            }),
        }
    }
}
