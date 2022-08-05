mod config;
mod greetings;
mod response_types;

use crate::error::BridgeError;
use crate::items::BloockServer;
use crate::items::ConfigHandler;
use crate::items::ConfigResponse;
use crate::items::GreeterHandler;
use crate::items::HelloResponse;
use crate::server::response_types::ResponseType;
use prost::Message;
use std::io::Cursor;

use bloock_core::client::BloockClient;
use config::ConfigServer;
use greetings::GreetingsServer;

pub struct Server {
    greeter: GreetingsServer,
    config: ConfigServer,
}

impl Server {
    pub fn new(client: BloockClient) -> Self {
        Self {
            greeter: GreetingsServer {},
            config: ConfigServer { client },
        }
    }

    pub fn dispatch(
        &self,
        request_type: &str,
        payload: &[u8],
    ) -> Result<ResponseType, BridgeError> {
        let request: BloockServer = BloockServer::from_str(request_type);
        match request {
            BloockServer::GreeterSayHello => Ok(ResponseType::Hello(
                self.greeter.say_hello(self.serialize_request(payload)?),
            )),
            BloockServer::GreeterSayHelloWithError => Ok(ResponseType::Hello(
                self.greeter
                    .say_hello_with_error(self.serialize_request(payload)?),
            )),
            BloockServer::ConfigSetApiHost => Ok(ResponseType::Config(
                self.config.set_api_host(self.serialize_request(payload)?),
            )),
            _ => Ok(ResponseType::Hello(
                self.greeter.say_hello(self.serialize_request(payload)?),
            )),
        }
    }

    fn serialize_request<T: prost::Message + Default>(
        &self,
        payload: &[u8],
    ) -> Result<T, BridgeError> {
        T::decode(&mut Cursor::new(payload))
            .map_err(|_| BridgeError::ResponseSerialization("".to_string()))
    }
}
