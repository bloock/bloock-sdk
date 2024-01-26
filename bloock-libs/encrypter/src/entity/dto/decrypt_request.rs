use serde::Serialize;

#[derive(Serialize)]
pub struct DecryptRequest {
    pub key_id: String,
    pub algorithm: String,
    pub cipher: String,
    pub access_code: Option<String>,
}
