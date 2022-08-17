use super::Result;
use crate::Client;
use crate::HttpError;
use async_trait::async_trait;
use serde::de::DeserializeOwned;
use serde::Deserialize;
use serde::Serialize;

#[derive(Deserialize)]
struct ApiError {
    pub message: String,
}

pub struct HttpClientImpl {
    api_key: String,
}

#[async_trait(?Send)]
impl Client for HttpClientImpl {
    fn new(api_key: String) -> Self {
        Self { api_key: api_key }
    }
    fn get_api_key(&self) -> String {
        return self.api_key.clone();
    }
    async fn get<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let client = reqwest::Client::new();
        let req = client.request(reqwest::Method::GET, url.to_string());
        self.request(req, headers).await
    }

    async fn post<U: ToString + 'static, B: Serialize + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let client = reqwest::Client::new();
        let mut req = client.request(reqwest::Method::POST, url.to_string());
        let bytes =
            serde_json::to_string(&body).map_err(|e| HttpError::SerializeError(e.to_string()))?;
        req = req.body(bytes);
        self.request(req, headers).await
    }
}

impl HttpClientImpl {
    async fn request<T: DeserializeOwned + 'static>(
        &self,
        mut req: reqwest::RequestBuilder,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        req = req.header("X-Api-Key", &self.api_key);
        if headers.is_some() {
            for header in headers.unwrap() {
                req = req.header(&header.0, header.1);
            }
        }

        let res = req
            .send()
            .await
            .map_err(|e| HttpError::RequestError(e.to_string()))?;

        if res.status().is_success() {
            res.json()
                .await
                .map_err(|e| HttpError::DeserializeError(e.to_string()))
        } else {
            let response: ApiError = res
                .json()
                .await
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;
            return Err(HttpError::HttpClientError(response.message));
        }
    }
}

#[cfg(test)]
#[cfg(not(feature = "wasm"))]
mod tests {
    use super::*;
    use crate::HttpClient;
    use std::collections::HashMap;

    #[tokio::test]
    async fn test_http_client_get_api_key() {
        let client = HttpClient::new(String::from("my_api_key"));

        assert_eq!(
            client.get_api_key(),
            "my_api_key",
            "Returning Err instead of Ok."
        );
    }

    #[tokio::test]
    async fn test_http_client_get() {
        let client = HttpClient::new(String::from("my-api-key"));
        let res: serde_json::Value = client.get("https://httpbin.org/get", None).await.unwrap();

        assert_eq!(
            res.get("headers")
                .unwrap()
                .get("X-Api-Key")
                .unwrap()
                .as_str()
                .unwrap(),
            "my-api-key",
            "HTTP Get not returning valid auth header."
        );
    }

    #[tokio::test]
    async fn test_http_client_post() {
        let client = HttpClient::new(String::from("my-api-key"));

        let mut body: HashMap<String, String> = HashMap::new();
        body.insert(String::from("hello"), String::from("world"));
        let res: serde_json::Value = client
            .post("https://httpbin.org/post", body, None)
            .await
            .unwrap();

        assert_eq!(
            res.get("headers")
                .unwrap()
                .get("X-Api-Key")
                .unwrap()
                .as_str()
                .unwrap(),
            "my-api-key",
            "HTTP Get not returning valid auth header."
        );

        assert_eq!(
            res.get("json")
                .unwrap()
                .get("hello")
                .unwrap()
                .as_str()
                .unwrap(),
            "world",
            "HTTP Post not returning valid body."
        );
    }
}
