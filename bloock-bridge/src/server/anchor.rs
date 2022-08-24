use async_trait::async_trait;
use bloock_core::client;

use crate::{
    entity_mappings::{anchor::map_anchor_core, config::map_config},
    error::BridgeError,
    items::{
        AnchorServiceHandler, Error, GetAnchorResponse, WaitAnchorRequest, WaitAnchorResponse,
    },
};

use super::response_types::ResponseType;

impl From<GetAnchorResponse> for ResponseType {
    fn from(res: GetAnchorResponse) -> Self {
        ResponseType::GetAnchor(res)
    }
}

impl From<WaitAnchorResponse> for ResponseType {
    fn from(res: WaitAnchorResponse) -> Self {
        ResponseType::WaitAnchor(res)
    }
}

pub struct AnchorServer {}

#[async_trait(?Send)]
impl AnchorServiceHandler for AnchorServer {
    async fn get_anchor(&self, req: crate::items::GetAnchorRequest) -> GetAnchorResponse {
        let config_data = match req.config_data {
            Some(config) => match map_config(config) {
                Ok(config) => config,
                Err(_) => {
                    return GetAnchorResponse {
                        anchor: None,
                        error: Some(invalid_config_data_error()),
                    }
                }
            },
            None => {
                return GetAnchorResponse {
                    anchor: None,
                    error: Some(invalid_config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let anchor = match client.get_anchor(req.anchor_id).await {
            Ok(config) => config,
            Err(e) => {
                return GetAnchorResponse {
                    anchor: None,
                    error: Some(Error {
                        kind: BridgeError::InfrastructureError.to_string(),
                        message: e.to_string(),
                    }),
                };
            }
        };
        GetAnchorResponse {
            anchor: Some(map_anchor_core(anchor)),
            error: None,
        }
    }

    async fn wait_anchor(&self, req: WaitAnchorRequest) -> WaitAnchorResponse {
        let config_data = match req.config_data {
            Some(config) => match map_config(config) {
                Ok(config) => config,
                Err(_) => {
                    return WaitAnchorResponse {
                        anchor: None,
                        error: Some(invalid_config_data_error()),
                    }
                }
            },
            None => {
                return WaitAnchorResponse {
                    anchor: None,
                    error: Some(invalid_config_data_error()),
                }
            }
        };
        let client = client::configure(config_data);
        let anchor = match client.wait_anchor(req.anchor_id, req.timeout).await {
            Ok(anchor) => anchor,
            Err(e) => {
                return WaitAnchorResponse {
                    anchor: None,
                    error: Some(Error {
                        kind: BridgeError::InfrastructureError.to_string(),
                        message: e.to_string(),
                    }),
                };
            }
        };
        WaitAnchorResponse {
            anchor: Some(map_anchor_core(anchor)),
            error: None,
        }
    }
}

fn invalid_config_data_error() -> Error {
    Error {
        kind: BridgeError::InvalidArgument.to_string(),
        message: "Invalid config data".to_string(),
    }
}
