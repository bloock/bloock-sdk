use super::Result;
use crate::infrastructure::InfrastructureError;
#[cfg(test)]
use mockall::automock;
use serde::de::DeserializeOwned;
use serde::Deserialize;
use serde::Serialize;

#[cfg_attr(test, automock)]
pub trait HttpClient {
    fn new(api_key: String) -> Self;
    fn get_api_key(&self) -> String;
    fn get<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
    fn post<U: ToString + 'static, B: Serialize + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
    fn request<T: DeserializeOwned + 'static>(
        &self,
        req: reqwest::blocking::RequestBuilder,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T>;
}

#[derive(Deserialize)]
struct ApiError {
    pub message: String,
}

pub struct HttpClientImpl {
    api_key: String,
}

impl HttpClient for HttpClientImpl {
    fn new(api_key: String) -> Self {
        Self { api_key: api_key }
    }
    fn get_api_key(&self) -> String {
        return self.api_key.clone();
    }
    fn get<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let client = reqwest::blocking::Client::new();
        let req = client.request(reqwest::Method::GET, url.to_string());
        self.request(req, headers)
    }

    fn post<U: ToString + 'static, B: Serialize + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let client = reqwest::blocking::Client::new();
        let mut req = client.request(reqwest::Method::POST, url.to_string());
        let bytes = serde_json::to_string(&body)
            .map_err(|e| InfrastructureError::SerializeError(e.to_string()))?;
        req = req.body(bytes);
        self.request(req, headers)
    }

    fn request<T: DeserializeOwned + 'static>(
        &self,
        mut req: reqwest::blocking::RequestBuilder,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        req = req.header("X-Api-Key", &self.api_key);
        if headers.is_some() {
            for header in headers.unwrap() {
                req = req.header(&header.0, header.1);
            }
        }

        let res = req.send()?;

        println!("{}", res.status());

        if res.status().is_success() {
            res.json().map_err(|e| InfrastructureError::ReqwestError(e))
        } else {
            let response: ApiError = res.json()?;
            return Err(InfrastructureError::HttpClientApiError(response.message));
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use std::collections::HashMap;

    #[test]
    fn test_http_client_get_api_key() {
        let client = HttpClientImpl::new(String::from("my_api_key"));

        assert_eq!(
            client.get_api_key(),
            "my_api_key",
            "Returning Err instead of Ok."
        );
    }

    #[test]
    fn test_http_client_get() {
        let client = HttpClientImpl::new(String::from("my-api-key"));
        let res: serde_json::Value = client.get("https://httpbin.org/get", None).unwrap();

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

    #[test]
    fn test_http_client_post() {
        let client = HttpClientImpl::new(String::from("my-api-key"));

        let mut body: HashMap<String, String> = HashMap::new();
        body.insert(String::from("hello"), String::from("world"));
        let res: serde_json::Value = client.post("https://httpbin.org/post", body, None).unwrap();

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
