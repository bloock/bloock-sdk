use std::vec;

use crate::{
    error::BridgeError,
    items::{
        BuildSchemaRequest, BuildSchemaResponse, CreateCredentialRequest, CreateCredentialResponse,
        CreateHolderRequest, CreateHolderResponse, CreateIssuerRequest, CreateIssuerResponse,
        CreateVerificationRequest, CreateVerificationResponse, CredentialFromJsonRequest,
        CredentialFromJsonResponse, CredentialToJsonRequest, CredentialToJsonResponse, Error,
        ForcePublishIssuerStateRequest, ForcePublishIssuerStateResponse, GetCredentialProofRequest,
        GetCredentialProofResponse, GetSchemaRequest, GetSchemaResponse,
        GetVerificationStatusRequest, GetVerificationStatusResponse, ImportIssuerRequest,
        ImportIssuerResponse, RevokeCredentialRequest, RevokeCredentialResponse,
        WaitVerificationRequest, WaitVerificationResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<CreateCredentialRequest> for CreateCredentialResponse {
    fn build_error(err: String) -> Self {
        Self {
            credential_receipt: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CreateHolderRequest> for CreateHolderResponse {
    fn build_error(err: String) -> Self {
        Self {
            did: "".to_string(),
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CreateIssuerRequest> for CreateIssuerResponse {
    fn build_error(err: String) -> Self {
        Self {
            did: "".to_string(),
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<BuildSchemaRequest> for BuildSchemaResponse {
    fn build_error(err: String) -> Self {
        Self {
            schema: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<ForcePublishIssuerStateRequest> for ForcePublishIssuerStateResponse {
    fn build_error(err: String) -> Self {
        Self {
            state_receipt: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<RevokeCredentialRequest> for RevokeCredentialResponse {
    fn build_error(err: String) -> Self {
        Self {
            result: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CredentialToJsonRequest> for CredentialToJsonResponse {
    fn build_error(err: String) -> Self {
        Self {
            json: "".to_string(),
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CredentialFromJsonRequest> for CredentialFromJsonResponse {
    fn build_error(err: String) -> Self {
        Self {
            credential: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GetCredentialProofRequest> for GetCredentialProofResponse {
    fn build_error(err: String) -> Self {
        Self {
            proof: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<ImportIssuerRequest> for ImportIssuerResponse {
    fn build_error(err: String) -> Self {
        Self {
            did: "".to_string(),
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GetSchemaRequest> for GetSchemaResponse {
    fn build_error(err: String) -> Self {
        Self {
            schema: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CreateVerificationRequest> for CreateVerificationResponse {
    fn build_error(err: String) -> Self {
        Self {
            result: None,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<WaitVerificationRequest> for WaitVerificationResponse {
    fn build_error(err: String) -> Self {
        Self {
            status: false,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GetVerificationStatusRequest> for GetVerificationStatusResponse {
    fn build_error(err: String) -> Self {
        Self {
            status: false,
            error: Some(Error {
                kind: BridgeError::IdentityError.to_string(),
                message: err,
            }),
        }
    }
}
