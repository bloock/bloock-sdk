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

#[async_trait]
impl Client for SimpleHttpClient {
    async fn get<U: ToString + Send + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        let req = ureq::get(&url.to_string());
        self.request(req, None, headers).await
    }

    async fn get_json<U: ToString + Send + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let req = ureq::get(&url.to_string());
        let res = self.request(req, None, headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post<U: ToString + Send + 'static, T: DeserializeOwned + 'static>(
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
        U: ToString + Send + 'static,
        B: Serialize + Send + 'static,
        T: DeserializeOwned + Send + 'static,
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

    async fn post_file<U: ToString + Send + 'static, T: DeserializeOwned + Send + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        texts: Vec<(String, String)>,
        filename: Option<String>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let (headers, buffer) = self.prepare_files(files, texts, filename, headers)?;

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
        let copy_req = req.clone();
        if headers.is_some() {
            for header in headers.unwrap() {
                req = req.set(&header.0, &header.1);
            }
        }

        let res = match body {
            Some(b) => req.send_bytes(b),
            None => req.call(),
        };

        let resp = match res {
            Ok(r) => r,
            Err(e) => {
                let response = format!("Error: {:?}, Url: {:?}.", e, copy_req.url());
                return Err(HttpError::HttpClientError(response))
            },
        };

        let status = resp.status();

        let mut reader = BufReader::new(resp.into_reader());
        let mut res_buffer = Vec::new();
        reader
            .read_to_end(&mut res_buffer)
            .map_err(|e| HttpError::DeserializeError(e.to_string()))?;

        if (200..300).contains(&status) {
            Ok(res_buffer)
        } else {
            let response = format!("Error: {:?}, Status: {:?}, Url: {:?}.", String::from_utf8(res_buffer), status, copy_req.url());
            /*let response: ApiError = serde_json::from_slice(&res_buffer)
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;*/
            Err(HttpError::HttpClientError(response))
        }
    }

    fn prepare_files(
        &self,
        files: Vec<(String, Vec<u8>)>,
        texts: Vec<(String, String)>,
        filename: Option<String>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<(Vec<(String, String)>, Vec<u8>)> {
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

            let name = match filename.clone() {
                Some(f) => f,
                None => uuid::Uuid::new_v4().to_string(),
            };
            m.add_stream(file.0.clone(), file.1.as_slice(), Some(name), Some(mime));
        }
        for text in texts.iter() {
            m.add_text(text.0.clone(), text.1.clone());
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

        Ok((headers, buffer))
    }
}

impl Default for SimpleHttpClient {
    fn default() -> Self {
        Self::new()
    }
}
