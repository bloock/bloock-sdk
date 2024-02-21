use super::{
    entity::{
        create_credential_receipt::CreateCredentialReceipt,
        credential::Credential,
        did_method::DidMethod,
        dto::{
            create_credential_api_managed_request::{
                CreateCredentialApiManagedRequest, CredentialSubjectValue,
            },
            create_credential_api_managed_response::CreateCredentialApiManagedResponse,
            create_identity_request::CreateIdentityRequest,
            create_identity_response::CreateIdentityResponse,
            create_issuer_request::CreateIssuerRequest,
            create_issuer_response::CreateIssuerResponse,
            create_schema_request::CreateSchemaRequest,
            create_schema_response::CreateSchemaResponse,
            create_verification_response::CreateVerificationResponse,
            get_credential_proof_response::GetCredentialProofResponse,
            get_issuer_by_key_response::GetIssuerByKeyResponse,
            get_issuer_new_state_response::GetIssuerNewStateResponse,
            get_verification_status_response::GetVerificationStatusResponse,
            publish_issuer_state_request::PublishIssuerStateRequest,
            publish_issuer_state_response::PublishIssuerStateResponse,
            revoke_credential_request::RevokeCredentialRequest,
            revoke_credential_response::RevokeCredentialResponse,
            update_draft_state_signature_request::UpdateDraftStateSignatureRequest,
            update_draft_state_signature_response::UpdateDraftStateSignatureResponse,
        },
        proof::CredentialProof,
        publish_interval::PublishInterval,
        revocation_result::RevocationResult,
        schema::{Attribute, Schema},
        verification_result::VerificationResult,
    },
    IdentityError,
};
use crate::{
    availability::service::AvailabilityService,
    config::service::ConfigService,
    error::{BloockResult, InfrastructureError},
    integrity::service::IntegrityService,
    shared::util,
};
use async_std::task;
use bloock_hasher::HashAlg;
use bloock_http::Client;
use bloock_identity_rs::{
    did::parse_did,
    schema::{get_json_ld_context_from_json, get_schema_type_from_json, parse_to_schema_cid},
};
use bloock_keys::entity::key::Key;
use serde_json::{json, Map, Value};
use std::{sync::Arc, time::Duration};
use url::Url;

pub struct IdentityService<H: Client> {
    pub http: Arc<H>,
    pub availability_service: AvailabilityService<H>,
    pub integrity_service: IntegrityService<H>,
    pub config_service: ConfigService,
}

impl<H: Client> IdentityService<H> {
    pub async fn create_identity(
        &self,
        public_key: String,
        did_method: DidMethod,
    ) -> BloockResult<CreateIdentityResponse> {
        let req = CreateIdentityRequest {
            did_method: did_method.get_did_method(),
            bn_128_public_key: public_key,
        };

        let res: CreateIdentityResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/identities",
                    self.config_service.get_api_base_url(),
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateIdentityError(e.to_string()))?;

        Ok(res)
    }

    pub async fn create_issuer(
        &self,
        public_key: String,
        did_method: DidMethod,
        name: Option<String>,
        description: Option<String>,
        image: Option<String>,
        interval: PublishInterval,
        key_reference: String,
    ) -> BloockResult<CreateIssuerResponse> {
        let req = CreateIssuerRequest {
            did_method: did_method.get_did_method(),
            bn_128_public_key: public_key,
            name,
            description,
            image,
            publish_interval: interval.get_publish_interval(),
            key: key_reference,
        };

        let res: CreateIssuerResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/issuers",
                    self.config_service.get_api_base_url(),
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateIssuerError(e.to_string()))?;

        Ok(res)
    }

    pub async fn import_issuer(
        &self,
        public_key: String,
        did_method: DidMethod,
    ) -> BloockResult<String> {
        let res: GetIssuerByKeyResponse = self
            .http
            .get_json(
                format!(
                    "{}/identityV2/v1/issuers/key/{}?did_method={}",
                    self.config_service.get_api_base_url(),
                    public_key,
                    did_method.get_did_method(),
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::ImportIssuerError(e.to_string()))?;

        Ok(res.did)
    }

    pub async fn build_schema(
        &self,
        display_name: String,
        schema_type: String,
        version: String,
        description: String,
        attributes: Vec<Attribute>,
    ) -> BloockResult<Schema> {
        let mut attr = Map::new();
        for a in attributes {
            let r#type = a.r#type;
            let r#enum = a.r#enum.unwrap_or(vec![]);
            attr.insert(a.name, json!({ "data_type": r#type, "title": a.title, "description": a.description, "required": a.required, "enum": r#enum }));
        }

        let req = CreateSchemaRequest {
            attributes: serde_json::to_value(attr)
                .map_err(|e| IdentityError::CreateSchemaError(e.to_string()))?,
            schema_type,
            title: display_name,
            version,
            description,
        };

        let res: CreateSchemaResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/schemas",
                    self.config_service.get_api_base_url(),
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateSchemaError(e.to_string()))?;

        self.get_schema(res.cid_json).await
    }

    pub async fn create_credential(
        &self,
        schema_id: String,
        holder_did: String,
        expiration: i64,
        version: Option<i32>,
        attributes: Vec<(String, Value)>,
        key_id: String,
    ) -> BloockResult<CreateCredentialReceipt> {
        let api_managed_host = match self.config_service.get_identity_api_host() {
            Some(host) => host,
            None => Err(IdentityError::EmptyApiHostError())?,
        };
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityError::CreateCredentialError(e.to_string()));

        let version = match version {
            Some(v) => v,
            None => 0,
        };

        let req_attributes: Vec<CredentialSubjectValue> = attributes
            .into_iter()
            .map(|(key, value)| CredentialSubjectValue { key, value })
            .collect();

        let req = CreateCredentialApiManagedRequest {
            schema_id: schema_id.clone(),
            holder_did,
            credential_subject: req_attributes,
            expiration,
            version,
        };

        let headers = vec![("Content-Type".to_owned(), "application/json".to_string())];

        let res: CreateCredentialApiManagedResponse = self
            .http
            .post_json(
                format!("{}/v1/credentials?issuer_key={}", api_managed_host, key_id),
                req,
                Some(headers),
            )
            .await
            .map_err(|e| IdentityError::CreateCredentialError(e.to_string()))?;

        let credential = self.get_credential(res.id.clone()).await?;

        let schema_json = self.get_schema(schema_id.clone()).await?;

        Ok(CreateCredentialReceipt {
            credential,
            credential_id: res.id,
            schema_type: schema_json.schema_type,
        })
    }

    pub async fn get_credential(&self, credential_id: String) -> BloockResult<Credential> {
        let api_managed_host = match self.config_service.get_identity_api_host() {
            Some(host) => host,
            None => Err(IdentityError::EmptyApiHostError())?,
        };
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityError::GetCredentialError(e.to_string()));
        let receipt: Value = self
            .http
            .get_json(
                format!("{}/v1/credentials/{}", api_managed_host, credential_id,),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetCredentialError(e.to_string()))?;

        let credential: Credential = serde_json::from_value(receipt)
            .map_err(|e| IdentityError::GetCredentialError(e.to_string()))?;

        Ok(credential)
    }

    pub async fn get_credential_offer(
        &self,
        credential_id: String,
        key_id: String,
    ) -> BloockResult<String> {
        let api_managed_host = match self.config_service.get_identity_api_host() {
            Some(host) => host,
            None => Err(IdentityError::EmptyApiHostError())?,
        };
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityError::GetCredentialOfferError(e.to_string()));

        let receipt: Value = self
            .http
            .get_json(
                format!(
                    "{}/v1/credentials/{}/offer?issuer_key={}",
                    api_managed_host, credential_id, key_id
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetCredentialOfferError(e.to_string()))?;

        Ok(receipt.to_string())
    }

    pub async fn get_schema(&self, id: String) -> BloockResult<Schema> {
        let schema_cid = parse_to_schema_cid(id.clone())
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;
        let res = self
            .availability_service
            .retrieve_ipfs(schema_cid)
            .await
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        let cid_json_ld = get_json_ld_context_from_json(json.to_string().clone())
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        let schema_type = get_schema_type_from_json(json.to_string().clone())
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        Ok(Schema {
            cid: id,
            cid_json_ld,
            schema_type,
            json: json.to_string(),
        })
    }

    pub async fn get_schema_json_ld(&self, id: String) -> BloockResult<String> {
        let schema_cid = parse_to_schema_cid(id.clone())
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;
        let res = self
            .availability_service
            .retrieve_ipfs(schema_cid)
            .await
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityError::SchemaParseError(e.to_string()))?;

        Ok(json.to_string())
    }

    pub async fn force_publish_issuer_state(
        &self,
        issuer_did: String,
        key: Key,
    ) -> BloockResult<PublishIssuerStateResponse> {
        parse_did(issuer_did.clone())
            .map_err(|e| IdentityError::PublishIssuerStateError(e.to_string()))?;

        let res: GetIssuerNewStateResponse = self
            .http
            .get_json(
                format!(
                    "{}/identityV2/v1/{}/state",
                    self.config_service.get_api_base_url(),
                    issuer_did.to_string()
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::PublishIssuerStateError(e.to_string()))?;
        let new_state_hash = res.new_state;
        if new_state_hash.is_empty() {
            return Err(IdentityError::ErrorUnprocessedState()).map_err(|e| e.into());
        }
        let new_state_hash_decoded = hex::decode(new_state_hash.clone())
            .map_err(|e| IdentityError::PublishIssuerStateError(e.to_string()))?;

        let signature = bloock_signer::sign(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
            &new_state_hash_decoded,
            &key,
            Some(HashAlg::None),
            None,
        )
        .await
        .map_err(|e| IdentityError::PublishIssuerStateError(e.to_string()))?;

        let req = PublishIssuerStateRequest {
            new_state_hash: new_state_hash.clone(),
            bn_128_signature: signature.signature,
        };

        let res: PublishIssuerStateResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/{}/state/publish",
                    self.config_service.get_api_base_url(),
                    issuer_did.to_string(),
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::PublishIssuerStateError(e.to_string()))?;

        Ok(res)
    }

    pub async fn get_credential_proof(
        &self,
        issuer_did: String,
        credential_id: String,
    ) -> BloockResult<CredentialProof> {
        parse_did(issuer_did.clone())
            .map_err(|e| IdentityError::GetCredentialProofError(e.to_string()))?;

        let proof: GetCredentialProofResponse = self
            .http
            .get_json(
                format!(
                    "{}/identityV2/v1/{}/claims/{}/proof",
                    self.config_service.get_api_base_url(),
                    issuer_did,
                    credential_id,
                ),
                None,
            )
            .await
            .map_err(|e| IdentityError::GetCredentialProofError(e.to_string()))?;

        let credential_proof: CredentialProof = serde_json::from_value(proof.proof)
            .map_err(|e| IdentityError::CreateCredentialError(e.to_string()))?;

        Ok(credential_proof)
    }

    pub async fn revoke_credential(
        &self,
        credential: Credential,
        key: Key,
    ) -> BloockResult<RevocationResult> {
        parse_did(credential.issuer.clone())
            .map_err(|e| IdentityError::RevokeCredentialError(e.to_string()))?;

        let req = RevokeCredentialRequest {};

        let res: RevokeCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/{}/claims/revoke/{}",
                    self.config_service.get_api_base_url(),
                    credential.issuer.clone(),
                    credential.credential_status.revocation_nonce,
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityError::RevokeCredentialError(e.to_string()))?;

        if !res.success {
            return Err(
                IdentityError::RevokeCredentialError("unsuccess response".to_string()).into(),
            );
        }

        self.update_draft_state_signature(res.new_state, credential.issuer.clone(), &key)
            .await?;

        Ok(RevocationResult { success: true })
    }

    pub async fn update_draft_state_signature(
        &self,
        new_state: String,
        issuer_did: String,
        key: &Key,
    ) -> Result<bool, IdentityError> {
        let new_state_decoded = hex::decode(new_state.clone())
            .map_err(|e| IdentityError::UpdateDraftStateSignatureError(e.to_string()))?;

        let state_signature = bloock_signer::sign(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
            &new_state_decoded,
            &key,
            Some(HashAlg::None),
            None,
        )
        .await
        .map_err(|e| IdentityError::UpdateDraftStateSignatureError(e.to_string()))?;

        let new_state_req = UpdateDraftStateSignatureRequest {
            new_state_hash: new_state.clone(),
            bn_128_signature: state_signature.signature,
        };

        let new_state_res: UpdateDraftStateSignatureResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/{}/state",
                    self.config_service.get_api_base_url(),
                    issuer_did.to_string(),
                ),
                new_state_req,
                None,
            )
            .await
            .map_err(|e| IdentityError::UpdateDraftStateSignatureError(e.to_string()))?;

        if !new_state_res.success {
            return Err(IdentityError::UpdateDraftStateSignatureError(
                "unsuccess response".to_string(),
            ));
        }

        return Ok(true);
    }

    pub async fn create_verification(
        &self,
        proof_request: String,
    ) -> BloockResult<VerificationResult> {
        let api_managed_host = match self.config_service.get_identity_api_host() {
            Some(host) => host,
            None => Err(IdentityError::EmptyApiHostError())?,
        };
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityError::CreateVerificationError(e.to_string()));

        let payload: Value =
            serde_json::from_str(&proof_request.clone()).map_err(|_| IdentityError::InvalidJson)?;

        let res: CreateVerificationResponse = self
            .http
            .post_json(
                format!("{}/v1/verifications", api_managed_host,),
                payload,
                None,
            )
            .await
            .map_err(|e| IdentityError::CreateVerificationError(e.to_string()))?;

        let session_id: i64 = match res.body.callback_url.split("=").last() {
            Some(session_string) => match session_string.parse::<i64>() {
                Ok(session) => session,
                Err(_) => Err(IdentityError::CreateVerificationError(
                    "cannot convert session id to u64".to_string(),
                ))?,
            },
            None => Err(IdentityError::CreateVerificationError(
                "empty session id".to_string(),
            ))?,
        };

        let json = serde_json::to_string(&res)
            .map_err(|e| IdentityError::CreateVerificationError(e.to_string()))?;

        return Ok(VerificationResult {
            session_id,
            verification_request: json,
        });
    }

    pub async fn wait_verification(&self, session_id: i64, mut timeout: i64) -> BloockResult<bool> {
        if timeout == 0 {
            timeout = 120000;
        }
        let config = self.config_service.get_config();

        let mut attempts = 0;
        let start = util::get_current_timestamp();
        let mut next_try = start + config.wait_message_interval_default;

        let timeout_time = start + timeout as u128;

        loop {
            if let Ok(status) = self.get_verification_status(session_id.clone()).await {
                if status.success {
                    return Ok(true);
                }
            }

            let mut current_time = util::get_current_timestamp();
            if current_time > timeout_time {
                return Err(IdentityError::VerificationTimeout()).map_err(|e| e.into());
            }

            task::sleep(Duration::from_millis(1000)).await;

            current_time = util::get_current_timestamp();
            while current_time < next_try && current_time < timeout_time {
                task::sleep(Duration::from_millis(200)).await;
                current_time = util::get_current_timestamp();
            }

            if current_time >= timeout_time {
                return Err(IdentityError::VerificationTimeout()).map_err(|e| e.into());
            }

            next_try += attempts * config.wait_message_interval_factor
                + config.wait_message_interval_default;
            attempts += 1;
        }
    }

    pub async fn get_verification_status(
        &self,
        session_id: i64,
    ) -> BloockResult<GetVerificationStatusResponse> {
        let api_managed_host = match self.config_service.get_identity_api_host() {
            Some(host) => host,
            None => Err(IdentityError::EmptyApiHostError())?,
        };
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityError::CreateVerificationError(e.to_string()));

        let url = format!("{api_managed_host}/v1/verifications/status?session_id={session_id}");
        match self
            .http
            .get_json::<String, GetVerificationStatusResponse>(url, None)
            .await
        {
            Ok(res) => Ok(res),
            Err(e) => Err(e).map_err(|e| InfrastructureError::Http(e).into()),
        }
    }
}

#[cfg(test)]
mod tests {}
