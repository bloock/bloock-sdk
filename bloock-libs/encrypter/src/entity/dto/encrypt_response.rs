use serde::Deserialize;

#[derive(Deserialize)]
pub struct EncryptResponse {
    pub cipher: String,
}
