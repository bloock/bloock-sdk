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
                h.push(("api_version".to_string(), API_VERSION.to_string()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), API_VERSION.to_string()),
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
                h.push(("api_version".to_string(), API_VERSION.to_string()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), API_VERSION.to_string()),
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
                h.push(("api_version".to_string(), API_VERSION.to_string()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), API_VERSION.to_string()),
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
                h.push(("api_version".to_string(), API_VERSION.to_string()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), API_VERSION.to_string()),
            ],
        };

        let client = SimpleHttpClient {};
        client.post_json(url, body, Some(headers)).await
    }

    async fn post_file<U: ToString + 'static, T: DeserializeOwned + 'static>(
        &self,
        url: U,
        files: Vec<(String, Vec<u8>)>,
        headers: Option<Vec<(String, String)>>,
    ) -> Result<T> {
        let headers = match headers {
            Some(mut h) => {
                h.push(("X-Api-Key".to_string(), self.get_api_key()));
                h.push(("api_version".to_string(), API_VERSION.to_string()));
                h
            }
            None => vec![
                ("X-Api-Key".to_string(), self.get_api_key()),
                ("api_version".to_string(), API_VERSION.to_string()),
            ],
        };

        let client = SimpleHttpClient {};
        client.post_file(url, files, Some(headers)).await
    }
}

impl BloockHttpClient {
    pub fn new(api_key: String) -> Self {
        Self { api_key }
    }

    pub fn get_api_key(&self) -> String {
        self.api_key.clone()
    }
}
