use crate::items::{PublishRequest, RetrieveRequest};
use crate::{
    error::BridgeError,
    items::{Error, PublishResponse, RetrieveResponse},
    server::response_types::ResponseTypeError,
};

impl ResponseTypeError<PublishRequest> for PublishResponse {
    fn build_error(err: String) -> Self {
        Self {
            id: "".to_string(),
            ipns_key: None,
            error: Some(Error {
                kind: BridgeError::AvailabilityError.to_string(),
                message: err,
            }),
        }
    }
}

impl ResponseTypeError<RetrieveRequest> for RetrieveResponse {
    fn build_error(err: String) -> Self {
        Self {
            record: None,
            error: Some(Error {
                kind: BridgeError::AvailabilityError.to_string(),
                message: err,
            }),
        }
    }
}
