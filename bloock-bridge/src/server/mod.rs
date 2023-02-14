mod record;
pub mod response_types;
mod webhook;

mod authenticity;
mod availability;
pub mod config;
mod encryption;
mod integrity;

use self::authenticity::server::AuthenticityServer;
use self::availability::server::AvailabilityServer;
use self::encryption::server::EncryptionServer;
use self::integrity::server::IntegrityServer;
use self::record::server::RecordServer;
use self::response_types::ToResponseType;
use self::webhook::server::WebhookServer;
use crate::error::BridgeError;
use crate::items::AuthenticityServiceHandler;
use crate::items::AvailabilityServiceHandler;
use crate::items::BloockServer;
use crate::items::EncryptionServiceHandler;
use crate::items::IntegrityServiceHandler;
use crate::items::RecordServiceHandler;
use crate::items::WebhookServiceHandler;
use crate::server::response_types::ResponseType;

pub struct Server {
    authenticity: AuthenticityServer,
    availability: AvailabilityServer,
    encryption: EncryptionServer,
    integrity: IntegrityServer,
    record: RecordServer,
    webhook: WebhookServer,
}

impl Server {
    pub fn new() -> Self {
        Self {
            authenticity: AuthenticityServer {},
            availability: AvailabilityServer {},
            encryption: EncryptionServer {},
            integrity: IntegrityServer {},
            record: RecordServer {},
            webhook: WebhookServer {},
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
            BloockServer::AuthenticityServiceGenerateEcdsaKeys => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .authenticity
                    .generate_ecdsa_keys(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::AuthenticityServiceSign => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .authenticity
                    .sign(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::AuthenticityServiceVerify => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .authenticity
                    .verify(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::AuthenticityServiceGetSignatures => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .authenticity
                    .get_signatures(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::AuthenticityServiceGetSignatureCommonName => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .authenticity
                    .get_signature_common_name(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceGetAnchor => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .get_anchor(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceWaitAnchor => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .wait_anchor(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceSendRecords => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .send_records(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceGetProof => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .get_proof(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceValidateRoot => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .validate_root(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceVerifyProof => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .verify_proof(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IntegrityServiceVerifyRecords => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .integrity
                    .verify_records(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromString => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_string(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromHex => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_hex(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromJson => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromFile => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_file(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromBytes => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_bytes(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromRecord => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_record(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceBuildRecordFromLoader => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .build_record_from_loader(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceGetHash => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .get_hash(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::RecordServiceSetProof => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .set_proof(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::AvailabilityServicePublish => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .availability
                    .publish(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::AvailabilityServiceRetrieve => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .availability
                    .retrieve(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::EncryptionServiceGenerateRsaKeyPair => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .encryption
                    .generate_rsa_key_pair(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::EncryptionServiceGenerateEciesKeyPair => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .encryption
                    .generate_ecies_key_pair(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::EncryptionServiceEncrypt => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .encryption
                    .encrypt(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::EncryptionServiceDecrypt => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .encryption
                    .decrypt(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::EncryptionServiceGetEncryptionAlg => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .encryption
                    .get_encryption_alg(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::WebhookServiceVerifyWebhookSignature => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .webhook
                    .verify_webhook_signature(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
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
