use crate::server::BridgeError;
use crate::server::ConfigResponse;
use crate::server::HelloResponse;
use prost::Message;

pub enum ResponseType {
    Hello(HelloResponse),
    Config(ConfigResponse),
}
impl ResponseType {
    pub fn get_bytes(&self) -> Result<Vec<u8>, BridgeError> {
        let mut result_vec = Vec::new();
        result_vec.reserve(self.len());

        match self {
            ResponseType::Hello(r) => r.encode(&mut result_vec),
            ResponseType::Config(r) => r.encode(&mut result_vec),
        }
        .map_err(|e| BridgeError::ResponseSerialization(e.to_string()))?;

        Ok(result_vec)
    }

    pub fn len(&self) -> usize {
        match self {
            ResponseType::Hello(r) => r.encoded_len(),
            ResponseType::Config(r) => r.encoded_len(),
        }
    }
}
