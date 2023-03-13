use crate::config::entity::network::Network;
use crate::error::BloockResult;
use crate::integrity::entity::proof::Proof;
use crate::integrity::service::IntegrityService;
use crate::{availability::service::AvailabilityService, config::service::ConfigService};
use bloock_http::Client;
use bloock_identity::did::Did;
use bloock_keys::local::{LocalKey, LocalKeyParams};
use bloock_signer::create_verifier_from_signature;
use bloock_signer::entity::signature::Signature;
use serde_json::{Map, Number, Value};
use std::sync::Arc;

use super::entity::credential::Credential;
use super::entity::credential_offer::CredentialOffer;
use super::entity::credential_verification::CredentialVerification;
use super::entity::dto::create_credential_request::CreateCredentialRequest;
use super::entity::dto::create_credential_response::CreateCredentialResponse;
use super::entity::dto::get_credential_revocation_response::GetCredentialRevocationResponse;
use super::entity::dto::get_offer_response::GetOfferResponse;
use super::entity::dto::redeem_credential_request::RedeemCredentialRequest;
use super::entity::dto::redeem_credential_response::RedeemCredentialResponse;
use super::entity::dto::revoke_credential_request::RevokeCredentialRequest;
use super::entity::dto::revoke_credential_response::RevokeCredentialResponse;
use super::entity::revocation_result::RevocationResult;
use super::{
    entity::{
        dto::{
            create_schema_request::CreateSchemaRequest,
            create_schema_response::CreateSchemaResponse,
        },
        identity::Identity,
        schema::Schema,
    },
    IdentityError,
};

pub struct IdentityService<H: Client> {
    pub http: Arc<H>,
    pub availability_service: AvailabilityService<H>,
    pub integrity_service: IntegrityService<H>,
    pub config_service: ConfigService,
}

impl<H: Client> IdentityService<H> {
    pub async fn create_identity(&self) -> BloockResult<Identity> {
        let key = LocalKey::new(&LocalKeyParams {
            key_type: bloock_keys::KeyType::EcP256k,
        })
        .map_err(|_| IdentityError::CreateKeyError())?;

        let private_key = key.private_key.ok_or(IdentityError::CreateKeyError())?;
        let mnemonic = key.mnemonic.ok_or(IdentityError::CreateKeyError())?;

        Ok(Identity {
            mnemonic,
            key: key.key,
            private_key,
        })
    }

    pub async fn load_identity(&self, mnemonic: String) -> BloockResult<Identity> {
        let key = LocalKey::load_mnemonic(bloock_keys::KeyType::EcP256k, mnemonic)
            .map_err(|_| IdentityError::LoadKeyError())?;

        let private_key = key.private_key.ok_or(IdentityError::CreateKeyError())?;
        let mnemonic = key.mnemonic.ok_or(IdentityError::CreateKeyError())?;

        Ok(Identity {
            mnemonic,
            key: key.key,
            private_key,
        })
    }

    pub async fn build_schema(
        &self,
        display_name: String,
        technical_name: String,
        attributes: Vec<String>,
    ) -> BloockResult<Schema> {
        let req = CreateSchemaRequest {
            attributes,
            schema_name: display_name,
            schema_type: technical_name,
        };

        let res: CreateSchemaResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/issuers/schemas",
                    self.config_service.get_api_base_url()
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateSchemaError(e.to_string()))?;

        self.get_schema(res.cid).await
    }

    pub async fn get_schema(&self, id: String) -> BloockResult<Schema> {
        let res = self
            .availability_service
            .retrieve_ipfs(id.clone())
            .await
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        Ok(Schema {
            cid: id,
            json: json.to_string(),
        })
    }

    pub async fn create_credential(
        &self,
        schema_id: String,
        holder_key: String,
        attributes: Vec<(String, i64)>,
    ) -> BloockResult<CreateCredentialResponse> {
        let mut map = Map::new();

        for attribute in attributes.iter() {
            map.insert(
                attribute.0.clone(),
                Value::Number(Number::from(attribute.1)),
            );
        }

        let credential_subject = Value::Object(map);

        let req = CreateCredentialRequest {
            schema_cid: schema_id,
            credential_subject,
            expiration: 0,
        };

        let did =
            Did::from_public_key(holder_key).map_err(|_| IdentityError::InvalidKeyProvided())?;

        let res: CreateCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/claims?id={}",
                    self.config_service.get_api_base_url(),
                    did.to_string()
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateCredentialError(e.to_string()))?;

        Ok(res)
    }

    pub async fn get_offer(&self, id: String) -> BloockResult<CredentialOffer> {
        let res: GetOfferResponse = self
            .http
            .get_json(
                format!(
                    "{}/identity/v1/claims/{}/offer",
                    self.config_service.get_api_base_url(),
                    id
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetOfferError(e.to_string()))?;

        let offer = res.try_into()?;
        Ok(offer)
    }

    pub async fn redeem_credential(
        &self,
        id: String,
        thread_id: String,
        _holder_private_key: String,
    ) -> BloockResult<Credential> {
        let req = RedeemCredentialRequest {
            thread_id,
            signature: "signature".to_string(),
        };

        let res: RedeemCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identity/v1/claims/{}/redeem",
                    self.config_service.get_api_base_url(),
                    id
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::RedeemCredentialError(e.to_string()))?;

        let credential: Credential = res.try_into()?;
        Ok(credential)
    }

    pub async fn get_claim(&self, id: String) -> BloockResult<Value> {
        let res: Value = self
            .http
            .get_json(
                format!(
                    "{}/identity/v1/claims/{}",
                    self.config_service.get_api_base_url(),
                    id
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetCredentialError(e.to_string()))?;

        Ok(res)
    }

    pub async fn verify_credential(
        &self,
        credential: Credential,
    ) -> BloockResult<CredentialVerification> {
        let timestamp = self
            .verify_credential_integrity(credential.body.proof.1.clone())
            .await?;

        let signature_valid = self
            .verify_credential_signature(credential.body.proof.0.clone())
            .await?;
        // if !signature_valid {
        //     return Err(IdentityError::InvalidSignatureError().into());
        // }

        let revocation = self
            .get_credential_revocation_status(credential.clone())
            .await?;

        Ok(CredentialVerification {
            timestamp,
            issuer: credential.body.issuer,
            revocation,
        })
    }

    pub async fn verify_credential_integrity(&self, proof: Proof) -> BloockResult<u128> {
        let network: Network = proof
            .anchor
            .networks
            .get(0)
            .ok_or(IdentityError::InvalidProofError())?
            .name
            .clone()
            .into();

        let root = self.integrity_service.verify_proof(proof)?;
        let timestamp = self.integrity_service.validate_root(root, network).await?;
        Ok(timestamp)
    }

    pub async fn verify_credential_signature(&self, signature: Signature) -> BloockResult<bool> {
        let verifier = create_verifier_from_signature(
            &signature,
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
        )
        .map_err(|_| IdentityError::InvalidSignatureError())?;

        let valid = verifier
            .verify(&[], signature)
            .await
            .map_err(|_| IdentityError::InvalidSignatureError())?;

        Ok(valid)
    }

    pub async fn get_credential_revocation_status(
        &self,
        credential: Credential,
    ) -> BloockResult<u128> {
        let res: GetCredentialRevocationResponse = self
            .http
            .get_json(credential.body.credential_status.id, None)
            .await
            .map_err(|e| IdentityError::RedeemCredentialError(e.to_string()))?;

        Ok(res.timestamp)
    }

    pub async fn revoke_credential(
        &self,
        credential: Credential,
    ) -> BloockResult<RevocationResult> {
        let req = RevokeCredentialRequest {};

        let res: RevokeCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/revocation/v1/{}/claims/revoke/{}",
                    self.config_service.get_api_base_url(),
                    credential.body.issuer,
                    credential.body.credential_status.revocation_nonce
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::RedeemCredentialError(e.to_string()))?;

        Ok(RevocationResult {
            timestamp: res.timestamp,
        })
    }
}

#[cfg(test)]
mod tests {
    use bloock_http::MockClient;
    use std::sync::Arc;

    #[tokio::test]
    async fn test_create_identity() {
        let http = MockClient::default();
        let service = crate::identity::configure_test(Arc::new(http));

        let identity = service.create_identity().await.unwrap();

        assert_ne!(identity.key, "".to_string());
        assert_ne!(identity.private_key, "".to_string());
        assert_ne!(identity.mnemonic, "".to_string());
    }

    #[tokio::test]
    async fn test_load_identity() {
        let mnemonic = "purse cart ill nothing climb cinnamon example kangaroo forum cause page thunder spend bike grain".to_string();

        let http = MockClient::default();
        let service = crate::identity::configure_test(Arc::new(http));

        let identity = service.load_identity(mnemonic.clone()).await.unwrap();

        assert_eq!(
            identity.key,
            "03e073e1608b3fabfe96d3bdafc80cb13acfbedcc34bf98f9a25c3ef5e5cb6c3d4".to_string()
        );
        assert_eq!(
            identity.private_key,
            "74b4c109fd4043c4e10e6aca50a1e91146407ccc4dff7c99419e16bf3ab89934".to_string()
        );
        assert_eq!(identity.mnemonic, mnemonic);
    }
}
