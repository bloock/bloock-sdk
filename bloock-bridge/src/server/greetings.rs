use async_trait::async_trait;

use crate::items::Error;
use crate::items::GreeterHandler;
use crate::items::HelloRequest;
use crate::items::HelloResponse;

use super::response_types::ResponseType;

impl From<HelloResponse> for ResponseType {
    fn from(res: HelloResponse) -> Self {
        ResponseType::Hello(res)
    }
}

pub struct GreetingsServer {}

#[async_trait(?Send)]
impl GreeterHandler for GreetingsServer {
    async fn say_hello(&self, req: HelloRequest) -> HelloResponse {
        HelloResponse {
            message: format!("Hello from Rust, {}!", req.name),
            ..Default::default()
        }
    }
    async fn say_hello_with_error(&self, req: HelloRequest) -> HelloResponse {
        HelloResponse {
            error: Some(Error {
                kind: "InvalidMethod".to_string(),
                message: format!("Hello from Rust, {}!", req.name),
            }),
            ..Default::default()
        }
    }
}
