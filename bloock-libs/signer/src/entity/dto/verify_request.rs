use serde::Serialize;

#[derive(Serialize)]
pub struct VerifyRequest {
    pub public_key: String,
    pub algorithm: String,
    pub signature: String,
    pub payload: String,
}