mod anchor;
mod proof;
mod record;
mod response_types;

use self::anchor::AnchorServer;
use self::proof::ProofServer;
use self::record::RecordServer;
use crate::error::BridgeError;
use crate::items::AnchorServiceHandler;
use crate::items::BloockServer;
use crate::items::ProofServiceHandler;
use crate::items::RecordServiceHandler;
use crate::server::response_types::ResponseType;

pub struct Server {
    anchor: AnchorServer,
    record: RecordServer,
    proof: ProofServer,
}

impl Server {
    pub fn new() -> Self {
        Self {
            anchor: AnchorServer {},
            record: RecordServer {},
            proof: ProofServer {},
        }
    }

    pub async fn do_request(request_type: &str, payload: &str) -> Result<String, BridgeError> {
        let payload = base64::decode(payload)
            .map_err(|e| BridgeError::RequestDeserialization(e.to_string()))?;
        let server = Self::new();
        let result = server.dispatch(request_type, &payload).await?;

        let result_vec = result.get_bytes()?;
        let result_str = base64::encode(result_vec);

        Ok(result_str)
    }

    pub async fn dispatch(
        &self,
        request_type: &str,
        payload: &[u8],
    ) -> Result<ResponseType, BridgeError> {
        let server: BloockServer = BloockServer::from_str(request_type);
        match server {
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
            BloockServer::ProofServiceValidateRoot => Ok(self
                .proof
                .validate_root(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::ProofServiceVerifyProof => Ok(self
                .proof
                .verify_proof(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::ProofServiceVerifyRecords => Ok(self
                .proof
                .verify_records(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromString => Ok(self
                .record
                .build_record_from_string(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromHex => Ok(self
                .record
                .build_record_from_hex(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromJson => Ok(self
                .record
                .build_record_from_json(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromFile => Ok(self
                .record
                .build_record_from_file(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromBytes => Ok(self
                .record
                .build_record_from_bytes(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromRecord => Ok(self
                .record
                .build_record_from_record(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceBuildRecordFromLoader => Ok(self
                .record
                .build_record_from_loader(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceGetHash => Ok(self
                .record
                .get_hash(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceGetSignatures => Ok(self
                .record
                .get_signatures(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceGetSignatureCommonName => Ok(self
                .record
                .get_signature_common_name(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceGenerateKeys => Ok(self
                .record
                .generate_keys(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceGenerateRsaKeyPair => Ok(self
                .record
                .generate_rsa_key_pair(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServiceGenerateEciesKeyPair => Ok(self
                .record
                .generate_ecies_key_pair(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::RecordServicePublish => Ok(self
                .record
                .publish(self.serialize_request(payload)?)
                .await
                .into()),
            BloockServer::ProofServiceSetProof => Ok(self
                .proof
                .set_proof(self.serialize_request(payload)?)
                .await
                .into()),
            _ => Err(BridgeError::ServiceNotFound),
        }
    }

    fn serialize_request<T: prost::Message + Default>(
        &self,
        payload: &[u8],
    ) -> Result<T, BridgeError> {
        T::decode(payload).map_err(|e| BridgeError::RequestDeserialization(e.to_string()))
    }
}
