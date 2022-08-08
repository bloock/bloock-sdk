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

impl GreeterHandler for GreetingsServer {
    fn say_hello(&self, req: HelloRequest) -> HelloResponse {
        println!("{:?}", req.config);
        let mut response = HelloResponse::default();
        response.message = format!("Hello from Rust, {}!", req.name);
        response
    }
    fn say_hello_with_error(&self, req: HelloRequest) -> HelloResponse {
        let mut response = HelloResponse::default();

        response.error = Some(Error {
            kind: "InvalidMethod".to_string(),
            message: format!("Hello from Rust, {}!", req.name),
        });
        response
    }
}
