use super::Result;
use crate::ApiError;
use crate::Client;
use crate::HttpError;
use async_trait::async_trait;
use js_sys::Promise;
use js_sys::{ArrayBuffer, Uint8Array};
use multipart::client::lazy::Multipart;
use serde::de::DeserializeOwned;
use serde::Serialize;
use serde::Serializer;
use std::fmt;
use std::future::Future;
use std::io::BufReader;
use std::io::Read;
use std::pin::Pin;
use std::str::FromStr;
use std::task::Context;
use std::task::Poll;
use wasm_bindgen::convert::IntoWasmAbi;
use wasm_bindgen::describe::WasmDescribe;
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsCast;
use wasm_bindgen::JsValue;
use wasm_bindgen_futures::JsFuture;
use web_sys::Request;
use web_sys::RequestInit;
use web_sys::RequestMode;
use web_sys::Response;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = fetch)]
    fn fetch(input: UnsafeSend<web_sys::Request>) -> Promise;
}

pub struct SimpleHttpClient {}

#[async_trait]
impl Client for SimpleHttpClient {
    async fn get<U: ToString + Send + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        let request = self.prepare_req("GET", url.to_string(), None)?;
        self.request(request, headers).await
    }

    async fn get_json<U: ToString + Send + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let request = self.prepare_req("GET", url.to_string(), None)?;
        let res = self.request(request, headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post<U: ToString + Send + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: &[u8],
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let request = self.prepare_req("POST", url.to_string(), Some(body))?;

        let res = self.request(request, headers).await?;
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

        let request = self.prepare_req("POST", url.to_string(), Some(bytes.as_slice()))?;

        let res = self.request(request, headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post_file<U: ToString + Send + 'static, T: DeserializeOwned + Send + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let (headers, buffer) = self.prepare_files(files, headers)?;

        let request = self.prepare_req("POST", url.to_string(), Some(&buffer))?;

        let res = self.request(request, Some(headers)).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }
}

impl SimpleHttpClient {
    pub fn new() -> Self {
        Self {}
    }

    async fn request(
        &self,
        req: UnsafeSend<Request>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        if headers.is_some() {
            for header in headers.unwrap() {
                req.0
                    .headers()
                    .set(&header.0, &header.1)
                    .map_err(|e| HttpError::JsError(e.into()))?;
            }
        }

        let (status, response_bytes) = self.send_request(req).await?;

        if (200..300).contains(&status) {
            return Ok(response_bytes);
        } else {
            let response: ApiError = serde_json::from_slice(&response_bytes)
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;
            return Err(HttpError::HttpClientError(response.message));
        }
    }

    async fn send_request(&self, req: UnsafeSend<Request>) -> Result<(u16, Vec<u8>)> {
        let future: UnsafeSend<JsFuture> = UnsafeSend::new(JsFuture::from(fetch(req)));

        let resp: UnsafeSend<Response> = future
            .await
            .map_err(|e| HttpError::JsError(e.into()))?
            .dyn_into::<Response>()
            .map_err(|e| HttpError::JsError(e.into()))?
            .into();

        let future: UnsafeSend<JsFuture> = UnsafeSend::new(JsFuture::from(
            resp.0
                .array_buffer()
                .map_err(|e| HttpError::JsError(e.into()))?,
        ));
        let array_buffer: ArrayBuffer = future
            .await
            .map_err(|e| HttpError::JsError(e.into()))?
            .unchecked_into();
        let typed_buff: Uint8Array = Uint8Array::new(&array_buffer);
        let mut body = vec![0; typed_buff.length() as usize];
        typed_buff.copy_to(&mut body);

        let status = resp.0.status();
        Ok((status, body))
    }

    fn prepare_req(
        &self,
        method: &'static str,
        url: String,
        body: Option<&[u8]>,
    ) -> Result<UnsafeSend<Request>> {
        let mut opts = RequestInit::new();
        opts.method(method);
        opts.mode(RequestMode::Cors);

        if let Some(body) = body {
            let body_array: js_sys::Uint8Array = body.into();
            let js_value: &JsValue = body_array.as_ref();
            opts.body(Some(js_value));
        }

        Ok(UnsafeSend::new(
            Request::new_with_str_and_init(&url, &opts)
                .map_err(|e| HttpError::JsError(e.into()))?,
        ))
    }

    fn prepare_files(
        &self,
        files: Vec<(String, Vec<u8>)>,
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

        Ok((headers, buffer))
    }
}

#[derive(Debug, Clone)]
pub struct JsError(JsValue);
impl JsError {
    pub fn to_string(&self) -> String {
        match serde_wasm_bindgen::from_value(self.0.clone()) {
            Ok(s) => s,
            Err(_) => format!("Unknown error"),
        }
    }
}

impl From<JsValue> for JsError {
    fn from(v: JsValue) -> Self {
        Self(v)
    }
}

impl Serialize for JsError {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl fmt::Display for JsError {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.to_string())
    }
}

impl PartialEq for JsError {
    fn eq(&self, other: &Self) -> bool {
        self.to_string().eq(&other.to_string())
    }
}

impl Eq for JsError {}

struct UnsafeSend<T>(T);

unsafe impl<T> Send for UnsafeSend<T> {}

impl<T> UnsafeSend<T> {
    pub fn new(data: T) -> Self {
        UnsafeSend(data)
    }
}

impl<T> From<T> for UnsafeSend<T> {
    fn from(other: T) -> Self {
        Self::new(other)
    }
}

impl<T: Future + Unpin> Future for UnsafeSend<T> {
    type Output = T::Output;

    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        Pin::new(&mut self.0).poll(cx)
    }
}

impl<T: WasmDescribe> WasmDescribe for UnsafeSend<T> {
    fn describe() {
        T::describe()
    }
}

impl<T: IntoWasmAbi> IntoWasmAbi for UnsafeSend<T> {
    type Abi = T::Abi;

    fn into_abi(self) -> Self::Abi {
        self.0.into_abi()
    }
}
