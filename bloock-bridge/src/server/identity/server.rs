use crate::items::{
    BuildSchemaRequest, BuildSchemaResponse, CreateCredentialOfferRequest,
    CreateCredentialOfferResponse, CreateIdentityRequest, CreateIdentityResponse,
    CredentialFromJsonRequest, CredentialFromJsonResponse, CredentialOfferFromJsonRequest,
    CredentialOfferFromJsonResponse, CredentialOfferRedeemRequest, CredentialOfferRedeemResponse,
    CredentialOfferToJsonRequest, CredentialOfferToJsonResponse, CredentialToJsonRequest,
    CredentialToJsonResponse, GetSchemaRequest, GetSchemaResponse, IdentityServiceHandler,
    LoadIdentityRequest, LoadIdentityResponse, RevokeCredentialRequest, RevokeCredentialResponse,
    VerifyCredentialRequest, VerifyCredentialResponse,
};
use async_trait::async_trait;

pub struct IdentityServer {}

#[async_trait(?Send)]
impl IdentityServiceHandler for IdentityServer {
    async fn create_identity(
        &self,
        input: &CreateIdentityRequest,
    ) -> Result<CreateIdentityResponse, String> {
        Err("not implemented".to_string())
    }
    async fn load_identity(
        &self,
        input: &LoadIdentityRequest,
    ) -> Result<LoadIdentityResponse, String> {
        Err("not implemented".to_string())
    }
    async fn build_schema(
        &self,
        input: &BuildSchemaRequest,
    ) -> Result<BuildSchemaResponse, String> {
        Err("not implemented".to_string())
    }
    async fn get_schema(&self, input: &GetSchemaRequest) -> Result<GetSchemaResponse, String> {
        Err("not implemented".to_string())
    }
    async fn create_credential_offer(
        &self,
        input: &CreateCredentialOfferRequest,
    ) -> Result<CreateCredentialOfferResponse, String> {
        Err("not implemented".to_string())
    }
    async fn credential_offer_to_json(
        &self,
        input: &CredentialOfferToJsonRequest,
    ) -> Result<CredentialOfferToJsonResponse, String> {
        Err("not implemented".to_string())
    }
    async fn credential_offer_from_json(
        &self,
        input: &CredentialOfferFromJsonRequest,
    ) -> Result<CredentialOfferFromJsonResponse, String> {
        Err("not implemented".to_string())
    }
    async fn credential_offer_redeem(
        &self,
        input: &CredentialOfferRedeemRequest,
    ) -> Result<CredentialOfferRedeemResponse, String> {
        Err("not implemented".to_string())
    }
    async fn credential_to_json(
        &self,
        input: &CredentialToJsonRequest,
    ) -> Result<CredentialToJsonResponse, String> {
        Err("not implemented".to_string())
    }
    async fn credential_from_json(
        &self,
        input: &CredentialFromJsonRequest,
    ) -> Result<CredentialFromJsonResponse, String> {
        Err("not implemented".to_string())
    }
    async fn verify_credential(
        &self,
        input: &VerifyCredentialRequest,
    ) -> Result<VerifyCredentialResponse, String> {
        Err("not implemented".to_string())
    }
    async fn revoke_credential(
        &self,
        input: &RevokeCredentialRequest,
    ) -> Result<RevokeCredentialResponse, String> {
        Err("not implemented".to_string())
    }
}
