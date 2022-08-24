mod anchor;
mod greetings;
mod response_types;

use crate::error::BridgeError;
use crate::items::AnchorServiceHandler;
use crate::items::BloockServer;
use crate::items::GreeterHandler;
use crate::items::HelloResponse;
use crate::server::response_types::ResponseType;

use greetings::GreetingsServer;

use self::anchor::AnchorServer;

pub struct Server {
    greeter: GreetingsServer,
    anchor: AnchorServer,
}

impl Server {
    pub fn new() -> Self {
        Self {
            greeter: GreetingsServer {},
            anchor: AnchorServer {},
        }
    }

    pub async fn do_request(request_type: &str, payload: &str) -> Result<String, BridgeError> {
        let payload = base64::decode(payload)
            .map_err(|e| BridgeError::RequestDeserialization(e.to_string()))?;
        let result = Self::new().dispatch(request_type, &payload).await?;

        let result_vec = result.get_bytes()?;
        let result_str = base64::encode(result_vec);

        Ok(result_str)
    }

    pub async fn dispatch(
        &self,
        request_type: &str,
        payload: &[u8],
    ) -> Result<ResponseType, BridgeError> {
        let request: BloockServer = BloockServer::from_str(request_type);
        match request {
            BloockServer::GreeterSayHello => Ok(self
                .greeter
                .say_hello(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::GreeterSayHelloWithError => Ok(self
                .greeter
                .say_hello_with_error(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::AnchorServiceGetAnchor => Ok(self
                .anchor
                .get_anchor(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::AnchorServiceWaitAnchor => Ok(self
                .anchor
                .wait_anchor(self.serialize_request(payload)?)
                .await
                .into()),
            _ => Ok(self
                .greeter
                .say_hello(self.serialize_request(payload)?)
                .await
                .into()),
        }
    }

    fn serialize_request<T: prost::Message + Default>(
        &self,
        payload: &[u8],
    ) -> Result<T, BridgeError> {
        T::decode(payload).map_err(|e| BridgeError::RequestDeserialization(e.to_string()))
    }
}
