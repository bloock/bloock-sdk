use crate::{
    error::BridgeError,
    items::{
        Error, GenerateLocalKeyRequest, GenerateLocalKeyResponse, GenerateManagedKeyRequest,
        GenerateManagedKeyResponse, LoadLocalKeyRequest, LoadLocalKeyResponse,
        LoadManagedKeyRequest, LoadManagedKeyResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<GenerateLocalKeyRequest> for GenerateLocalKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            local_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GenerateManagedKeyRequest> for GenerateManagedKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadLocalKeyRequest> for LoadLocalKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            local_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadManagedKeyRequest> for LoadManagedKeyResponse {
    fn build_error(err: String) -> Self {
        Self {
            managed_key: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}
