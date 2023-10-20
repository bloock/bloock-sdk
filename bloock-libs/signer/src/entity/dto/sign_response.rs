use serde::Deserialize;

#[derive(Deserialize)]
pub struct SignResponse {
    pub signature: String,
}