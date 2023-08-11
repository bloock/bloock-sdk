use async_trait::async_trait;
use bloock_core::{
    identity_v2::{
        self,
        entity::{credential::Credential, proof_type::ProofType, schema::Attribute},
    },
    ManagedBJJSigner, Signer,
};
use bloock_keys::KeyType;
use serde_json::{Number, Value};

use crate::{
    error::BridgeError,
    items::{
        BuildSchemaRequestV2, BuildSchemaResponseV2, CreateCredentialRequestV2,
        CreateCredentialResponseV2, CreateIssuerRequest, CreateIssuerResponse,
        CredentialFromJsonRequestV2, CredentialFromJsonResponseV2, CredentialReceiptV2,
        CredentialRevocationV2, CredentialToJsonRequestV2, CredentialToJsonResponseV2,
        CredentialV2, GetCredentialProofRequest, GetCredentialProofResponse,
        IdentityServiceV2Handler, IssuerStateReceipt, PublishIssuerStateRequest,
        PublishIssuerStateResponse, RevokeCredentialRequestV2, RevokeCredentialResponseV2,
        SchemaV2, SignerAlg,
    },
    server::response_types::RequestConfigData,
};

pub struct IdentityServerV2 {}

#[async_trait(?Send)]
impl IdentityServiceV2Handler for IdentityServerV2 {
    async fn create_issuer(
        &self,
        req: &CreateIssuerRequest,
    ) -> Result<CreateIssuerResponse, String> {
        let config_data = req.get_config_data()?;

        let issuer_key = req
            .clone()
            .issuer_key
            .ok_or_else(|| "no key provided".to_string())?;

        let local_key = issuer_key.local_key;
        let managed_key = issuer_key.managed_key;

        let public_key = if let Some(key) = managed_key {
            let key_type: KeyType = key.key_type().into();
            if key_type == KeyType::BJJ {
                key.key
            } else {
                return Err("invalid key type provided".to_string());
            }
        } else if let Some(key) = local_key {
            let key_type: KeyType = key.key_type().into();
            if key_type == KeyType::BJJ {
                key.key
            } else {
                return Err("invalid key type provided".to_string());
            }
        } else {
            return Err("invalid key provided".to_string());
        };

        let client = identity_v2::configure(config_data.clone());
        let receipt = client
            .create_issuer(public_key)
            .await
            .map_err(|e| e.to_string())?;

        Ok(CreateIssuerResponse {
            did: receipt.did,
            error: None,
        })
    }

    async fn build_schema(
        &self,
        req: &BuildSchemaRequestV2,
    ) -> Result<BuildSchemaResponseV2, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let boolean_attr = req.boolean_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "boolean".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
        });

        let date_attr = req.date_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "date".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
        });

        let datetime_attr = req.datetime_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "datetime".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
        });

        let string_attr = req.string_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "string".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
        });

        let number_attr = req.number_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "integer".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
        });

        let attributes: Vec<Attribute> = boolean_attr
            .into_iter()
            .chain(date_attr.into_iter())
            .chain(datetime_attr.into_iter())
            .chain(string_attr.into_iter())
            .chain(number_attr.into_iter())
            .collect();

        let schema = client
            .build_schema(
                req.display_name.clone(),
                req.schema_type.clone(),
                req.version.clone(),
                req.description.clone(),
                req.issuer_did.clone(),
                attributes,
            )
            .await
            .map_err(|e| e.to_string())?;

        Ok(BuildSchemaResponseV2 {
            schema: Some(SchemaV2 {
                id: schema.cid,
                json_ld: schema.json,
            }),
            error: None,
        })
    }

    async fn create_credential(
        &self,
        req: &CreateCredentialRequestV2,
    ) -> Result<CreateCredentialResponseV2, String> {
        let config_data = req.get_config_data()?;
        let client = identity_v2::configure(config_data.clone());

        let signer = req
            .clone()
            .signer
            .ok_or_else(|| "no signer provided".to_string())?;
        let signer_alg = SignerAlg::from_i32(signer.alg);

        let local_key = signer.local_key;
        let managed_key = signer.managed_key;

        let signer: Box<dyn Signer> = if let Some(key) = managed_key {
            if signer_alg == Some(SignerAlg::Bjj) {
                ManagedBJJSigner::new_boxed(
                    key.into(),
                    signer.common_name,
                    config_data.config.host,
                    config_data.config.api_key,
                )
            } else {
                return Err("invalid signer provided".to_string());
            }
        } else if let Some(_key) = local_key {
            if signer_alg == Some(SignerAlg::Bjj) {
                todo!()
            } else {
                return Err("invalid signer provided".to_string());
            }
        } else {
            return Err("invalid key provided".to_string());
        };

        let boolean_attr = req
            .boolean_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::Bool(a.value)));

        let date_attr = req
            .date_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::Number(Number::from(a.value))));

        let datetime_attr = req
            .datetime_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::Number(Number::from(a.value as i64))));

        let string_attr = req
            .string_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::String(String::from(a.value.clone()))));

        let number_attr = req
            .number_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::Number(Number::from(a.value))));

        let attributes: Vec<(String, Value)> = boolean_attr
            .into_iter()
            .chain(date_attr.into_iter())
            .chain(datetime_attr.into_iter())
            .chain(string_attr.into_iter())
            .chain(number_attr.into_iter())
            .collect();

        let core_proof_types: Vec<ProofType> = req
            .proof_type()
            .map(|proof_type| {
                let core_proof_type: ProofType = proof_type.into();
                core_proof_type
            })
            .collect();

        let receipt = client
            .create_credential(
                req.schema_id.clone(),
                req.schema_type.clone(),
                req.issuer_did.clone(),
                req.holder_did.clone(),
                req.expiration.clone(),
                req.version.clone(),
                attributes,
                signer,
                core_proof_types,
            )
            .await
            .map_err(|e| e.to_string())?;

        let deserialized_credential: Option<CredentialV2> = Some(
            receipt
                .credential
                .clone()
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?,
        );

        Ok(CreateCredentialResponseV2 {
            credential_receipt: Some(CredentialReceiptV2 {
                credential: deserialized_credential,
                credential_id: receipt.credential_id,
                anchor_id: Some(receipt.anchor_id),
            }),
            error: None,
        })
    }

    async fn publish_issuer_state(
        &self,
        req: &PublishIssuerStateRequest,
    ) -> Result<PublishIssuerStateResponse, String> {
        let config_data = req.get_config_data()?;
        let client = identity_v2::configure(config_data.clone());

        let signer = req
            .clone()
            .signer
            .ok_or_else(|| "no signer provided".to_string())?;
        let signer_alg = SignerAlg::from_i32(signer.alg);

        let local_key = signer.local_key;
        let managed_key = signer.managed_key;

        let signer: Box<dyn Signer> = if let Some(key) = managed_key {
            if signer_alg == Some(SignerAlg::Bjj) {
                ManagedBJJSigner::new_boxed(
                    key.into(),
                    signer.common_name,
                    config_data.config.host,
                    config_data.config.api_key,
                )
            } else {
                return Err("invalid signer provided".to_string());
            }
        } else if let Some(_key) = local_key {
            if signer_alg == Some(SignerAlg::Bjj) {
                todo!()
            } else {
                return Err("invalid signer provided".to_string());
            }
        } else {
            return Err("invalid key provided".to_string());
        };

        let receipt = client
            .publish_issuer_state(req.issuer_did.clone(), signer)
            .await
            .map_err(|e| e.to_string())?;

        Ok(PublishIssuerStateResponse {
            state_receipt: Some(IssuerStateReceipt {
                tx_hash: receipt.tx_id,
            }),
            error: None,
        })
    }

    async fn get_credential_proof(
        &self,
        req: &GetCredentialProofRequest,
    ) -> Result<GetCredentialProofResponse, String> {
        let config_data = req.get_config_data()?;
        let client = identity_v2::configure(config_data.clone());

        let proof = client
            .get_credential_proof(req.issuer_did.clone(), req.credential_id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetCredentialProofResponse { proof, error: None })
    }

    async fn credential_to_json(
        &self,
        req: &CredentialToJsonRequestV2,
    ) -> Result<CredentialToJsonResponseV2, String> {
        let offer: Credential = req
            .credential
            .clone()
            .ok_or("invalid credential provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let json = serde_json::to_string(&offer).map_err(|_| "couldn't serialize credential")?;

        Ok(CredentialToJsonResponseV2 { json, error: None })
    }

    async fn credential_from_json(
        &self,
        req: &CredentialFromJsonRequestV2,
    ) -> Result<CredentialFromJsonResponseV2, String> {
        let credential: Credential = serde_json::from_str(&req.json)
            .map_err(|e| format!("couldn't deserialize credential: {}", e))?;

        let deserialized_credential: Option<CredentialV2> = Some(
            credential
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?,
        );

        Ok(CredentialFromJsonResponseV2 {
            credential: deserialized_credential,
            error: None,
        })
    }

    async fn revoke_credential(
        &self,
        req: &RevokeCredentialRequestV2,
    ) -> Result<RevokeCredentialResponseV2, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let credential: Credential = req
            .credential
            .clone()
            .ok_or("invalid credential offer provided")?
            .try_into()
            .map_err(|e: BridgeError| e.to_string())?;

        let revocation = client
            .revoke_credential(credential)
            .await
            .map_err(|e| e.to_string())?;

        Ok(RevokeCredentialResponseV2 {
            result: Some(CredentialRevocationV2 {
                success: revocation.success,
            }),
            error: None,
        })
    }
}