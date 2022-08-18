use crate::items::FromHexResponse;
use crate::items::GetAnchorResponse;
use crate::items::GetProofResponse;
use crate::items::Record;
use crate::items::SendRecordsResponse;
use crate::items::ValidateRootResponse;
use crate::items::VerifyProofResponse;
use crate::items::VerifyRecordsResponse;
use crate::items::WaitAnchorResponse;
use crate::server::BridgeError;
use crate::server::HelloResponse;
use prost::Message;

pub enum ResponseType {
    Hello(HelloResponse),
    GetAnchor(GetAnchorResponse),
    WaitAnchor(WaitAnchorResponse),
    Record(Record),
    RecordFromHex(FromHexResponse),
    SendRecords(SendRecordsResponse),
    GetProof(GetProofResponse),
    ValidateRoot(ValidateRootResponse),
    VerifyProof(VerifyProofResponse),
    VerifyRecords(VerifyRecordsResponse),
}

impl ResponseType {
    pub fn get_bytes(&self) -> Result<Vec<u8>, BridgeError> {
        let mut result_vec = Vec::new();
        result_vec.reserve(self.len());

        match self {
            ResponseType::Hello(r) => r.encode(&mut result_vec),
            ResponseType::GetAnchor(r) => r.encode(&mut result_vec),
            ResponseType::WaitAnchor(r) => r.encode(&mut result_vec),
            ResponseType::SendRecords(r) => r.encode(&mut result_vec),
            ResponseType::GetProof(r) => r.encode(&mut result_vec),
            ResponseType::ValidateRoot(r) => r.encode(&mut result_vec),
            ResponseType::VerifyProof(r) => r.encode(&mut result_vec),
            ResponseType::VerifyRecords(r) => r.encode(&mut result_vec),
            ResponseType::Record(r) => r.encode(&mut result_vec),
            ResponseType::RecordFromHex(r) => r.encode(&mut result_vec),
        }
        .map_err(|e| BridgeError::ResponseSerialization(e.to_string()))?;

        Ok(result_vec)
    }

    pub fn len(&self) -> usize {
        match self {
            ResponseType::Hello(r) => r.encoded_len(),
            ResponseType::GetAnchor(r) => r.encoded_len(),
            ResponseType::WaitAnchor(r) => r.encoded_len(),
            ResponseType::SendRecords(r) => r.encoded_len(),
            ResponseType::GetProof(r) => r.encoded_len(),
            ResponseType::ValidateRoot(r) => r.encoded_len(),
            ResponseType::VerifyProof(r) => r.encoded_len(),
            ResponseType::VerifyRecords(r) => r.encoded_len(),
            ResponseType::Record(r) => r.encoded_len(),
            ResponseType::RecordFromHex(r) => r.encoded_len(),
        }
    }
}
