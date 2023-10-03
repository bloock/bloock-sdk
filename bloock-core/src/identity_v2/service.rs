use std::sync::Arc;

use bloock_hasher::{keccak::Keccak256, Hasher};
use bloock_http::Client;
use bloock_identity_rs::{
    did::parse_did,
    schema::{
        get_json_ld_context_from_json, get_schema_type_from_json, get_type_id_from_context,
        parse_to_schema_cid,
    },
    vc::VC,
};
use bloock_keys::entity::key::Key;
use bloock_signer::Signer;
use serde_json::{json, Map, Value};

use crate::{
    availability::service::AvailabilityService, config::service::ConfigService,
    error::BloockResult, integrity::service::IntegrityService,
};
use url::Url;

use super::{
    entity::{
        create_credential_receipt::CreateCredentialReceipt,
        credential::Credential,
        did_metadata::DidMetadata,
        dto::{
            create_credential_request::CreateCredentialRequest,
            create_credential_response::CreateCredentialResponse,
            create_issuer_request::{CreateIssuerRequest, DidMetadata as DidMetadataRequest},
            create_issuer_response::CreateIssuerResponse,
            create_schema_request::CreateSchemaRequest,
            create_schema_response::CreateSchemaResponse,
            get_credential_proof_response::GetCredentialProofResponse,
            get_issuer_by_key_response::GetIssuerByKeyResponse,
            get_issuer_list_response::GetIssuerListResponse,
            get_issuer_new_state_response::GetIssuerNewStateResponse,
            publish_issuer_state_request::PublishIssuerStateRequest,
            publish_issuer_state_response::PublishIssuerStateResponse,
            revoke_credential_request::RevokeCredentialRequest,
            revoke_credential_response::RevokeCredentialResponse,
        },
        proof::CredentialProof,
        proof_type::ProofType,
        revocation_result::RevocationResult,
        schema::{Attribute, Schema},
    },
    IdentityErrorV2,
};

pub struct IdentityServiceV2<H: Client> {
    pub http: Arc<H>,
    pub availability_service: AvailabilityService<H>,
    pub integrity_service: IntegrityService<H>,
    pub config_service: ConfigService,
}

impl<H: Client> IdentityServiceV2<H> {
    pub async fn create_issuer(
        &self,
        public_key: String,
        did_metadata: DidMetadata,
    ) -> BloockResult<CreateIssuerResponse> {
        let req = CreateIssuerRequest {
            did_metadata: DidMetadataRequest {
                method: did_metadata.method.get_method_type(),
                blockchain: did_metadata.blockchain.get_bloockchain_type(),
                network: did_metadata.network.get_network_id_type(),
            },
            bn_128_public_key: public_key,
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
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        Ok(res)
    }

    pub async fn get_issuer_by_key(
        &self,
        public_key: String,
        did_metadata: DidMetadata,
    ) -> BloockResult<String> {
        let res: GetIssuerByKeyResponse = self
            .http
            .get_json(
                format!(
                    "{}/identityV2/v1/issuers/key/{}?method={}&blockchain={}&network={}",
                    self.config_service.get_api_base_url(),
                    public_key,
                    did_metadata.method.get_method_type(),
                    did_metadata.blockchain.get_bloockchain_type(),
                    did_metadata.network.get_network_id_type()
                ),
                None,
            )
            .await
            .map_err(|e| IdentityErrorV2::GetIssuerByKeyError(e.to_string()))?;

        Ok(res.did)
    }

    pub async fn get_issuer_list(&self) -> BloockResult<Vec<GetIssuerListResponse>> {
        let res: Vec<GetIssuerListResponse> = self
            .http
            .get_json(
                format!(
                    "{}/identityV2/v1/issuers",
                    self.config_service.get_api_base_url(),
                ),
                None,
            )
            .await
            .map_err(|e| IdentityErrorV2::IssuerListError(e.to_string()))?;

        Ok(res)
    }

    pub async fn build_schema(
        &self,
        display_name: String,
        schema_type: String,
        version: String,
        description: String,
        issuer_did: String,
        attributes: Vec<Attribute>,
    ) -> BloockResult<Schema> {
        parse_did(issuer_did.clone())
            .map_err(|e| IdentityErrorV2::CreateSchemaError(e.to_string()))?;

        let mut attr = Map::new();
        for a in attributes {
            let r#type = a.r#type;
            let r#enum = a.r#enum.unwrap_or(vec![]);
            attr.insert(a.name, json!({ "data_type": r#type, "title": a.title, "description": a.description, "required": a.required, "enum": r#enum }));
        }

        let req = CreateSchemaRequest {
            attributes: serde_json::to_value(attr)
                .map_err(|e| IdentityErrorV2::CreateSchemaError(e.to_string()))?,
            schema_type,
            title: display_name,
            version,
            description,
        };

        let res: CreateSchemaResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/{}/schemas",
                    self.config_service.get_api_base_url(),
                    issuer_did
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityErrorV2::CreateSchemaError(e.to_string()))?;

        self.get_schema(res.cid_json).await
    }

    pub async fn create_credential(
        &self,
        schema_id: String,
        issuer_did: String,
        holder_did: String,
        expiration: i64,
        version: Option<i32>,
        mut attributes: Vec<(String, Value)>,
        key: Key,
        proof_types: Vec<ProofType>,
        api_managed_host: String,
    ) -> BloockResult<CreateCredentialReceipt> {
        _ = Url::parse(&api_managed_host.clone())
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()));

        let schema_json = self.get_schema(schema_id.clone()).await?;
        let context_json_ld = get_json_ld_context_from_json(schema_json.json.clone())
            .map_err(|e| IdentityErrorV2::SchemaParseError(e.to_string()))?;

        let schema_type = get_schema_type_from_json(schema_json.json.clone())
            .map_err(|e| IdentityErrorV2::SchemaParseError(e.to_string()))?;

        let schema_json_ld = self.get_schema(context_json_ld.clone()).await?;
        let credential_type = get_type_id_from_context(schema_json_ld.json, schema_type.clone())
            .map_err(|e| IdentityErrorV2::SchemaParseError(e.to_string()))?;

        let version = match version {
            Some(v) => v,
            None => 0,
        };

        attributes.push(("id".to_string(), Value::String(holder_did.clone())));
        attributes.push(("type".to_string(), Value::String(schema_type.clone())));

        let vc = VC::new(
            context_json_ld,
            schema_json.cid.clone(),
            schema_type.clone(),
            issuer_did.clone(),
            holder_did,
            expiration,
            attributes,
            credential_type,
            version,
            self.config_service.get_api_base_url(),
            api_managed_host,
        )
        .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        vc.validate_schema(schema_json.json.clone())
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        let credential_id = vc
            .get_credentia_id()
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;
        let core_claim = vc
            .get_core_claim()
            .await
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;
        let core_claim_hex = core_claim
            .hex()
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        let core_claim_hash = core_claim.hi_hv_hash();
        let core_claim_hash_decoded = hex::decode(core_claim_hash)
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        let credential_json = vc
            .to_json()
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;
        let credential_keccak_hash =
            hex::encode(Keccak256::generate_hash(&[credential_json.as_bytes()]));

        let mut credential: Credential = serde_json::from_str(&credential_json)
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        let signature = bloock_signer::sign(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            &core_claim_hash_decoded,
            &key,
        )
        .await
        .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        let req = CreateCredentialRequest {
            credential_id,
            core_claim: core_claim_hex,
            bn_128_signature: signature.signature,
            keccak_256_hash: credential_keccak_hash,
        };

        let res: CreateCredentialResponse = self
            .http
            .post_json(
                format!(
                    "{}/identityV2/v1/{}/claims?{}",
                    self.config_service.get_api_base_url(),
                    issuer_did.to_string(),
                    proof_types
                        .iter()
                        .map(|proof_type| format!("proof={}", proof_type.get_proof_type()))
                        .collect::<Vec<String>>()
                        .join("&")
                ),
                req,
                None,
            )
            .await
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

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
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        let credential_proof: CredentialProof = serde_json::from_value(proof.proof)
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        credential.proof = Some(credential_proof);

        Ok(CreateCredentialReceipt {
            credential,
            credential_id: res.id,
            schema_type,
            anchor_id: res.anchor_id,
        })
    }

    pub async fn get_schema(&self, id: String) -> BloockResult<Schema> {
        let schema_cid = parse_to_schema_cid(id.clone())
            .map_err(|e| IdentityErrorV2::SchemaParseError(e.to_string()))?;
        let res = self
            .availability_service
            .retrieve_ipfs(schema_cid)
            .await
            .map_err(|e| IdentityErrorV2::SchemaParseError(e.to_string()))?;

        let json: Value = serde_json::from_slice(&res)
            .map_err(|e| IdentityErrorV2::SchemaParseError(e.to_string()))?;

        Ok(Schema {
            cid: id,
            json: json.to_string(),
        })
    }

    pub async fn publish_issuer_state(
        &self,
        issuer_did: String,
        key: Key,
    ) -> BloockResult<PublishIssuerStateResponse> {
        parse_did(issuer_did.clone())
            .map_err(|e| IdentityErrorV2::PublishIssuerStateError(e.to_string()))?;

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
            .map_err(|e| IdentityErrorV2::PublishIssuerStateError(e.to_string()))?;
        let new_state_hash = res.new_state;
        if new_state_hash.is_empty() {
            return Err(IdentityErrorV2::ErrorUnprocessedState()).map_err(|e| e.into());
        }
        let new_state_hash_decoded = hex::decode(new_state_hash.clone())
            .map_err(|e| IdentityErrorV2::PublishIssuerStateError(e.to_string()))?;

        let signature = bloock_signer::sign(
            self.config_service.get_api_base_url(),
            self.config_service.get_api_key(),
            &new_state_hash_decoded,
            &key,
        )
        .await
        .map_err(|e| IdentityErrorV2::PublishIssuerStateError(e.to_string()))?;

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
            .map_err(|e| IdentityErrorV2::PublishIssuerStateError(e.to_string()))?;

        Ok(res)
    }

    pub async fn get_credential_proof(
        &self,
        issuer_did: String,
        credential_id: String,
    ) -> BloockResult<CredentialProof> {
        parse_did(issuer_did.clone())
            .map_err(|e| IdentityErrorV2::GetCredentialProofError(e.to_string()))?;

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
            .map_err(|e| IdentityErrorV2::GetCredentialProofError(e.to_string()))?;

        let credential_proof: CredentialProof = serde_json::from_value(proof.proof)
            .map_err(|e| IdentityErrorV2::CreateCredentialError(e.to_string()))?;

        Ok(credential_proof)
    }

    pub async fn revoke_credential(
        &self,
        credential: Credential,
    ) -> BloockResult<RevocationResult> {
        parse_did(credential.issuer.clone())
            .map_err(|e| IdentityErrorV2::RevokeCredentialError(e.to_string()))?;

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
            .map_err(|e| IdentityErrorV2::RevokeCredentialError(e.to_string()))?;

        Ok(RevocationResult {
            success: res.success,
        })
    }
}

#[cfg(test)]
mod tests {}
