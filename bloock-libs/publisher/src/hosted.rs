use crate::PublisherError;

use super::{Loader, Publisher};
use async_trait::async_trait;
use bloock_http::{BloockHttpClient, Client};
use serde::{Deserialize, Serialize};

#[derive(Clone, Serialize)]
struct HostedPublisherRequest {
    pub data: Vec<u8>,
}

#[derive(Clone, Deserialize)]
struct HostedPublisherResponse {
    pub url: String,
}

#[derive(Default)]
pub struct HostedPublisherArgs {
    key: String,
}

pub struct HostedPublisher {
    args: HostedPublisherArgs,
}

impl HostedPublisher {
    pub fn new(args: HostedPublisherArgs) -> Self {
        Self { args }
    }
}

#[async_trait(?Send)]
impl Publisher for HostedPublisher {
    async fn publish(&self, payload: &[u8]) -> crate::Result<String> {
        let mime = match infer::get(payload) {
            Some(t) => t.mime_type(),
            None => "octet-stream",
        };
        let client = BloockHttpClient::new(self.args.key.clone());
        let request = HostedPublisherRequest {
            data: payload.to_vec(),
        };
        let response: HostedPublisherResponse = client
            .post("https://api.bloock.dev/hosting/v1/upload", request, None)
            .await
            .map_err(|e| PublisherError::PublishError(e.to_string()))?;
        Ok(response.url)
    }
}

#[derive(Default)]
pub struct HostedLoaderArgs {
    pub bloock_id: String,
}

pub struct HostedLoader {
    _args: HostedLoaderArgs,
}

impl HostedLoader {
    pub fn new(args: HostedLoaderArgs) -> Self {
        Self { _args: args }
    }
}

#[async_trait(?Send)]
impl Loader for HostedLoader {
    async fn retrieve(&self) -> crate::Result<Vec<u8>> {
        todo!()
    }
}
