use crate::items::{GetSignaturesRequest, SignRequest, SignatureCommonNameRequest, VerifyRequest};
use crate::{
    error::BridgeError,
    items::{
        Error, GetSignaturesResponse, SignResponse, SignatureCommonNameResponse, VerifyResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<SignRequest> for SignResponse {
    fn build_error(err: String) -> Self {
        Self {
            signature: None,
            error: Some(Error {
                kind: BridgeError::WebhookError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<VerifyRequest> for VerifyResponse {
    fn build_error(err: String) -> Self {
        Self {
            valid: false,
            error: Some(Error {
                kind: BridgeError::WebhookError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<SignatureCommonNameRequest> for SignatureCommonNameResponse {
    fn build_error(err: String) -> Self {
        Self {
            common_name: "".to_string(),
            error: Some(Error {
                kind: BridgeError::WebhookError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GetSignaturesRequest> for GetSignaturesResponse {
    fn build_error(err: String) -> Self {
        Self {
            signatures: vec![],
            error: Some(Error {
                kind: BridgeError::WebhookError.to_string(),
                message: err,
            }),
        }
    }
}
