use serde::Deserialize;

#[derive(Clone, Deserialize)]
pub struct PublishIpnsResponse {
    pub id: String,
}
