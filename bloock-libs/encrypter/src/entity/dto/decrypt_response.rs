use serde::Deserialize;

#[derive(Deserialize)]
pub struct DecryptResponse {
    pub payload: String,
}
