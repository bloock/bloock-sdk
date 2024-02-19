use std::sync::Arc;

use bloock_hasher::HashAlg;
use bloock_http::Client;
use bloock_keys::entity::key::Key;
use serde_json::Value;
use url::Url;

use crate::{
    availability::service::AvailabilityService,
    config::service::ConfigService,
    error::BloockResult,
    identity::entity::{
        create_credential_receipt::CreateCredentialReceipt, credential::Credential,
        proof::CredentialProof, schema::Schema,
    },
    integrity::service::IntegrityService,
};

use super::{
    entity::dto::{
        create_credential_request::CreateCredentialRequest,
        create_credential_response::CreateCredentialResponse,
        get_credential_proof_response::GetCredentialProofResponse,
        update_draft_state_signature_request::UpdateDraftStateSignatureRequest,
        update_draft_state_signature_response::UpdateDraftStateSignatureResponse,
    },
    IdentityCoreError,
};

use bloock_identity_rs::{
    did::parse_did,
    schema::{
        get_json_ld_context_from_json, get_schema_type_from_json, get_type_id_from_context,
        parse_to_schema_cid,
    },
    vc::VC,
};

pub struct IdentityCoreService<H: Client> {
    pub http: Arc<H>,
    pub availability_service: AvailabilityService<H>,
    pub integrity_service: IntegrityService<H>,
    pub config_service: ConfigService,
}

impl<H: Client> IdentityCoreService<H> {
    pub async fn create_credential(
        &self,
        schema_id: String,
        issuer_did: String,
        holder_did: String,
        expiration: i64,
        version: Option<i32>,
        mut attributes: Vec<(String, Value)>,
        key: Key,
    ) -> BloockResult<CreateCredentialReceipt> {
        let api_managed_host = match self.config_service.get_identity_api_host() {
            Some(host) => host,
            None => Err(IdentityCoreError::EmptyApiHostError())?,
        };
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()));

        let schema_json = self.get_schema(schema_id.clone()).await?;

        let schema_json_ld = self
            .get_schema_json_ld(schema_json.cid_json_ld.clone())
            .await?;
        let credential_type =
            get_type_id_from_context(schema_json_ld, schema_json.schema_type.clone())
                .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        let version = match version {
            Some(v) => v,
            None => 0,
        };

        attributes.push(("id".to_string(), Value::String(holder_did.clone())));
        attributes.push((
            "type".to_string(),
            Value::String(schema_json.schema_type.clone()),
        ));

        let vc = VC::new(
            schema_json.cid_json_ld.clone(),
            schema_json.cid.clone(),
            schema_json.schema_type.clone(),
            issuer_did.clone(),
            holder_did,
            expiration,
            attributes,
            credential_type,
            version,
            self.config_service.get_api_base_url(),
            api_managed_host,
        )
        .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        vc.validate_schema(schema_json.json.clone())
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        let credential_id = vc
            .get_credentia_id()
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;
        let core_claim = vc
            .get_core_claim()
            .await
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;
        let core_claim_hex = core_claim
            .hex()
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        let core_claim_hash = core_claim.hi_hv_hash();
        let core_claim_hash_decoded = hex::decode(core_claim_hash)
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        let credential_json = vc
            .to_json()
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        let mut credential: Credential = serde_json::from_str(&credential_json)
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        let signature = bloock_signer::sign(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            self.config_service.get_environment(),
            &core_claim_hash_decoded,
            &key,
            Some(HashAlg::None),
            None,
        )
        .await
        .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        let req = CreateCredentialRequest {
            credential_id,
            core_claim: core_claim_hex,
            bn_128_signature: signature.signature.clone(),
        };

        let res: CreateCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/{}/claims",
                    self.config_service.get_api_base_url(),
                    issuer_did.to_string(),
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityCoreError::CreateCredentialError(e.to_string()))?;

        self.update_draft_state_signature(res.new_state, issuer_did.clone(), &key)
            .await?;

        let proof: GetCredentialProofResponse = self
            .http
            .get_json(
                format!(
                    "{}/identityV2/v1/{}/claims/{}/proof",
                    self.config_service.get_api_base_url(),
                    issuer_did.to_string(),
                    res.id.clone(),
                ),
                None,
            )
            .await
            .map_err(|e| IdentityCoreError::GetCredentialProofError(e.to_string()))?;

        let credential_proof: CredentialProof = serde_json::from_value(proof.proof)
            .map_err(|e| IdentityCoreError::GetCredentialProofError(e.to_string()))?;

        credential.proof = Some(credential_proof);

        Ok(CreateCredentialReceipt {
            credential,
            credential_id: res.id,
            schema_type: schema_json.schema_type,
        })
    }

    pub async fn get_schema(&self, id: String) -> BloockResult<Schema> {
        let schema_cid = parse_to_schema_cid(id.clone())
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;
        let res = self
            .availability_service
            .retrieve_ipfs(schema_cid)
            .await
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        let cid_json_ld = get_json_ld_context_from_json(json.to_string().clone())
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        let schema_type = get_schema_type_from_json(json.to_string().clone())
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        Ok(Schema {
            cid: id,
            cid_json_ld,
            schema_type,
            json: json.to_string(),
        })
    }

    pub async fn get_schema_json_ld(&self, id: String) -> BloockResult<String> {
        let schema_cid = parse_to_schema_cid(id.clone())
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;
        let res = self
            .availability_service
            .retrieve_ipfs(schema_cid)
            .await
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityCoreError::SchemaParseError(e.to_string()))?;

        Ok(json.to_string())
    }

    pub async fn update_draft_state_signature(
        &self,
        new_state: String,
        issuer_did: String,
        key: &Key,
    ) -> Result<bool, IdentityCoreError> {
        let new_state_decoded = hex::decode(new_state.clone())
            .map_err(|e| IdentityCoreError::UpdateDraftStateSignatureError(e.to_string()))?;

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
        .map_err(|e| IdentityCoreError::UpdateDraftStateSignatureError(e.to_string()))?;

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
            .map_err(|e| IdentityCoreError::UpdateDraftStateSignatureError(e.to_string()))?;

        if !new_state_res.success {
            return Err(IdentityCoreError::UpdateDraftStateSignatureError(
                "unsuccess response".to_string(),
            ));
        }

        return Ok(true);
    }
}
