use crate::items::GenerateEciesKeyPairResponse;
use crate::items::GenerateKeysResponse;
use crate::items::GenerateRsaKeyPairResponse;
use crate::items::GetAnchorResponse;
use crate::items::GetProofResponse;
use crate::items::PublishResponse;
use crate::items::Record;
use crate::items::RecordBuilderResponse;
use crate::items::RecordHash;
use crate::items::RecordSignatures;
use crate::items::SendRecordsResponse;
use crate::items::SetProofResponse;
use crate::items::SignatureCommonNameResponse;
use crate::items::ValidateRootResponse;
use crate::items::VerifyProofResponse;
use crate::items::VerifyRecordsResponse;
use crate::items::VerifyWebhookSignatureResponse;
use crate::items::WaitAnchorResponse;
use crate::server::BridgeError;
use prost::Message;

pub enum ResponseType {
    GetAnchor(GetAnchorResponse),
    WaitAnchor(WaitAnchorResponse),
    Record(Record),
    SendRecords(SendRecordsResponse),
    GetProof(GetProofResponse),
    SetProof(SetProofResponse),
    ValidateRoot(ValidateRootResponse),
    VerifyProof(VerifyProofResponse),
    VerifyRecords(VerifyRecordsResponse),
    BuildRecord(RecordBuilderResponse),
    GetHash(RecordHash),
    GetSignatures(RecordSignatures),
    GetSignatureCommonName(SignatureCommonNameResponse),
    GenerateKeys(GenerateKeysResponse),
    GenerateRsaKeyPairResponse(GenerateRsaKeyPairResponse),
    GenerateEciesKeyPairResponse(GenerateEciesKeyPairResponse),
    Publish(PublishResponse),
    VerifyWebhookSignature(VerifyWebhookSignatureResponse),
}

impl ResponseType {
    pub fn get_bytes(&self) -> Result<Vec<u8>, BridgeError> {
        let mut result_vec = Vec::new();
        result_vec.reserve(self.len());

        match self {
            ResponseType::GetAnchor(r) => r.encode(&mut result_vec),
            ResponseType::WaitAnchor(r) => r.encode(&mut result_vec),
            ResponseType::SendRecords(r) => r.encode(&mut result_vec),
            ResponseType::GetProof(r) => r.encode(&mut result_vec),
            ResponseType::SetProof(r) => r.encode(&mut result_vec),
            ResponseType::ValidateRoot(r) => r.encode(&mut result_vec),
            ResponseType::VerifyProof(r) => r.encode(&mut result_vec),
            ResponseType::VerifyRecords(r) => r.encode(&mut result_vec),
            ResponseType::Record(r) => r.encode(&mut result_vec),
            ResponseType::BuildRecord(r) => r.encode(&mut result_vec),
            ResponseType::GetHash(r) => r.encode(&mut result_vec),
            ResponseType::GenerateKeys(r) => r.encode(&mut result_vec),
            ResponseType::GenerateRsaKeyPairResponse(r) => r.encode(&mut result_vec),
            ResponseType::GenerateEciesKeyPairResponse(r) => r.encode(&mut result_vec),
            ResponseType::Publish(r) => r.encode(&mut result_vec),
            ResponseType::GetSignatures(r) => r.encode(&mut result_vec),
            ResponseType::GetSignatureCommonName(r) => r.encode(&mut result_vec),
            ResponseType::VerifyWebhookSignature(r) => r.encode(&mut result_vec),
        }
        .map_err(|e| BridgeError::ResponseSerialization(e.to_string()))?;

        Ok(result_vec)
    }

    pub fn len(&self) -> usize {
        match self {
            ResponseType::GetAnchor(r) => r.encoded_len(),
            ResponseType::WaitAnchor(r) => r.encoded_len(),
            ResponseType::SendRecords(r) => r.encoded_len(),
            ResponseType::GetProof(r) => r.encoded_len(),
            ResponseType::SetProof(r) => r.encoded_len(),
            ResponseType::ValidateRoot(r) => r.encoded_len(),
            ResponseType::VerifyProof(r) => r.encoded_len(),
            ResponseType::VerifyRecords(r) => r.encoded_len(),
            ResponseType::Record(r) => r.encoded_len(),
            ResponseType::BuildRecord(r) => r.encoded_len(),
            ResponseType::GetHash(r) => r.encoded_len(),
            ResponseType::GenerateKeys(r) => r.encoded_len(),
            ResponseType::GenerateRsaKeyPairResponse(r) => r.encoded_len(),
            ResponseType::GenerateEciesKeyPairResponse(r) => r.encoded_len(),
            ResponseType::Publish(r) => r.encoded_len(),
            ResponseType::GetSignatures(r) => r.encoded_len(),
            ResponseType::GetSignatureCommonName(r) => r.encoded_len(),
            ResponseType::VerifyWebhookSignature(r) => r.encoded_len()
        }
    }
}
