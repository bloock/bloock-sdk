use crate::items::BuildSchemaResponseV2;
use crate::items::CreateCredentialResponseV2;
use crate::items::CreateIdentityV2Response;
use crate::items::CreateIssuerResponse;
use crate::items::CreateVerificationResponse;
use crate::items::CredentialFromJsonResponseV2;
use crate::items::CredentialToJsonResponseV2;
use crate::items::DecryptResponse;
use crate::items::EncryptResponse;
use crate::items::EncryptionAlgResponse;
use crate::items::GenerateLocalCertificateResponse;
use crate::items::GenerateLocalKeyResponse;
use crate::items::GenerateManagedCertificateResponse;
use crate::items::GenerateManagedKeyResponse;
use crate::items::GetAnchorResponse;
use crate::items::GetCredentialProofResponse;
use crate::items::GetDetailsResponse;
use crate::items::GetHashResponse;
use crate::items::GetIssuerByKeyResponse;
use crate::items::GetOfferResponse;
use crate::items::GetPayloadResponse;
use crate::items::GetProofResponse;
use crate::items::GetSchemaResponseV2;
use crate::items::GetSignaturesResponse;
use crate::items::GetVerificationStatusResponse;
use crate::items::ImportManagedCertificateResponse;
use crate::items::LoadLocalCertificateResponse;
use crate::items::LoadLocalKeyResponse;
use crate::items::LoadManagedCertificateResponse;
use crate::items::LoadManagedKeyResponse;
use crate::items::PublishIssuerStateResponse;
use crate::items::PublishResponse;
use crate::items::RecordBuilderResponse;
use crate::items::RecoverOtpAccessControlResponse;
use crate::items::RetrieveResponse;
use crate::items::RevokeCredentialResponseV2;
use crate::items::SendRecordsResponse;
use crate::items::SetProofResponse;
use crate::items::SetupOtpAccessControlResponse;
use crate::items::SetupSecretAccessControlResponse;
use crate::items::SignResponse;
use crate::items::ValidateRootResponse;
use crate::items::VerifyProofResponse;
use crate::items::VerifyRecordsResponse;
use crate::items::VerifyResponse;
use crate::items::VerifyWebhookSignatureResponse;
use crate::items::WaitAnchorResponse;
use crate::items::WaitOfferResponse;
use crate::items::WaitVerificationResponse;
use crate::items::{
    BuildSchemaResponse, CreateCredentialResponse, CreateIdentityResponse,
    CredentialFromJsonResponse, CredentialOfferFromJsonResponse, CredentialOfferRedeemResponse,
    CredentialOfferToJsonResponse, CredentialToJsonResponse, GetSchemaResponse,
    LoadIdentityResponse, RevokeCredentialResponse, VerifyCredentialResponse,
};
use crate::server::BridgeError;
use async_trait::async_trait;
use bloock_core::config::config_data::ConfigData;
use prost::Message;

#[allow(clippy::enum_variant_names)]
pub enum ResponseType {
    GetAnchorResponse(GetAnchorResponse),
    WaitAnchorResponse(WaitAnchorResponse),
    SendRecordsResponse(SendRecordsResponse),
    GetProofResponse(GetProofResponse),
    SetProofResponse(SetProofResponse),
    ValidateRootResponse(ValidateRootResponse),
    VerifyProofResponse(VerifyProofResponse),
    VerifyRecordsResponse(VerifyRecordsResponse),
    SignResponse(SignResponse),
    VerifyResponse(VerifyResponse),
    GetSignaturesResponse(GetSignaturesResponse),
    EncryptResponse(EncryptResponse),
    DecryptResponse(DecryptResponse),
    EncryptionAlgResponse(EncryptionAlgResponse),
    RecordBuilderResponse(RecordBuilderResponse),
    GetDetailsResponse(GetDetailsResponse),
    GetHashResponse(GetHashResponse),
    GetPayloadResponse(GetPayloadResponse),
    PublishResponse(PublishResponse),
    RetrieveResponse(RetrieveResponse),
    GenerateLocalKeyResponse(GenerateLocalKeyResponse),
    GenerateManagedKeyResponse(GenerateManagedKeyResponse),
    LoadLocalKeyResponse(LoadLocalKeyResponse),
    LoadManagedKeyResponse(LoadManagedKeyResponse),
    SetupOtpAccessControlResponse(SetupOtpAccessControlResponse),
    RecoverOtpAccessControlResponse(RecoverOtpAccessControlResponse),
    SetupSecretAccessControlResponse(SetupSecretAccessControlResponse),
    CreateIdentityResponse(CreateIdentityResponse),
    LoadIdentityResponse(LoadIdentityResponse),
    BuildSchemaResponse(BuildSchemaResponse),
    GetSchemaResponse(GetSchemaResponse),
    WaitOfferResponse(WaitOfferResponse),
    CreateCredentialResponse(CreateCredentialResponse),
    GetOfferResponse(GetOfferResponse),
    CredentialOfferToJsonResponse(CredentialOfferToJsonResponse),
    CredentialOfferFromJsonResponse(CredentialOfferFromJsonResponse),
    CredentialOfferRedeemResponse(CredentialOfferRedeemResponse),
    CredentialToJsonResponse(CredentialToJsonResponse),
    CredentialFromJsonResponse(CredentialFromJsonResponse),
    VerifyCredentialResponse(VerifyCredentialResponse),
    RevokeCredentialResponse(RevokeCredentialResponse),
    VerifyWebhookSignatureResponse(VerifyWebhookSignatureResponse),
    CreateCredentialResponseV2(CreateCredentialResponseV2),
    CreateIdentityV2Response(CreateIdentityV2Response),
    CreateIssuerResponse(CreateIssuerResponse),
    BuildSchemaResponseV2(BuildSchemaResponseV2),
    PublishIssuerStateResponse(PublishIssuerStateResponse),
    RevokeCredentialResponseV2(RevokeCredentialResponseV2),
    CredentialToJsonResponseV2(CredentialToJsonResponseV2),
    CredentialFromJsonResponseV2(CredentialFromJsonResponseV2),
    GetCredentialProofResponse(GetCredentialProofResponse),
    GetIssuerByKeyResponse(GetIssuerByKeyResponse),
    GenerateLocalCertificateResponse(GenerateLocalCertificateResponse),
    GenerateManagedCertificateResponse(GenerateManagedCertificateResponse),
    LoadLocalCertificateResponse(LoadLocalCertificateResponse),
    LoadManagedCertificateResponse(LoadManagedCertificateResponse),
    ImportManagedCertificateResponse(ImportManagedCertificateResponse),
    GetSchemaResponseV2(GetSchemaResponseV2),
    CreateVerificationResponse(CreateVerificationResponse),
    WaitVerificationResponse(WaitVerificationResponse),
    GetVerificationStatusResponse(GetVerificationStatusResponse),
}

impl ResponseType {
    pub fn get_bytes(&self) -> Result<Vec<u8>, BridgeError> {
        let mut result_vec = Vec::new();
        result_vec.reserve(self.len());

        match self {
            ResponseType::GetAnchorResponse(r) => r.encode(&mut result_vec),
            ResponseType::WaitAnchorResponse(r) => r.encode(&mut result_vec),
            ResponseType::SendRecordsResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetProofResponse(r) => r.encode(&mut result_vec),
            ResponseType::SetProofResponse(r) => r.encode(&mut result_vec),
            ResponseType::ValidateRootResponse(r) => r.encode(&mut result_vec),
            ResponseType::VerifyProofResponse(r) => r.encode(&mut result_vec),
            ResponseType::VerifyRecordsResponse(r) => r.encode(&mut result_vec),
            ResponseType::SignResponse(r) => r.encode(&mut result_vec),
            ResponseType::VerifyResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetSignaturesResponse(r) => r.encode(&mut result_vec),
            ResponseType::EncryptResponse(r) => r.encode(&mut result_vec),
            ResponseType::DecryptResponse(r) => r.encode(&mut result_vec),
            ResponseType::EncryptionAlgResponse(r) => r.encode(&mut result_vec),
            ResponseType::RecordBuilderResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetDetailsResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetHashResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetPayloadResponse(r) => r.encode(&mut result_vec),
            ResponseType::PublishResponse(r) => r.encode(&mut result_vec),
            ResponseType::RetrieveResponse(r) => r.encode(&mut result_vec),
            ResponseType::GenerateLocalKeyResponse(r) => r.encode(&mut result_vec),
            ResponseType::GenerateManagedKeyResponse(r) => r.encode(&mut result_vec),
            ResponseType::LoadLocalKeyResponse(r) => r.encode(&mut result_vec),
            ResponseType::LoadManagedKeyResponse(r) => r.encode(&mut result_vec),
            ResponseType::SetupOtpAccessControlResponse(r) => r.encode(&mut result_vec),
            ResponseType::RecoverOtpAccessControlResponse(r) => r.encode(&mut result_vec),
            ResponseType::SetupSecretAccessControlResponse(r) => r.encode(&mut result_vec),
            ResponseType::VerifyWebhookSignatureResponse(r) => r.encode(&mut result_vec),
            ResponseType::CreateIdentityResponse(r) => r.encode(&mut result_vec),
            ResponseType::LoadIdentityResponse(r) => r.encode(&mut result_vec),
            ResponseType::BuildSchemaResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetSchemaResponse(r) => r.encode(&mut result_vec),
            ResponseType::CreateCredentialResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetOfferResponse(r) => r.encode(&mut result_vec),
            ResponseType::WaitOfferResponse(r) => r.encode(&mut result_vec),
            ResponseType::CredentialOfferToJsonResponse(r) => r.encode(&mut result_vec),
            ResponseType::CredentialOfferFromJsonResponse(r) => r.encode(&mut result_vec),
            ResponseType::CredentialOfferRedeemResponse(r) => r.encode(&mut result_vec),
            ResponseType::CredentialToJsonResponse(r) => r.encode(&mut result_vec),
            ResponseType::CredentialFromJsonResponse(r) => r.encode(&mut result_vec),
            ResponseType::VerifyCredentialResponse(r) => r.encode(&mut result_vec),
            ResponseType::RevokeCredentialResponse(r) => r.encode(&mut result_vec),
            ResponseType::CreateCredentialResponseV2(r) => r.encode(&mut result_vec),
            ResponseType::CreateIdentityV2Response(r) => r.encode(&mut result_vec),
            ResponseType::CreateIssuerResponse(r) => r.encode(&mut result_vec),
            ResponseType::BuildSchemaResponseV2(r) => r.encode(&mut result_vec),
            ResponseType::PublishIssuerStateResponse(r) => r.encode(&mut result_vec),
            ResponseType::RevokeCredentialResponseV2(r) => r.encode(&mut result_vec),
            ResponseType::CredentialToJsonResponseV2(r) => r.encode(&mut result_vec),
            ResponseType::CredentialFromJsonResponseV2(r) => r.encode(&mut result_vec),
            ResponseType::GetCredentialProofResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetIssuerByKeyResponse(r) => r.encode(&mut result_vec),
            ResponseType::GenerateLocalCertificateResponse(r) => r.encode(&mut result_vec),
            ResponseType::GenerateManagedCertificateResponse(r) => r.encode(&mut result_vec),
            ResponseType::LoadLocalCertificateResponse(r) => r.encode(&mut result_vec),
            ResponseType::LoadManagedCertificateResponse(r) => r.encode(&mut result_vec),
            ResponseType::ImportManagedCertificateResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetSchemaResponseV2(r) => r.encode(&mut result_vec),
            ResponseType::CreateVerificationResponse(r) => r.encode(&mut result_vec),
            ResponseType::WaitVerificationResponse(r) => r.encode(&mut result_vec),
            ResponseType::GetVerificationStatusResponse(r) => r.encode(&mut result_vec),
        }
        .map_err(|e| BridgeError::ResponseSerialization(e.to_string()))?;

        Ok(result_vec)
    }

    pub fn len(&self) -> usize {
        match self {
            ResponseType::GetAnchorResponse(r) => r.encoded_len(),
            ResponseType::WaitAnchorResponse(r) => r.encoded_len(),
            ResponseType::SendRecordsResponse(r) => r.encoded_len(),
            ResponseType::GetProofResponse(r) => r.encoded_len(),
            ResponseType::SetProofResponse(r) => r.encoded_len(),
            ResponseType::ValidateRootResponse(r) => r.encoded_len(),
            ResponseType::VerifyProofResponse(r) => r.encoded_len(),
            ResponseType::VerifyRecordsResponse(r) => r.encoded_len(),
            ResponseType::SignResponse(r) => r.encoded_len(),
            ResponseType::VerifyResponse(r) => r.encoded_len(),
            ResponseType::GetSignaturesResponse(r) => r.encoded_len(),
            ResponseType::EncryptResponse(r) => r.encoded_len(),
            ResponseType::DecryptResponse(r) => r.encoded_len(),
            ResponseType::EncryptionAlgResponse(r) => r.encoded_len(),
            ResponseType::RecordBuilderResponse(r) => r.encoded_len(),
            ResponseType::GetDetailsResponse(r) => r.encoded_len(),
            ResponseType::GetHashResponse(r) => r.encoded_len(),
            ResponseType::GetPayloadResponse(r) => r.encoded_len(),
            ResponseType::PublishResponse(r) => r.encoded_len(),
            ResponseType::RetrieveResponse(r) => r.encoded_len(),
            ResponseType::GenerateLocalKeyResponse(r) => r.encoded_len(),
            ResponseType::GenerateManagedKeyResponse(r) => r.encoded_len(),
            ResponseType::LoadLocalKeyResponse(r) => r.encoded_len(),
            ResponseType::LoadManagedKeyResponse(r) => r.encoded_len(),
            ResponseType::SetupOtpAccessControlResponse(r) => r.encoded_len(),
            ResponseType::RecoverOtpAccessControlResponse(r) => r.encoded_len(),
            ResponseType::SetupSecretAccessControlResponse(r) => r.encoded_len(),
            ResponseType::VerifyWebhookSignatureResponse(r) => r.encoded_len(),
            ResponseType::CreateIdentityResponse(r) => r.encoded_len(),
            ResponseType::LoadIdentityResponse(r) => r.encoded_len(),
            ResponseType::BuildSchemaResponse(r) => r.encoded_len(),
            ResponseType::GetSchemaResponse(r) => r.encoded_len(),
            ResponseType::CreateCredentialResponse(r) => r.encoded_len(),
            ResponseType::GetOfferResponse(r) => r.encoded_len(),
            ResponseType::WaitOfferResponse(r) => r.encoded_len(),
            ResponseType::CredentialOfferToJsonResponse(r) => r.encoded_len(),
            ResponseType::CredentialOfferFromJsonResponse(r) => r.encoded_len(),
            ResponseType::CredentialOfferRedeemResponse(r) => r.encoded_len(),
            ResponseType::CredentialToJsonResponse(r) => r.encoded_len(),
            ResponseType::CredentialFromJsonResponse(r) => r.encoded_len(),
            ResponseType::VerifyCredentialResponse(r) => r.encoded_len(),
            ResponseType::RevokeCredentialResponse(r) => r.encoded_len(),
            ResponseType::CreateCredentialResponseV2(r) => r.encoded_len(),
            ResponseType::CreateIdentityV2Response(r) => r.encoded_len(),
            ResponseType::CreateIssuerResponse(r) => r.encoded_len(),
            ResponseType::BuildSchemaResponseV2(r) => r.encoded_len(),
            ResponseType::PublishIssuerStateResponse(r) => r.encoded_len(),
            ResponseType::RevokeCredentialResponseV2(r) => r.encoded_len(),
            ResponseType::CredentialToJsonResponseV2(r) => r.encoded_len(),
            ResponseType::CredentialFromJsonResponseV2(r) => r.encoded_len(),
            ResponseType::GetCredentialProofResponse(r) => r.encoded_len(),
            ResponseType::GetIssuerByKeyResponse(r) => r.encoded_len(),
            ResponseType::GenerateLocalCertificateResponse(r) => r.encoded_len(),
            ResponseType::GenerateManagedCertificateResponse(r) => r.encoded_len(),
            ResponseType::LoadLocalCertificateResponse(r) => r.encoded_len(),
            ResponseType::LoadManagedCertificateResponse(r) => r.encoded_len(),
            ResponseType::ImportManagedCertificateResponse(r) => r.encoded_len(),
            ResponseType::GetSchemaResponseV2(r) => r.encoded_len(),
            ResponseType::CreateVerificationResponse(r) => r.encoded_len(),
            ResponseType::WaitVerificationResponse(r) => r.encoded_len(),
            ResponseType::GetVerificationStatusResponse(r) => r.encoded_len(),
        }
    }
}

#[async_trait(?Send)]
pub trait ToResponseType<T> {
    async fn to_response_type(self, req: &T) -> ResponseType;
}

pub trait RequestConfigData {
    fn get_config_data(&self) -> Result<ConfigData, String>;
}

#[async_trait(?Send)]
pub trait ResponseTypeError<R> {
    fn build_error(err: String) -> Self;
}

#[async_trait(?Send)]
pub trait ResponseTypeEvent<R>
where
    Self: Clone + ResponseTypeError<R>,
    R: RequestConfigData,
{
    async fn new_success(_request: &R, response: Self) -> Self {
        response
    }

    async fn new_error(_request: &R, err: String) -> Self {
        Self::build_error(err)
    }
}
