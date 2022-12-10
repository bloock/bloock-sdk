use async_trait::async_trait;
use bloock_core::client::{self, BloockClient};
use serde_json::json;

use crate::{
    entity_mappings::config::map_config,
    error::{config_data_error, BridgeError},
    items::{
        Anchor, AnchorServiceHandler, BloockServer, Error, GetAnchorRequest, GetAnchorResponse,
        WaitAnchorRequest, WaitAnchorResponse,
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
        let config_data = match map_config(req.config_data.clone()) {
            Ok(config) => config,
            Err(_) => {
                return GetAnchorResponse {
                    anchor: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);

        let anchor = match client.get_anchor(req.anchor_id).await {
            Ok(a) => a,
            Err(e) => {
                return GetAnchorResponse::new_error(&client, e.to_string(), &req).await;
            }
        };

        GetAnchorResponse::new_success(&client, anchor.into(), &req).await
    }

    async fn wait_anchor(&self, req: WaitAnchorRequest) -> WaitAnchorResponse {
        let config_data = match map_config(req.config_data.clone()) {
            Ok(config) => config,
            Err(_) => {
                return WaitAnchorResponse {
                    anchor: None,
                    error: Some(config_data_error()),
                }
            }
        };

        let client = client::configure(config_data);
        let anchor = match client.wait_anchor(req.anchor_id, req.timeout).await {
            Ok(anchor) => anchor,
            Err(e) => return WaitAnchorResponse::new_error(&client, e.to_string(), &req).await,
        };

        WaitAnchorResponse::new_success(&client, anchor.into(), &req).await
    }
}

impl GetAnchorResponse {
    async fn new_success(
        client: &BloockClient,
        anchor: Anchor,
        req: &GetAnchorRequest,
    ) -> GetAnchorResponse {
        Self::send_event(client, req, None).await;

        GetAnchorResponse {
            anchor: Some(anchor),
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &GetAnchorRequest,
    ) -> GetAnchorResponse {
        Self::send_event(client, req, Some(&err)).await;

        GetAnchorResponse {
            anchor: None,
            error: Some(Error {
                kind: BridgeError::AnchorError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, req: &GetAnchorRequest, error: Option<&str>) {
        let event_attr = json! ({
            "anchor_id": req.anchor_id
        });

        let error = error.map(|_| BridgeError::AnchorError.to_string());

        client
            .send_event(
                BloockServer::AnchorServiceGetAnchor.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}

impl WaitAnchorResponse {
    async fn new_success(
        client: &BloockClient,
        anchor: Anchor,
        req: &WaitAnchorRequest,
    ) -> WaitAnchorResponse {
        Self::send_event(client, req, None).await;

        WaitAnchorResponse {
            anchor: Some(anchor),
            error: None,
        }
    }

    async fn new_error(
        client: &BloockClient,
        err: String,
        req: &WaitAnchorRequest,
    ) -> WaitAnchorResponse {
        Self::send_event(client, req, Some(&err)).await;

        WaitAnchorResponse {
            anchor: None,
            error: Some(Error {
                kind: BridgeError::AnchorError.to_string(),
                message: err,
            }),
        }
    }

    async fn send_event(client: &BloockClient, req: &WaitAnchorRequest, error: Option<&str>) {
        let event_attr = json! ({
            "anchor_id": req.anchor_id
        });

        let error = error.map(|_| BridgeError::AnchorError.to_string());

        client
            .send_event(
                BloockServer::AnchorServiceWaitAnchor.as_str(),
                error,
                Some(event_attr),
            )
            .await;
    }
}
