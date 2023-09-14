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
use std::io::BufReader;
use std::io::Read;
use std::str::FromStr;
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
    fn fetch(input: web_sys::Request) -> Promise;
}

pub struct SimpleHttpClient {}

#[async_trait(?Send)]
impl Client for SimpleHttpClient {
    async fn get<U: ToString + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        let mut opts = RequestInit::new();
        opts.method("GET");
        opts.mode(RequestMode::Cors);

        let request = Request::new_with_str_and_init(&url.to_string(), &opts)
            .map_err(|e| HttpError::JsError(e.into()))?;

        self.request(request, headers).await
    }

    async fn get_json<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let mut opts = RequestInit::new();
        opts.method("GET");
        opts.mode(RequestMode::Cors);

        let request = Request::new_with_str_and_init(&url.to_string(), &opts)
            .map_err(|e| HttpError::JsError(e.into()))?;

        let res = self.request(request, headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: &[u8],
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let mut opts = RequestInit::new();
        opts.method("POST");
        opts.mode(RequestMode::Cors);
        let body_array: js_sys::Uint8Array = body.into();
        let js_value: &JsValue = body_array.as_ref();
        opts.body(Some(js_value));

        let request = Request::new_with_str_and_init(&url.to_string(), &opts)
            .map_err(|e| HttpError::JsError(e.into()))?;

        let res = self.request(request, headers).await?;
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

        let mut opts = RequestInit::new();
        opts.method("POST");
        opts.mode(RequestMode::Cors);
        let body_array: js_sys::Uint8Array = bytes.as_slice().into();
        let js_value: &JsValue = body_array.as_ref();
        opts.body(Some(js_value));

        let request = Request::new_with_str_and_init(&url.to_string(), &opts)
            .map_err(|e| HttpError::JsError(e.into()))?;

        let res = self.request(request, headers).await?;
        serde_json::from_slice(&res).map_err(|e| HttpError::DeserializeError(e.to_string()))
    }

    async fn post_file<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        texts: Vec<(String, String)>,
        filename: Option<String>,
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

            let name = match filename.clone() {
                Some(f) => f,
                None => "blob".to_string(),
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

        let mut opts = RequestInit::new();
        opts.method("POST");
        opts.mode(RequestMode::Cors);
        let body_array: js_sys::Uint8Array = buffer.as_slice().into();
        let js_value: &JsValue = body_array.as_ref();
        opts.body(Some(js_value));

        let request = Request::new_with_str_and_init(&url.to_string(), &opts)
            .map_err(|e| HttpError::JsError(e.into()))?;

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
        req: Request,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        if headers.is_some() {
            for header in headers.unwrap() {
                req.headers()
                    .set(&header.0, &header.1)
                    .map_err(|e| HttpError::JsError(e.into()))?;
            }
        }

        let resp_value = JsFuture::from(fetch(req))
            .await
            .map_err(|e| HttpError::JsError(e.into()))?;

        assert!(resp_value.is_instance_of::<Response>());

        let resp: Response = resp_value
            .dyn_into()
            .map_err(|e| HttpError::JsError(e.into()))?;

        let status = resp.status();

        let response_bytes = parse_response(&resp).await?;

        if (200..300).contains(&status) {
            return Ok(response_bytes);
        } else {
            let response: ApiError = serde_json::from_slice(&response_bytes)
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;
            return Err(HttpError::HttpClientError(response.message));
        }
    }
}

async fn parse_response(response: &Response) -> Result<Vec<u8>> {
    let promise = response
        .array_buffer()
        .map_err(|e| HttpError::JsError(e.into()))?;
    let array_buffer: ArrayBuffer = JsFuture::from(promise)
        .await
        .map_err(|e| HttpError::JsError(e.into()))?
        .unchecked_into();
    let typed_buff: Uint8Array = Uint8Array::new(&array_buffer);
    let mut body = vec![0; typed_buff.length() as usize];
    typed_buff.copy_to(&mut body);
    Ok(body)
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
