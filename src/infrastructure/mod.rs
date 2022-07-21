use thiserror::Error as ThisError;

pub mod blockchain;
pub mod hashing;
pub mod http;

pub type Result<T> = std::result::Result<T, InfrastructureError>;

#[derive(ThisError, Debug)]
pub enum InfrastructureError {
    #[error("API connected by HttpClient found an error: {0}")]
    HttpClientApiError(String),
    #[error("Serialize error - {0}")]
    SerializeError(String),
    #[error("Reqwest error - {0}")]
    ReqwestError(#[from] reqwest::Error),
    #[error("Web3 error - {0}")]
    Web3Error(String),
}

#[cfg(test)]
pub fn configure_http_client_test() -> http::MockHttpClient {
    http::MockHttpClient::default()
}
