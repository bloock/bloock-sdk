use crate::{request::Request, response::Response, BlockchainError};
use bloock_http::Client;

pub struct Transport {}

impl Transport {
    pub async fn send_request(
        provider: String,
        req: Request,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Vec<u8>, BlockchainError> {
        let client = bloock_http::BloockHttpClient::new(api_key, environment);
        let res: Response = client
            .post_json(provider, req, None)
            .await
            .map_err(|e| BlockchainError::Web3Error(e.to_string()))?;

        let value = res.result.strip_prefix("0x").ok_or_else(|| {
            BlockchainError::Web3Error("Invalid hex response received".to_string())
        })?;

        hex::decode(value)
            .map_err(|_| BlockchainError::Web3Error("Invalid hex response received".to_string()))
    }
}
