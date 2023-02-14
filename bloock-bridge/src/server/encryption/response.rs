use crate::items::{
    DecryptRequest, EncryptRequest, EncryptionAlgRequest, GenerateEciesKeyPairRequest,
    GenerateRsaKeyPairRequest,
};
use crate::{
    error::BridgeError,
    items::{
        DecryptResponse, EncryptResponse, EncryptionAlgResponse, Error,
        GenerateEciesKeyPairResponse, GenerateRsaKeyPairResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<GenerateRsaKeyPairRequest> for GenerateRsaKeyPairResponse {
    fn build_error(err: String) -> Self {
        Self {
            private_key: "".to_string(),
            public_key: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GenerateEciesKeyPairRequest> for GenerateEciesKeyPairResponse {
    fn build_error(err: String) -> Self {
        Self {
            private_key: "".to_string(),
            public_key: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<EncryptRequest> for EncryptResponse {
    fn build_error(err: String) -> Self {
        Self {
            record: None,
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
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
                kind: BridgeError::RecordError.to_string(),
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
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }
}
