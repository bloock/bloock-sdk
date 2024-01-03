use crate::items::{DecryptRequest, EncryptRequest, EncryptionAlgRequest};
use crate::{
    error::BridgeError,
    items::{DecryptResponse, EncryptResponse, EncryptionAlgResponse, Error},
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<EncryptRequest> for EncryptResponse {
    fn build_error(err: String) -> Self {
        Self {
            record: None,
            error: Some(Error {
                kind: BridgeError::EncryptionError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<DecryptRequest> for DecryptResponse {
    fn build_error(err: String) -> Self {
        Self {
            record: None,
            error: Some(Error {
                kind: BridgeError::EncryptionError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<EncryptionAlgRequest> for EncryptionAlgResponse {
    fn build_error(err: String) -> Self {
        Self {
            alg: 0,
            error: Some(Error {
                kind: BridgeError::EncryptionError.to_string(),
                message: err,
            }),
        }
    }
}
