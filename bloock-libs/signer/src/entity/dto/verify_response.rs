use serde::Deserialize;

#[derive(Deserialize)]
pub struct VerifyResponse {
    pub verify: bool,
}