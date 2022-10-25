use super::Result;
use crate::Client;
use crate::HttpError;
use async_trait::async_trait;
use crate::ApiError;
use serde::de::DeserializeOwned;
use serde::Serializer;
use serde::Serialize;
use wasm_bindgen::JsCast;
use wasm_bindgen::JsValue;
use wasm_bindgen_futures::JsFuture;
use std::fmt;
use web_sys::Request;
use web_sys::RequestInit;
use web_sys::RequestMode;
use web_sys::Response;
use js_sys::Promise;
use wasm_bindgen::prelude::wasm_bindgen;


#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = fetch)]
    fn fetch(input: web_sys::Request) -> Promise;
    
}

pub struct SimpleHttpClient {}

#[async_trait(?Send)]
impl Client for SimpleHttpClient {
    async fn get<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let mut opts = RequestInit::new();
        opts.method("GET");
        opts.mode(RequestMode::Cors);

        let request = Request::new_with_str_and_init(&url.to_string(), &opts)
            .map_err(|e| HttpError::JsError(e.into()))?;

        self.request(request, headers).await
    }

    async fn post<U: ToString + 'static, B: Serialize + 'static, T: DeserializeOwned + 'static>(
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

        let request = Request::new_with_str_and_init(&url.to_string(), &opts).map_err(|e| HttpError::JsError(e.into()))?;

        self.request(request, headers).await
    }

    async fn post_file<U: ToString + 'static, T: DeserializeOwned + 'static>(
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

        let request = Request::new_with_str_and_init(&url.to_string(), &opts).map_err(|e| HttpError::JsError(e.into()))?;

        self.request(request, headers).await
    }
}

impl SimpleHttpClient {
    pub fn new() -> Self {
        Self { }
    }

    async fn request<T: DeserializeOwned + 'static>(
        &self,
        req: Request,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        if headers.is_some() {
            for header in headers.unwrap() {
                req.headers().set(&header.0, &header.1).map_err(|e| HttpError::JsError(e.into()))?;
            }
        }

        let resp_value = JsFuture::from(fetch(req))
            .await
            .map_err(|e| HttpError::JsError(e.into()))?;

        assert!(resp_value.is_instance_of::<Response>());

        let resp: Response = resp_value.dyn_into().map_err(|e| HttpError::JsError(e.into()))?;

        let status = resp.status();
        let json = JsFuture::from(
                resp
                .json()
                .map_err(|e| HttpError::JsError(e.into()))?
            )
            .await
            .map_err(|e| HttpError::JsError(e.into()))?;

        if (200..300).contains(&status) {
            json.into_serde()
            .map_err(|e| HttpError::DeserializeError(e.to_string()))
        } else {
            let response: ApiError = json
                .into_serde()
                .map_err(|e| HttpError::DeserializeError(e.to_string()))?;
            return Err(HttpError::HttpClientError(response.message));
        }
    }
}

#[derive(Debug, Clone)]
pub struct JsError(JsValue);
impl JsError {
    pub fn to_string(&self) -> String {
        match self.0.into_serde() {
            Ok(s) => s,
            Err(_) => "Unknown error".to_string(),
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
