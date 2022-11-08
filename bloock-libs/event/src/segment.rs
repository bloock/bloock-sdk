use crate::{EventError, EventLayer, Result};
use async_trait::async_trait;
use bloock_http::{Client, SimpleHttpClient};
use serde::{Deserialize, Serialize};
use serde_json::Value;
use uuid::Uuid;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
struct EventRequest {
    #[serde(rename = "userId")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub user_id: Option<String>,
    #[serde(rename = "anonymousId")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub anonymous_id: Option<String>,
    pub event: String,
    pub properties: Value,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
struct EventResponse {
    pub success: bool,
}

pub struct SegmentLayer {
    key: String,
}

impl SegmentLayer {
    pub fn new(key: &str) -> Self {
        SegmentLayer {
            key: key.to_owned(),
        }
    }
}

#[async_trait(?Send)]
impl EventLayer for SegmentLayer {
    async fn push(&self, id: &str, params: Value) -> Result<()> {
        let client = SimpleHttpClient::new();

        let auth = format!("{}:", self.key);

        let headers = vec![(
            "Authorization".to_owned(),
            format!("Basic {}", base64::encode(&auth)),
        )];

        let body: EventRequest = EventRequest {
            user_id: None,
            anonymous_id: Some(Uuid::new_v4().to_string()),
            event: id.to_owned(),
            properties: params,
        };

        let _: EventResponse = client
            .post_json(
                "https://api.segment.io/v1/track".to_owned(),
                body,
                Some(headers),
            )
            .await
            .map_err(|_| EventError::PushError())?;

        Ok(())
    }
}
