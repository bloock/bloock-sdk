use serde::Serialize;
use thiserror::Error;

use crate::error::{BloockError, ErrorKind};

pub mod signature;

#[derive(Error, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum WebhookError {
    #[error("Invalid signature header")]
    InvalidSignatureHeader(),
    #[error("Invalid payload")]
    InvalidPayload(),
    #[error("Timestamp wasn't within tolerance")]
    TooOld(),
}

impl From<WebhookError> for BloockError {
    fn from(err: WebhookError) -> Self {
        Self(ErrorKind::Webhook(err))
    }
}
