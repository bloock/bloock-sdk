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

impl AnchorServiceHandler for AnchorServer {
    fn get_anchor(
        &self,
        req: crate::items::GetAnchorRequest,
    ) -> Result<GetAnchorResponse, BridgeError> {
        let config_data = match req.config_data {
            Some(config) => config,
            None => return Err(BridgeError::InvalidArgument),
        };
        let client = client::configure(map_config(config_data));
        let anchor = client.get_anchor(req.anchor_id);
        Ok(GetAnchorResponse {
            anchor: Some(map_anchor_core(anchor)),
            error: None,
        })
    }

    fn wait_anchor(&self, req: WaitAnchorRequest) -> WaitAnchorResponse {
        todo!()
    }
}

