mod record;
pub mod response_types;
mod webhook;

mod authenticity;
mod availability;
pub mod config;
mod encryption;
mod identity;
mod identity_v2;
mod integrity;
mod keys;

use self::authenticity::server::AuthenticityServer;
use self::availability::server::AvailabilityServer;
use self::encryption::server::EncryptionServer;
use self::identity::server::IdentityServer;
use self::identity_v2::server::IdentityServerV2;
use self::integrity::server::IntegrityServer;
use self::keys::server::KeyServer;
use self::record::server::RecordServer;
use self::response_types::ToResponseType;
use self::webhook::server::WebhookServer;
use crate::error::BridgeError;
use crate::items::AuthenticityServiceHandler;
use crate::items::AvailabilityServiceHandler;
use crate::items::BloockServer;
use crate::items::EncryptionServiceHandler;
use crate::items::IdentityServiceHandler;
use crate::items::IdentityServiceV2Handler;
use crate::items::IntegrityServiceHandler;
use crate::items::KeyServiceHandler;
use crate::items::RecordServiceHandler;
use crate::items::WebhookServiceHandler;
use crate::server::response_types::ResponseType;

pub struct Server {
    authenticity: AuthenticityServer,
    availability: AvailabilityServer,
    encryption: EncryptionServer,
    integrity: IntegrityServer,
    record: RecordServer,
    key: KeyServer,
    identity: IdentityServer,
    identity_v2: IdentityServerV2,
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
            key: KeyServer {},
            identity: IdentityServer {},
            identity_v2: IdentityServerV2 {},
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
            BloockServer::RecordServiceGetDetails => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .get_details(&req)
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
            BloockServer::RecordServiceGetPayload => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .record
                    .get_payload(&req)
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
            BloockServer::KeyServiceGenerateLocalKey => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .generate_local_key(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceGenerateManagedKey => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .generate_managed_key(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceLoadLocalKey => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .load_local_key(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceLoadManagedKey => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .load_managed_key(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceGenerateLocalCertificate => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .generate_local_certificate(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceGenerateManagedCertificate => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .generate_managed_certificate(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceLoadLocalCertificate => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .load_local_certificate(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceLoadManagedCertificate => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .load_managed_certificate(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceImportManagedCertificate => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .import_managed_certificate(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceSetupTotpAccessControl => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .setup_totp_access_control(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceSetupSecretAccessControl => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .setup_secret_access_control(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::KeyServiceRecoverTotpAccessControl => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .key
                    .recover_totp_access_control(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCreateIdentity => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .create_identity(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceLoadIdentity => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .load_identity(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceBuildSchema => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .build_schema(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceGetSchema => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .get_schema(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCreateCredential => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .create_credential(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceGetOffer => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .get_offer(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceWaitOffer => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .wait_offer(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialOfferToJson => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_offer_to_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialOfferFromJson => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_offer_from_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialOfferRedeem => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_offer_redeem(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialToJson => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_to_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialFromJson => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_from_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceVerifyCredential => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .verify_credential(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceRevokeCredential => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .revoke_credential(&req)
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
            BloockServer::IdentityServiceV2CreateCredential => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .create_credential(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2CreateIdentity => {
                let req: crate::items::CreateIdentityV2Request = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .create_identity(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2CreateIssuer => {
                let req: crate::items::CreateIssuerRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .create_issuer(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2BuildSchema => {
                let req: crate::items::BuildSchemaRequestV2 = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .build_schema(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2PublishIssuerState => {
                let req: crate::items::PublishIssuerStateRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .publish_issuer_state(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2RevokeCredential => {
                let req: crate::items::RevokeCredentialRequestV2 =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .revoke_credential(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2CredentialToJson => {
                let req: crate::items::CredentialToJsonRequestV2 =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .credential_to_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2CredentialFromJson => {
                let req: crate::items::CredentialFromJsonRequestV2 =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .credential_from_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2GetCredentialProof => {
                let req: crate::items::GetCredentialProofRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .get_credential_proof(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2GetIssuerByKey => {
                let req: crate::items::GetIssuerByKeyRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .get_issuer_by_key(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2GetSchema => {
                let req: crate::items::GetSchemaRequestV2 = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .get_schema(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2CreateVerification => {
                let req: crate::items::CreateVerificationRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .create_verification(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2WaitVerification => {
                let req: crate::items::WaitVerificationRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .wait_verification(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceV2GetVerificationStatus => {
                let req: crate::items::GetVerificationStatusRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity_v2
                    .get_verification_status(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::Unknown => Err(BridgeError::ServiceNotFound),
        }
    }

    fn serialize_request<T: prost::Message + Default>(
        &self,
        payload: &[u8],
    ) -> Result<T, BridgeError> {
        T::decode(payload).map_err(|e| BridgeError::RequestDeserialization(e.to_string()))
    }
}
