use serde::Deserialize;

#[derive(Clone, Deserialize)]
pub struct PublishIpfsResponse {
    pub hash: String,
}
