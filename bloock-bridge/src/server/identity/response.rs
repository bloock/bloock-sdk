use crate::{
    error::BridgeError,
    items::{
        BuildSchemaRequest, BuildSchemaResponse, CreateCredentialOfferRequest,
        CreateCredentialOfferResponse, CreateIdentityRequest, CreateIdentityResponse,
        CredentialFromJsonRequest, CredentialFromJsonResponse, CredentialOfferFromJsonRequest,
        CredentialOfferFromJsonResponse, CredentialOfferRedeemRequest,
        CredentialOfferRedeemResponse, CredentialOfferToJsonRequest, CredentialOfferToJsonResponse,
        CredentialToJsonRequest, CredentialToJsonResponse, Error, GetSchemaRequest,
        GetSchemaResponse, LoadIdentityRequest, LoadIdentityResponse, RevokeCredentialRequest,
        RevokeCredentialResponse, VerifyCredentialRequest, VerifyCredentialResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<CreateIdentityRequest> for CreateIdentityResponse {
    fn build_error(err: String) -> Self {
        Self {
            identity: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<LoadIdentityRequest> for LoadIdentityResponse {
    fn build_error(err: String) -> Self {
        Self {
            identity: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
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
                kind: BridgeError::KeysError.to_string(),
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
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CreateCredentialOfferRequest> for CreateCredentialOfferResponse {
    fn build_error(err: String) -> Self {
        Self {
            credential_offer: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CredentialOfferToJsonRequest> for CredentialOfferToJsonResponse {
    fn build_error(err: String) -> Self {
        Self {
            json: "".to_string(),
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CredentialOfferFromJsonRequest> for CredentialOfferFromJsonResponse {
    fn build_error(err: String) -> Self {
        Self {
            credential_offer: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<CredentialOfferRedeemRequest> for CredentialOfferRedeemResponse {
    fn build_error(err: String) -> Self {
        Self {
            credential: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
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
                kind: BridgeError::KeysError.to_string(),
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
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<VerifyCredentialRequest> for VerifyCredentialResponse {
    fn build_error(err: String) -> Self {
        Self {
            result: None,
            error: Some(Error {
                kind: BridgeError::KeysError.to_string(),
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
                kind: BridgeError::KeysError.to_string(),
                message: err,
            }),
        }
    }
}
