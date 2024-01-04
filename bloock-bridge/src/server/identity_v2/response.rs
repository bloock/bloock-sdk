use std::vec;

use crate::{
    error::BridgeError,
    items::{
        BuildSchemaRequestV2, BuildSchemaResponseV2, CreateCredentialRequestV2,
        CreateCredentialResponseV2, CreateIdentityV2Request, CreateIdentityV2Response,
        CreateIssuerRequest, CreateIssuerResponse, CreateVerificationRequest,
        CreateVerificationResponse, CredentialFromJsonRequestV2, CredentialFromJsonResponseV2,
        CredentialToJsonRequestV2, CredentialToJsonResponseV2, Error, GetCredentialProofRequest,
        GetCredentialProofResponse, GetIssuerByKeyRequest, GetIssuerByKeyResponse,
        GetSchemaRequestV2, GetSchemaResponseV2, GetVerificationStatusRequest,
        GetVerificationStatusResponse, PublishIssuerStateRequest, PublishIssuerStateResponse,
        RevokeCredentialRequestV2, RevokeCredentialResponseV2, WaitVerificationRequest,
        WaitVerificationResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<CreateCredentialRequestV2> for CreateCredentialResponseV2 {
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

impl ResponseTypeError<CreateIdentityV2Request> for CreateIdentityV2Response {
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

impl ResponseTypeError<BuildSchemaRequestV2> for BuildSchemaResponseV2 {
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

impl ResponseTypeError<PublishIssuerStateRequest> for PublishIssuerStateResponse {
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

impl ResponseTypeError<RevokeCredentialRequestV2> for RevokeCredentialResponseV2 {
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

impl ResponseTypeError<CredentialToJsonRequestV2> for CredentialToJsonResponseV2 {
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

impl ResponseTypeError<CredentialFromJsonRequestV2> for CredentialFromJsonResponseV2 {
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

impl ResponseTypeError<GetIssuerByKeyRequest> for GetIssuerByKeyResponse {
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

impl ResponseTypeError<GetSchemaRequestV2> for GetSchemaResponseV2 {
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
