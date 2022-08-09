use async_trait::async_trait;
use bloock_core::client;

use crate::{
    entity_mappings::{anchor::map_anchor_core, config::map_config},
    items::{
        AnchorServiceHandler, Error, GetAnchorResponse, WaitAnchorRequest, WaitAnchorResponse,
    }, error::BridgeError,
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
            Some(config) => config,
            None => {
                return GetAnchorResponse {
                    anchor: None,
                    error: Some(Error {
                        kind: BridgeError::InvalidArgument.to_string(),
                        message: "Missing config data".to_string(),
                    }),
                }
            }
        };
        let client = client::configure(map_config(config_data));
        let anchor = client.get_anchor(req.anchor_id).await;
        GetAnchorResponse {
            anchor: Some(map_anchor_core(anchor.unwrap())),
            error: None,
        }
    }

    async fn wait_anchor(&self, req: WaitAnchorRequest) -> WaitAnchorResponse {
        let config_data = match req.config_data {
            Some(config) => config,
            None => {
                return WaitAnchorResponse {
                    anchor: None,
                    error: Some(Error {
                        kind: BridgeError::InvalidArgument.to_string(),
                        message: "Missing config data".to_string(),
                    }),
                }
            }
        };
        let client = client::configure(map_config(config_data));
        let anchor = client.get_anchor(req.anchor_id).await;
        WaitAnchorResponse {
            anchor: Some(map_anchor_core(anchor.unwrap())),
            error: None,
        }
    }
}
