#[macro_use]
mod cfg;

use async_trait::async_trait;
#[cfg(any(test, feature = "testing"))]
use mockall::automock;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use thiserror::Error as ThisError;

cfg_default! {
    mod hyper_http;
    pub use hyper_http::HttpClientImpl as HttpClient;
}

cfg_wasm! {
    mod wasm_http;
    pub use wasm_http::HttpClientImpl as HttpClient;
    use wasm_http::JsError;
}

pub type Result<T> = std::result::Result<T, HttpError>;

#[cfg_attr(any(test, feature = "testing"), automock)]
#[async_trait(?Send)]
pub trait Client {
    fn new(api_key: String) -> Self;
    fn get_api_key(&self) -> String;
    async fn get<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
    async fn post<U: ToString + 'static, B: Serialize + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
}

#[derive(Deserialize)]
struct ApiError {
    pub message: String,
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum HttpError {
    #[error("API connected by HttpClient found an error: {0}")]
    HttpClientError(String),
    #[error("Serialize error - {0}")]
    SerializeError(String),
    #[error("Deserialize error - {0}")]
    DeserializeError(String),
    #[error("Request error - {0}")]
    RequestError(String),
    #[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
    #[error("Javascript error - {0}")]
    JsError(JsError),
}
