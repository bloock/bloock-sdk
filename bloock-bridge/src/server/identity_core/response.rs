use crate::{
    error::BridgeError,
    items::{CreateCoreCredentialRequest, CreateCoreCredentialResponse, Error},
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<CreateCoreCredentialRequest> for CreateCoreCredentialResponse {
    fn build_error(err: String) -> Self {
        Self {
            credential_receipt: None,
            error: Some(Error {
                kind: BridgeError::IdentityCoreError.to_string(),
                message: err,
            }),
        }
    }
}
