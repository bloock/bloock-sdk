use serde::Deserialize;

#[derive(Clone, Deserialize)]
pub struct PublishHostedResponse {
    pub hash: String,
}
