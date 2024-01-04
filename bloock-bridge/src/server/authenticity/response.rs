use crate::items::{GetSignaturesRequest, SignRequest, VerifyRequest};
use crate::{
    error::BridgeError,
    items::{Error, GetSignaturesResponse, SignResponse, VerifyResponse},
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<SignRequest> for SignResponse {
    fn build_error(err: String) -> Self {
        Self {
            signature: None,
            error: Some(Error {
                kind: BridgeError::AuthenticityError.to_string(),
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
                kind: BridgeError::AuthenticityError.to_string(),
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
                kind: BridgeError::AuthenticityError.to_string(),
                message: err,
            }),
        }
    }
}
