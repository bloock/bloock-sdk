use super::Result;
use crate::ApiError;
use crate::Client;
use crate::HttpError;
use async_trait::async_trait;
use serde::de::DeserializeOwned;
use serde::Serialize;

pub struct SimpleHttpClient {}

#[async_trait(?Send)]
impl Client for SimpleHttpClient {
    async fn get<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let req = ureq::get(&url.to_string());
        self.request(req, None, headers).await
    }

    async fn post<U: ToString + 'static, B: Serialize + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let bytes =
            serde_json::to_string(&body).map_err(|e| HttpError::SerializeError(e.to_string()))?;
        let req = ureq::post(&url.to_string());
        self.request(req, Some(bytes), headers).await
    }
}

impl SimpleHttpClient {
    pub fn new() -> Self {
        Self {}
    }

    async fn request<T: DeserializeOwned + 'static>(
        &self,
        mut req: ureq::Request,
        body: Option<String>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        println!("{:?}", headers.clone());

        if headers.is_some() {
            for header in headers.unwrap() {
                req = req.set(&header.0, &header.1);
            }
        }

        println!("{:?}", body);
        let res = match body {
            Some(b) => req.send_string(&b),
            None => req.call(),
        }
        .map_err(|e| HttpError::RequestError(e.to_string()))?;

        let status = res.status();

        let res_str = res
            .into_string()
            .map_err(|e| HttpError::DeserializeError(e.to_string()))?;

        if (200..300).contains(&status) {
            println!("{}", res_str);
            serde_json::from_str(&res_str).map_err(|e| HttpError::DeserializeError(e.to_string()))
        } else {
            let response: ApiError = serde_json::from_str(&res_str)
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;
            Err(HttpError::HttpClientError(response.message))
        }
    }
}
