use crate::items::{
    GetAnchorRequest, GetProofRequest, SendRecordsRequest, ValidateRootRequest, VerifyProofRequest,
    VerifyRecordsRequest, WaitAnchorRequest,
};
use crate::{
    error::BridgeError,
    items::{
        Error, GetAnchorResponse, GetProofResponse, SendRecordsResponse, ValidateRootResponse,
        VerifyProofResponse, VerifyRecordsResponse, WaitAnchorResponse,
    },
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<SendRecordsRequest> for SendRecordsResponse {
    fn build_error(err: String) -> Self {
        Self {
            records: vec![],
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<VerifyRecordsRequest> for VerifyRecordsResponse {
    fn build_error(err: String) -> Self {
        Self {
            timestamp: 0,
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<VerifyProofRequest> for VerifyProofResponse {
    fn build_error(err: String) -> Self {
        Self {
            record: None,
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<ValidateRootRequest> for ValidateRootResponse {
    fn build_error(err: String) -> Self {
        Self {
            timestamp: 0,
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}

// impl ResponseTypeEvent<GetProofRequest> for GetProofResponse {
//     fn get_event(request: &GetProofRequest) -> Value {
//         let hashes: Vec<String> = request.records.into_iter().map(|r| r.hash).collect();
//         json!({ "records": hashes })
//     }
// }

impl ResponseTypeError<GetProofRequest> for GetProofResponse {
    fn build_error(err: String) -> Self {
        Self {
            proof: None,
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<WaitAnchorRequest> for WaitAnchorResponse {
    fn build_error(err: String) -> Self {
        Self {
            anchor: None,
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<GetAnchorRequest> for GetAnchorResponse {
    fn build_error(err: String) -> Self {
        Self {
            anchor: None,
            error: Some(Error {
                kind: BridgeError::IntegrityError.to_string(),
                message: err,
            }),
        }
    }
}
