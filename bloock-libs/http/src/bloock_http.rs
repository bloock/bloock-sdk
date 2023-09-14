use super::Result;
use crate::Client;
use async_trait::async_trait;
use serde::de::DeserializeOwned;
use serde::Serialize;

cfg_default! {
    use crate::hyper_http::SimpleHttpClient;
}

cfg_wasm! {
    use crate::wasm_http::SimpleHttpClient;
}

const API_VERSION: &str = "2023-07-13";

pub struct BloockHttpClient {
    api_key: String,
    api_version: String,
}

#[async_trait(?Send)]
impl Client for BloockHttpClient {
    async fn get<U: ToString + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<Vec<u8>> {
        let headers = match headers {
            Some(mut h) => {
                h.push(("X-Api-Key".to_string(), self.get_api_key()));
                h.push(("api_version".to_string(), self.get_api_version()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), self.get_api_version()),
            ],
        };

        let client = SimpleHttpClient {};
        client.get(url, Some(headers)).await
    }

    async fn get_json<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let headers = match headers {
            Some(mut h) => {
                h.push(("X-Api-Key".to_string(), self.get_api_key()));
                h.push(("api_version".to_string(), self.get_api_version()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), self.get_api_version()),
            ],
        };

        let client = SimpleHttpClient {};
        client.get_json(url, Some(headers)).await
    }

    async fn post<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        body: &[u8],
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let headers = match headers {
            Some(mut h) => {
                h.push(("X-Api-Key".to_string(), self.get_api_key()));
                h.push(("api_version".to_string(), self.get_api_version()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), self.get_api_version()),
            ],
        };

        let client = SimpleHttpClient {};
        client.post(url, body, Some(headers)).await
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
        let headers = match headers {
            Some(mut h) => {
                h.push(("X-Api-Key".to_string(), self.get_api_key()));
                h.push(("api_version".to_string(), self.get_api_version()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), self.get_api_version()),
            ],
        };

        let client = SimpleHttpClient {};
        client.post_json(url, body, Some(headers)).await
    }

    async fn post_file<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        texts: Vec<(String, String)>,
        filename: Option<String>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let headers = match headers {
            Some(mut h) => {
                h.push(("X-Api-Key".to_string(), self.get_api_key()));
                h.push(("api_version".to_string(), self.get_api_version()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), self.get_api_version()),
            ],
        };

        let client = SimpleHttpClient {};
        client
            .post_file(url, files, texts, filename, Some(headers))
            .await
    }
}

impl BloockHttpClient {
    pub fn new(api_key: String, api_version: Option<String>) -> Self {
        let new_api_version = match api_version {
            Some(a) => a,
            None => API_VERSION.to_string(),
        };
        Self {
            api_key,
            api_version: new_api_version,
        }
    }

    pub fn get_api_key(&self) -> String {
        self.api_key.clone()
    }

    pub fn get_api_version(&self) -> String {
        self.api_version.clone()
    }
}
