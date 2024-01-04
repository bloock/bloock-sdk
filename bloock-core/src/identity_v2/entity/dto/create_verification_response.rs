use serde::{Deserialize, Serialize};
use serde_json::Value;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CreateVerificationResponse {
    pub id: String,
    pub typ: String,
    #[serde(rename = "type")]
    pub request_type: String,
    pub thid: String,
    pub body: Body,
    pub from: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct Body {
    #[serde(rename = "callbackUrl")]
    pub callback_url: String,
    pub reason: String,
    pub scope: Value,
}
