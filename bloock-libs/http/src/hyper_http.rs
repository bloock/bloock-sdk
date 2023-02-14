use super::Result;
use crate::ApiError;
use crate::Client;
use crate::HttpError;
use async_trait::async_trait;
use multipart::client::lazy::Multipart;
use serde::de::DeserializeOwned;
use serde::Serialize;
use std::io::BufReader;
use std::io::Read;
use std::str::FromStr;

pub struct SimpleHttpClient {}

#[async_trait(?Send)]
impl Client for SimpleHttpClient {
    async fn get<U: ToString + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        let req = ureq::get(&url.to_string());
        self.request(req, None, headers).await
    }

    async fn get_json<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let req = ureq::get(&url.to_string());
        let res = self.request(req, None, headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: &[u8],
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let req = ureq::post(&url.to_string());
        let res = self.request(req, Some(body), headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post_json<
        U: ToString + 'static,
        B: Serialize + 'static,
        T: DeserializeOwned + 'static,
    >(
        &self,
        url: U,
        body: B,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let bytes =
            serde_json::to_vec(&body).map_err(|e| HttpError::SerializeError(e.to_string()))?;

        let req = ureq::post(&url.to_string());
        let res = self.request(req, Some(&bytes), headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post_file<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let mut m = Multipart::new();

        for file in files.iter() {
            let content_type = match infer::get(&file.1) {
                Some(t) => t.mime_type(),
                None => "application/octet-stream",
            };

            let mime = match mime::Mime::from_str(content_type) {
                Ok(m) => m,
                Err(_) => mime::APPLICATION_OCTET_STREAM,
            };
            m.add_stream(file.0.clone(), file.1.as_slice(), Some("blob"), Some(mime));
        }

        let mdata = m.prepare().unwrap();

        let headers = match headers {
            Some(mut h) => {
                h.push((
                    "Content-Type".to_owned(),
                    format!("multipart/form-data; boundary={}", mdata.boundary()),
                ));
                h
            }
            None => vec![(
                "Content-Type".to_owned(),
                format!("multipart/form-data; boundary={}", mdata.boundary()),
            )],
        };

        let mut reader = BufReader::new(mdata);
        let mut buffer = Vec::new();
        reader
            .read_to_end(&mut buffer)
            .map_err(|_| HttpError::WriteFormDataError())?;

        let req = ureq::post(&url.to_string());
        let res = self
            .request(req, Some(buffer.as_slice()), Some(headers))
            .await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }
}

impl SimpleHttpClient {
    pub fn new() -> Self {
        Self {}
    }

    async fn request(
        &self,
        mut req: ureq::Request,
        body: Option<&[u8]>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        if headers.is_some() {
            for header in headers.unwrap() {
                req = req.set(&header.0, &header.1);
            }
        }

        let res = match body {
            Some(b) => req.send_bytes(b),
            None => req.call(),
        }
        .map(Some)
        .unwrap_or_else(|e| e.into_response())
        .ok_or_else(|| HttpError::RequestError("Error while sending request".to_string()))?;

        let status = res.status();

        let mut reader = BufReader::new(res.into_reader());
        let mut res_buffer = Vec::new();
        reader
            .read_to_end(&mut res_buffer)
            .map_err(|e| HttpError::DeserializeError(e.to_string()))?;

        if (200..300).contains(&status) {
            Ok(res_buffer)
        } else {
            let response: ApiError = serde_json::from_slice(&res_buffer)
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;
            Err(HttpError::HttpClientError(response.message))
        }
    }
}

impl Default for SimpleHttpClient {
    fn default() -> Self {
        Self::new()
    }
}
