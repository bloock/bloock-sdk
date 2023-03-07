use crate::items::{
    BuildSchemaRequest, BuildSchemaResponse, CreateCredentialOfferRequest,
    CreateCredentialOfferResponse, CreateIdentityRequest, CreateIdentityResponse, Credential,
    CredentialFromJsonRequest, CredentialFromJsonResponse, CredentialOffer,
    CredentialOfferFromJsonRequest, CredentialOfferFromJsonResponse, CredentialOfferRedeemRequest,
    CredentialOfferRedeemResponse, CredentialOfferToJsonRequest, CredentialOfferToJsonResponse,
    CredentialRevocation, CredentialToJsonRequest, CredentialToJsonResponse,
    CredentialVerification, GetSchemaRequest, GetSchemaResponse, Identity, IdentityServiceHandler,
    LoadIdentityRequest, LoadIdentityResponse, RevokeCredentialRequest, RevokeCredentialResponse,
    Schema, VerifyCredentialRequest, VerifyCredentialResponse,
};
use async_trait::async_trait;

pub struct IdentityServer {}

#[async_trait(?Send)]
impl IdentityServiceHandler for IdentityServer {
    async fn create_identity(
        &self,
        _: &CreateIdentityRequest,
    ) -> Result<CreateIdentityResponse, String> {
        Ok(CreateIdentityResponse {
            identity: Some(Identity {
                mnemonic: "buzz price absent crack usual theme fault credit arena toast thrive pattern wine rough hidden".to_string(),
                key: "1ABC7154748D1CE5144478CDEB574AE244B939B5 ".to_string(),
                private_key: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c9457"
                    .to_string(),
            }),
            error: None,
        })
    }
    async fn load_identity(&self, _: &LoadIdentityRequest) -> Result<LoadIdentityResponse, String> {
        Ok(LoadIdentityResponse {
            identity: Some(Identity {
                mnemonic: "buzz price absent crack usual theme fault credit arena toast thrive pattern wine rough hidden".to_string(),
                key: "1ABC7154748D1CE5144478CDEB574AE244B939B5".to_string(),
                private_key: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c9457"
                    .to_string(),
            }),
            error: None,
        })
    }
    async fn build_schema(&self, _: &BuildSchemaRequest) -> Result<BuildSchemaResponse, String> {
        Ok(BuildSchemaResponse {
            schema: Some(Schema {
                id: "74f75365-edb5-41db-b579-00bd4e3b0e4a".to_string(),
                json_ld: "{}".to_string(),
            }),
            error: None,
        })
    }
    async fn get_schema(&self, _: &GetSchemaRequest) -> Result<GetSchemaResponse, String> {
        Ok(GetSchemaResponse {
            schema: Some(Schema {
                id: "74f75365-edb5-41db-b579-00bd4e3b0e4a".to_string(),
                json_ld: "{}".to_string(),
            }),
            error: None,
        })
    }
    async fn create_credential_offer(
        &self,
        _: &CreateCredentialOfferRequest,
    ) -> Result<CreateCredentialOfferResponse, String> {
        Ok(CreateCredentialOfferResponse {
            credential_offer: Some(CredentialOffer {
                json: "{}".to_string(),
            }),
            error: None,
        })
    }
    async fn credential_offer_to_json(
        &self,
        _: &CredentialOfferToJsonRequest,
    ) -> Result<CredentialOfferToJsonResponse, String> {
        Ok(CredentialOfferToJsonResponse {
            json: "{}".to_string(),
            error: None,
        })
    }
    async fn credential_offer_from_json(
        &self,
        _: &CredentialOfferFromJsonRequest,
    ) -> Result<CredentialOfferFromJsonResponse, String> {
        Ok(CredentialOfferFromJsonResponse {
            credential_offer: Some(CredentialOffer {
                json: "{}".to_string(),
            }),
            error: None,
        })
    }
    async fn credential_offer_redeem(
        &self,
        _: &CredentialOfferRedeemRequest,
    ) -> Result<CredentialOfferRedeemResponse, String> {
        Ok(CredentialOfferRedeemResponse {
            credential: Some(Credential {
                json: "{}".to_string(),
            }),
            error: None,
        })
    }
    async fn credential_to_json(
        &self,
        _: &CredentialToJsonRequest,
    ) -> Result<CredentialToJsonResponse, String> {
        Ok(CredentialToJsonResponse {
            json: "{}".to_string(),
            error: None,
        })
    }
    async fn credential_from_json(
        &self,
        _: &CredentialFromJsonRequest,
    ) -> Result<CredentialFromJsonResponse, String> {
        Ok(CredentialFromJsonResponse {
            credential: Some(Credential {
                json: "{}".to_string(),
            }),
            error: None,
        })
    }
    async fn verify_credential(
        &self,
        _: &VerifyCredentialRequest,
    ) -> Result<VerifyCredentialResponse, String> {
        Ok(VerifyCredentialResponse {
            result: Some(CredentialVerification {
                timestamp: 1678220074,
                issuer: "1ABC7154748D1CE5144478CDEB574AE244B939B5".to_string(),
                revocation: 0,
            }),
            error: None,
        })
    }
    async fn revoke_credential(
        &self,
        _: &RevokeCredentialRequest,
    ) -> Result<RevokeCredentialResponse, String> {
        Ok(RevokeCredentialResponse {
            result: Some(CredentialRevocation {
                timestamp: 1678220074,
            }),
            error: None,
        })
    }
}
