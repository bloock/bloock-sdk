use serde::Serialize;

#[derive(Serialize)]
pub struct SignRequest {
    pub key_id: String,
    pub algorithm: String,
    pub payload: String,
    pub access_code: Option<String>,
}
