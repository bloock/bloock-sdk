use crate::{
    error::BridgeError,
    items::{
        BuildSchemaRequest, BuildSchemaResponse, CreateCredentialRequest, CreateCredentialResponse,
        CreateIdentityRequest, CreateIdentityResponse, CredentialFromJsonRequest,
        CredentialFromJsonResponse, CredentialOfferFromJsonRequest,
        CredentialOfferFromJsonResponse, CredentialOfferRedeemRequest,
        CredentialOfferRedeemResponse, CredentialOfferToJsonRequest, CredentialOfferToJsonResponse,
        CredentialReceipt, CredentialRevocation, CredentialToJsonRequest, CredentialToJsonResponse,
        CredentialVerification, GetOfferRequest, GetOfferResponse, GetSchemaRequest,
        GetSchemaResponse, Identity, IdentityServiceHandler, LoadIdentityRequest,
        LoadIdentityResponse, RevokeCredentialRequest, RevokeCredentialResponse, Schema,
        VerifyCredentialRequest, VerifyCredentialResponse,
    },
    server::response_types::RequestConfigData,
};
use async_trait::async_trait;
use bloock_core::identity;
use bloock_core::identity::entity::credential::Credential as CoreCredential;
use bloock_core::identity::entity::credential_offer::CredentialOffer as CoreCredentialOffer;

pub struct IdentityServer {}

#[async_trait(?Send)]
impl IdentityServiceHandler for IdentityServer {
    async fn create_identity(
        &self,
        req: &CreateIdentityRequest,
    ) -> Result<CreateIdentityResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());
        let key = client.create_identity().await.map_err(|e| e.to_string())?;

        Ok(CreateIdentityResponse {
            identity: Some(Identity {
                mnemonic: key.mnemonic,
                key: key.key,
                private_key: key.private_key,
            }),
            error: None,
        })
    }
    async fn load_identity(
        &self,
        req: &LoadIdentityRequest,
    ) -> Result<LoadIdentityResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());
        let key = client
            .load_identity(req.mnemonic.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(LoadIdentityResponse {
            identity: Some(Identity {
                mnemonic: key.mnemonic,
                key: key.key,
                private_key: key.private_key,
            }),
            error: None,
        })
    }
    async fn build_schema(&self, req: &BuildSchemaRequest) -> Result<BuildSchemaResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());

        let boolean_attr = req
            .boolean_attributes
            .iter()
            .map(|a| a.id.clone())
            .collect::<Vec<String>>();

        let date_attr = req
            .date_attributes
            .iter()
            .map(|a| a.id.clone())
            .collect::<Vec<String>>();

        let datetime_attr = req
            .datetime_attributes
            .iter()
            .map(|a| a.id.clone())
            .collect::<Vec<String>>();

        let multichoice_attr = req
            .multichoice_attributes
            .iter()
            .map(|a| a.id.clone())
            .collect::<Vec<String>>();

        let number_attr = req
            .number_attributes
            .iter()
            .map(|a| a.id.clone())
            .collect::<Vec<String>>();

        let attributes: Vec<String> = boolean_attr
            .into_iter()
            .chain(date_attr.into_iter())
            .chain(datetime_attr.into_iter())
            .chain(multichoice_attr.into_iter())
            .chain(number_attr.into_iter())
            .collect();

        let schema = client
            .build_schema(
                req.display_name.clone(),
                req.technical_name.clone(),
                attributes,
            )
            .await
            .map_err(|e| e.to_string())?;

        Ok(BuildSchemaResponse {
            schema: Some(Schema {
                id: schema.cid,
                json_ld: schema.json,
            }),
            error: None,
        })
    }
    async fn get_schema(&self, req: &GetSchemaRequest) -> Result<GetSchemaResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());

        let schema = client
            .get_schema(req.id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetSchemaResponse {
            schema: Some(Schema {
                id: schema.cid,
                json_ld: schema.json,
            }),
            error: None,
        })
    }
    async fn create_credential(
        &self,
        req: &CreateCredentialRequest,
    ) -> Result<CreateCredentialResponse, String> {
        let config_data = req.get_config_data()?;
        let client = identity::configure(config_data.clone());

        let boolean_attr = req
            .boolean_attributes
            .iter()
            .map(|a| (a.id.clone(), a.value as i64))
            .collect::<Vec<(String, i64)>>();

        let date_attr = req
            .date_attributes
            .iter()
            .map(|a| (a.id.clone(), a.value))
            .collect::<Vec<(String, i64)>>();

        let datetime_attr = req
            .datetime_attributes
            .iter()
            .map(|a| (a.id.clone(), a.value))
            .collect::<Vec<(String, i64)>>();

        let multichoice_attr = req
            .multichoice_attributes
            .iter()
            .map(|a| (a.id.clone(), 0))
            .collect::<Vec<(String, i64)>>();

        let number_attr = req
            .number_attributes
            .iter()
            .map(|a| (a.id.clone(), a.value))
            .collect::<Vec<(String, i64)>>();

        let attributes: Vec<(String, i64)> = boolean_attr
            .into_iter()
            .chain(date_attr.into_iter())
            .chain(datetime_attr.into_iter())
            .chain(multichoice_attr.into_iter())
            .chain(number_attr.into_iter())
            .collect();

        let receipt = client
            .create_credential(req.schema_id.clone(), req.holder_key.clone(), attributes)
            .await
            .map_err(|e| e.to_string())?;

        Ok(CreateCredentialResponse {
            credential_receipt: Some(CredentialReceipt {
                id: receipt.id,
                anchor_id: receipt.anchor_id,
            }),
            error: None,
        })
    }

    async fn get_offer(&self, req: &GetOfferRequest) -> Result<GetOfferResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());

        let offer = client
            .get_offer(req.id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetOfferResponse {
            offer: Some(offer.into()),
            error: None,
        })
    }
    async fn credential_offer_to_json(
        &self,
        req: &CredentialOfferToJsonRequest,
    ) -> Result<CredentialOfferToJsonResponse, String> {
        let offer: CoreCredentialOffer = req
            .credential_offer
            .clone()
            .ok_or("invalid credential offer provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let json =
            serde_json::to_string(&offer).map_err(|_| "couldn't serialize credential offer")?;

        Ok(CredentialOfferToJsonResponse { json, error: None })
    }
    async fn credential_offer_from_json(
        &self,
        req: &CredentialOfferFromJsonRequest,
    ) -> Result<CredentialOfferFromJsonResponse, String> {
        let offer: CoreCredentialOffer = serde_json::from_str(&req.json)
            .map_err(|e| format!("couldn't deserialize credential offer: {}", e.to_string()))?;

        Ok(CredentialOfferFromJsonResponse {
            credential_offer: Some(offer.into()),
            error: None,
        })
    }
    async fn credential_offer_redeem(
        &self,
        req: &CredentialOfferRedeemRequest,
    ) -> Result<CredentialOfferRedeemResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());

        let offer: CoreCredentialOffer = req
            .credential_offer
            .clone()
            .ok_or("invalid credential offer provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let id = offer
            .body
            .credentials
            .get(0)
            .ok_or("invalid credential offer provided")?
            .id
            .clone();

        let credential = client
            .redeem_credential(id, offer.thid, req.identity_private_key.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(CredentialOfferRedeemResponse {
            credential: Some(credential.into()),
            error: None,
        })
    }
    async fn credential_to_json(
        &self,
        req: &CredentialToJsonRequest,
    ) -> Result<CredentialToJsonResponse, String> {
        let offer: CoreCredential = req
            .credential
            .clone()
            .ok_or("invalid credential provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let json = serde_json::to_string(&offer).map_err(|_| "couldn't serialize credential")?;

        Ok(CredentialToJsonResponse { json, error: None })
    }
    async fn credential_from_json(
        &self,
        req: &CredentialFromJsonRequest,
    ) -> Result<CredentialFromJsonResponse, String> {
        let credential: CoreCredential = serde_json::from_str(&req.json)
            .map_err(|e| format!("couldn't deserialize credential: {}", e.to_string()))?;

        Ok(CredentialFromJsonResponse {
            credential: Some(credential.into()),
            error: None,
        })
    }
    async fn verify_credential(
        &self,
        req: &VerifyCredentialRequest,
    ) -> Result<VerifyCredentialResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());

        let credential: CoreCredential = req
            .credential
            .clone()
            .ok_or("invalid credential offer provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let verification = client
            .verify_credential(credential)
            .await
            .map_err(|e| e.to_string())?;

        Ok(VerifyCredentialResponse {
            result: Some(CredentialVerification {
                timestamp: verification.timestamp as u64,
                issuer: verification.issuer,
                revocation: verification.revocation as u64,
            }),
            error: None,
        })
    }
    async fn revoke_credential(
        &self,
        req: &RevokeCredentialRequest,
    ) -> Result<RevokeCredentialResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity::configure(config_data.clone());

        let credential: CoreCredential = req
            .credential
            .clone()
            .ok_or("invalid credential offer provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let revocation = client
            .revoke_credential(credential)
            .await
            .map_err(|e| e.to_string())?;

        Ok(RevokeCredentialResponse {
            result: Some(CredentialRevocation {
                timestamp: revocation.timestamp as u64,
            }),
            error: None,
        })
    }
}
