use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

use crate::event::entity::event::Event;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct EventRequest {
    #[serde(rename = "userId")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub user_id: Option<String>,
    #[serde(rename = "anonymousId")]
    #[serde(skip_serializing_if = "Option::is_none")]
    pub anonymous_id: Option<String>,
    pub event: String,
    pub properties: Value,
    pub context: Value,
}

impl EventRequest {
    pub fn new(event: Event) -> Self {
        EventRequest {
            user_id: Some(event.user_id),
            anonymous_id: None,
            event: event.name,
            properties: event.properties,
            context: json!({
                "direct": true,
                "library": {
                    "name": event.library.name,
                    "version": event.library.version,
                },
                "os": {
                    "name": event.os.name
                }
            }),
        }
    }
}
