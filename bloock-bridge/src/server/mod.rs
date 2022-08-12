mod anchor;
mod greetings;
mod proof;
mod record;
mod response_types;

use crate::error::BridgeError;
use crate::items::AnchorServiceHandler;
use crate::items::BloockServer;
use crate::items::GreeterHandler;
use crate::items::HelloResponse;
use crate::items::ProofServiceHandler;
use crate::items::RecordServiceHandler;
use crate::server::response_types::ResponseType;
use std::io::Cursor;

use greetings::GreetingsServer;

use self::anchor::AnchorServer;
use self::proof::ProofServer;
use self::record::RecordServer;

pub struct Server {
    greeter: GreetingsServer,
    anchor: AnchorServer,
    record: RecordServer,
    proof: ProofServer,
}

impl Server {
    pub fn new() -> Self {
        Self {
            greeter: GreetingsServer {},
            anchor: AnchorServer {},
            record: RecordServer {},
            proof: ProofServer {},
        }
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
            BloockServer::RecordServiceSendRecords => Ok(self
                .record
                .send_records(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::ProofServiceGetProof => Ok(self
                .proof
                .get_proof(self.serialize_request(payload)?)
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
        T::decode(&mut Cursor::new(payload))
            .map_err(|_| BridgeError::ResponseSerialization("".to_string()))
    }
}
