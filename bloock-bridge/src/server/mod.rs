mod record;
pub mod response_types;
mod webhook;

mod authenticity;
mod availability;
pub mod config;
mod encryption;
mod identity;
mod identity_core;
mod integrity;
mod keys;

use self::authenticity::server::AuthenticityServer;
use self::availability::server::AvailabilityServer;
use self::encryption::server::EncryptionServer;
use self::identity::server::IdentityServer;
use self::identity_core::server::IdentityCoreServer;
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
use crate::items::IdentityCoreServiceHandler;
use crate::items::IdentityServiceHandler;
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
    identity_core: IdentityCoreServer,
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
            identity_core: IdentityCoreServer {},
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
            BloockServer::WebhookServiceVerifyWebhookSignature => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .webhook
                    .verify_webhook_signature(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityCoreServiceCreateCoreCredential => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity_core
                    .create_core_credential(&req)
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
            BloockServer::IdentityServiceGetCredential => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .get_credential(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceGetCredentialOffer => {
                let req = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .get_credential_offer(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCreateHolder => {
                let req: crate::items::CreateHolderRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .create_holder(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCreateIssuer => {
                let req: crate::items::CreateIssuerRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .create_issuer(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceBuildSchema => {
                let req: crate::items::BuildSchemaRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .build_schema(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceForcePublishIssuerState => {
                let req: crate::items::ForcePublishIssuerStateRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .force_publish_issuer_state(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceRevokeCredential => {
                let req: crate::items::RevokeCredentialRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .revoke_credential(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialToJson => {
                let req: crate::items::CredentialToJsonRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_to_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCredentialFromJson => {
                let req: crate::items::CredentialFromJsonRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .credential_from_json(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceGetCredentialProof => {
                let req: crate::items::GetCredentialProofRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .get_credential_proof(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceImportIssuer => {
                let req: crate::items::ImportIssuerRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .import_issuer(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceGetSchema => {
                let req: crate::items::GetSchemaRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .get_schema(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceCreateVerification => {
                let req: crate::items::CreateVerificationRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .create_verification(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceWaitVerification => {
                let req: crate::items::WaitVerificationRequest = self.serialize_request(payload)?;
                Ok(self
                    .identity
                    .wait_verification(&req)
                    .await
                    .to_response_type(&req)
                    .await)
            }
            BloockServer::IdentityServiceGetVerificationStatus => {
                let req: crate::items::GetVerificationStatusRequest =
                    self.serialize_request(payload)?;
                Ok(self
                    .identity
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
