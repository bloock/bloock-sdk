use crate::{request::Request, response::Response, BlockchainError};
use bloock_http::Client;

pub struct Transport {}

impl Transport {
    pub async fn send_request<T: TryFrom<Response, Error = BlockchainError>>(
        provider: String,
        req: Request,
    ) -> Result<T, BlockchainError> {
        let client = bloock_http::HttpClient::new("".to_string());
        let res: Response = client
            .post(provider, req, None)
            .await
            .map_err(|e| BlockchainError::Web3Error(e.to_string()))?;

        T::try_from(res)
    }
}