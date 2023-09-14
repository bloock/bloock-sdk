#[macro_use]
mod cfg;

use async_trait::async_trait;
#[cfg(any(test, feature = "testing"))]
use mockall::automock;
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use thiserror::Error as ThisError;

mod bloock_http;
pub use crate::bloock_http::BloockHttpClient;

cfg_default! {
    mod hyper_http;
    pub use hyper_http::SimpleHttpClient;
}

cfg_wasm! {
    mod wasm_http;
    use wasm_http::JsError;
    pub use wasm_http::SimpleHttpClient;
}

pub type Result<T> = std::result::Result<T, HttpError>;

#[cfg_attr(any(test, feature = "testing"), automock)]
#[async_trait]
pub trait Client {
    async fn get<U: ToString + Send + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>>;
    async fn get_json<U: ToString + Send + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
    async fn post<U: ToString + Send + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: &[u8],
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
    async fn post_json<
        U: ToString + Send + 'static,
        B: Serialize + Send + 'static,
        T: DeserializeOwned + Send + 'static,
    >(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
    async fn post_file<U: ToString + Send + 'static, T: DeserializeOwned + Send + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        texts: Vec<(String, String)>,
        filename: Option<String>,
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
    #[error("Couldn't write form data to request")]
    WriteFormDataError(),
    #[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
    #[error("Javascript error - {0}")]
    JsError(JsError),
}
