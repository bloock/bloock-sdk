mod greetings;

use crate::error::BridgeError;
use crate::items::BloockServer;
use crate::items::GreeterHandler;
use crate::items::HelloRequest;
use greetings::GreetingsServer;
use prost::Message;
use std::io::Cursor;

pub struct Server {
    greeter: GreetingsServer,
}

impl Server {
    pub fn new() -> Self {
        Self {
            greeter: GreetingsServer {},
        }
    }

    pub fn dispatch(
        &self,
        request_type: &str,
        payload: &[u8],
    ) -> Result<impl prost::Message, BridgeError> {
        let request: BloockServer = BloockServer::from_str(request_type);
        match request {
            BloockServer::GreeterSayHello => {
                Ok(self.greeter.say_hello(self.serialize_request(payload)?))
            }
            BloockServer::GreeterSayHelloWithError => Ok(self
                .greeter
                .say_hello_with_error(self.serialize_request(payload)?)),
            _ => Ok(self.greeter.say_hello(self.serialize_request(payload)?)),
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
