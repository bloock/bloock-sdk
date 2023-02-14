use crate::items::{
    GetHashRequest, RecordBuilderFromBytesRequest, RecordBuilderFromFileRequest,
    RecordBuilderFromHexRequest, RecordBuilderFromJsonRequest, RecordBuilderFromLoaderRequest,
    RecordBuilderFromRecordRequest, RecordBuilderFromStringRequest, SetProofRequest,
};
use crate::{
    error::BridgeError,
    items::{Error, GetHashResponse, RecordBuilderResponse, SetProofResponse},
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<RecordBuilderFromBytesRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<RecordBuilderFromFileRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<RecordBuilderFromHexRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<RecordBuilderFromJsonRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<RecordBuilderFromLoaderRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<RecordBuilderFromRecordRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<RecordBuilderFromStringRequest> for RecordBuilderResponse {
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

impl ResponseTypeError<GetHashRequest> for GetHashResponse {
    fn build_error(err: String) -> Self {
        Self {
            hash: "".to_string(),
            error: Some(Error {
                kind: BridgeError::RecordError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<SetProofRequest> for SetProofResponse {
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
