use async_trait::async_trait;
use bloock_core::identity_v2::{
    self,
    entity::{credential::Credential, did_metadata::DidMetadata, schema::Attribute},
};
use bloock_keys::{entity::key::Key, KeyType};
use serde_json::{Number, Value};

use crate::{
    error::BridgeError,
    items::{
        BuildSchemaRequestV2, BuildSchemaResponseV2, CreateCredentialRequestV2,
        CreateCredentialResponseV2, CreateIdentityV2Request, CreateIdentityV2Response,
        CreateIssuerRequest, CreateIssuerResponse, CreateVerificationRequest,
        CreateVerificationResponse, CredentialFromJsonRequestV2, CredentialFromJsonResponseV2,
        CredentialProofV2, CredentialReceiptV2, CredentialRevocationV2, CredentialToJsonRequestV2,
        CredentialToJsonResponseV2, CredentialV2, GetCredentialProofRequest,
        GetCredentialProofResponse, GetIssuerByKeyRequest, GetIssuerByKeyResponse,
        GetSchemaRequestV2, GetSchemaResponseV2, GetVerificationStatusRequest,
        GetVerificationStatusResponse, IdentityServiceV2Handler, IssuerStateReceipt,
        PublishIssuerStateRequest, PublishIssuerStateResponse, RevokeCredentialRequestV2,
        RevokeCredentialResponseV2, SchemaV2, VerificationReceipt, WaitVerificationRequest,
        WaitVerificationResponse,
    },
    server::response_types::RequestConfigData,
};
use bloock_keys::keys::local::LocalKey as LocalKeyCore;
use bloock_keys::keys::managed::ManagedKey as ManagedKeyCore;

pub struct IdentityServerV2 {}

#[async_trait(?Send)]
impl IdentityServiceV2Handler for IdentityServerV2 {
    async fn create_identity(
        &self,
        req: &CreateIdentityV2Request,
    ) -> Result<CreateIdentityV2Response, String> {
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

        let params: DidMetadata = match req.did_params.clone() {
            Some(i) => i.into(),
            None => DidMetadata::default(),
        };

        let client = identity_v2::configure(config_data.clone());
        let receipt = client
            .create_identity(public_key, params)
            .await
            .map_err(|e| e.to_string())?;

        Ok(CreateIdentityV2Response {
            did: receipt.did,
            error: None,
        })
    }

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

        let params: DidMetadata = match req.issuer_params.clone() {
            Some(i) => i.into(),
            None => DidMetadata::default(),
        };

        let client = identity_v2::configure(config_data.clone());
        let receipt = client
            .create_issuer(
                public_key,
                params,
                req.name.clone(),
                req.description.clone(),
                req.image.clone(),
                req.publish_interval.clone(),
            )
            .await
            .map_err(|e| e.to_string())?;

        Ok(CreateIssuerResponse {
            did: receipt.did,
            error: None,
        })
    }

    async fn get_issuer_by_key(
        &self,
        req: &GetIssuerByKeyRequest,
    ) -> Result<GetIssuerByKeyResponse, String> {
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

        let params: DidMetadata = match req.issuer_params.clone() {
            Some(i) => i.into(),
            None => DidMetadata::default(),
        };

        let client = identity_v2::configure(config_data.clone());
        let issuer = client
            .get_issuer_by_key(public_key, params)
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetIssuerByKeyResponse {
            did: issuer,
            error: None,
        })
    }

    async fn build_schema(
        &self,
        req: &BuildSchemaRequestV2,
    ) -> Result<BuildSchemaResponseV2, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let string_attr = req.string_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "string".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: None,
        });

        let integer_attr = req.integer_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "integer".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: None,
        });

        let decimal_attr = req.decimal_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "decimal".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: None,
        });

        let boolean_attr = req.boolean_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "boolean".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: None,
        });

        let date_attr = req.date_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "date".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: None,
        });

        let datetime_attr = req.datetime_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "datetime".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: None,
        });

        let string_enum_attr = req.string_enum_attributes.iter().map(|a| Attribute {
            title: a.display_name.clone(),
            name: a.id.clone(),
            r#type: "string_enum".to_string(),
            description: a.description.clone(),
            required: a.required.clone(),
            r#enum: Some(a.r#enum.clone()),
        });

        let integer_enum_attr = req.integer_enum_attributes.iter().map(|a| {
            let ints: Vec<String> = a.r#enum.iter().map(|&a| a.to_string()).collect();
            Attribute {
                title: a.display_name.clone(),
                name: a.id.clone(),
                r#type: "integer_enum".to_string(),
                description: a.description.clone(),
                required: a.required.clone(),
                r#enum: Some(ints),
            }
        });

        let decimal_enum_attr = req.decimal_enum_attributes.iter().map(|a| {
            let floats: Vec<String> = a.r#enum.iter().map(|&a| a.to_string()).collect();
            Attribute {
                title: a.display_name.clone(),
                name: a.id.clone(),
                r#type: "decimal_enum".to_string(),
                description: a.description.clone(),
                required: a.required.clone(),
                r#enum: Some(floats),
            }
        });

        let attributes: Vec<Attribute> = boolean_attr
            .into_iter()
            .chain(string_attr.into_iter())
            .chain(integer_attr.into_iter())
            .chain(decimal_attr.into_iter())
            .chain(date_attr.into_iter())
            .chain(datetime_attr.into_iter())
            .chain(string_enum_attr.into_iter())
            .chain(integer_enum_attr.into_iter())
            .chain(decimal_enum_attr.into_iter())
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
                cid: schema.cid,
                cid_json_ld: schema.cid_json_ld,
                schema_type: schema.schema_type,
                json: schema.json,
            }),
            error: None,
        })
    }

    async fn get_schema(&self, req: &GetSchemaRequestV2) -> Result<GetSchemaResponseV2, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let schema = client
            .get_schema(req.id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetSchemaResponseV2 {
            schema: Some(SchemaV2 {
                cid: schema.cid,
                cid_json_ld: schema.cid_json_ld,
                schema_type: schema.schema_type,
                json: schema.json,
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

        let key: Key = if let Some(managed_key) = signer.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = signer.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        let string_attr = req
            .string_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::String(String::from(a.value.clone()))));

        let integer_attr = req
            .integer_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::Number(Number::from(a.value))));

        let decimal_attr = req.decimal_attributes.iter().map(|a| {
            (
                a.id.clone(),
                Value::Number(Number::from_f64(a.value).unwrap()),
            )
        });

        let boolean_attr = req
            .boolean_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::Bool(a.value)));

        let date_attr = req
            .date_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::String(String::from(a.value.clone()))));

        let datetime_attr = req
            .datetime_attributes
            .iter()
            .map(|a| (a.id.clone(), Value::String(String::from(a.value.clone()))));

        let attributes: Vec<(String, Value)> = boolean_attr
            .into_iter()
            .chain(string_attr.into_iter())
            .chain(integer_attr.into_iter())
            .chain(decimal_attr.into_iter())
            .chain(date_attr.into_iter())
            .chain(datetime_attr.into_iter())
            .collect();

        let receipt = client
            .create_credential(
                req.schema_id.clone(),
                req.issuer_did.clone(),
                req.holder_did.clone(),
                req.expiration.clone(),
                req.version.clone(),
                attributes,
                key,
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
                credential_type: receipt.schema_type,
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

        let key: Key = if let Some(managed_key) = signer.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = signer.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        let receipt = client
            .publish_issuer_state(req.issuer_did.clone(), key)
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

        Ok(GetCredentialProofResponse {
            proof: Some(CredentialProofV2 {
                signature_proof: proof.signature_proof,
                sparse_mt_proof: proof.sparse_mt_proof,
            }),
            error: None,
        })
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

        let json = serde_json::to_string(&offer)
            .map_err(|e| format!("couldn't serialize credential: {}", e.to_string()))?;

        Ok(CredentialToJsonResponseV2 { json, error: None })
    }

    async fn credential_from_json(
        &self,
        req: &CredentialFromJsonRequestV2,
    ) -> Result<CredentialFromJsonResponseV2, String> {
        let credential: Credential = serde_json::from_str(&req.json)
            .map_err(|e| format!("couldn't deserialize credential: {}", e.to_string()))?;

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

        let signer = req
            .clone()
            .signer
            .ok_or_else(|| "no signer provided".to_string())?;

        let key: Key = if let Some(managed_key) = signer.managed_key {
            let managed_key_core: ManagedKeyCore = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = signer.local_key {
            let local_key_core: LocalKeyCore<String> = local_key.into();
            local_key_core.into()
        } else {
            return Err("invalid key provided".to_string());
        };

        let revocation = client
            .revoke_credential(credential, key)
            .await
            .map_err(|e| e.to_string())?;

        Ok(RevokeCredentialResponseV2 {
            result: Some(CredentialRevocationV2 {
                success: revocation.success,
            }),
            error: None,
        })
    }

    async fn create_verification(
        &self,
        req: &CreateVerificationRequest,
    ) -> Result<CreateVerificationResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let res = client
            .create_verification(req.proof_request.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(CreateVerificationResponse {
            result: Some(VerificationReceipt {
                session_id: res.session_id,
                verification_request: res.verification_request,
            }),
            error: None,
        })
    }

    async fn wait_verification(
        &self,
        req: &WaitVerificationRequest,
    ) -> Result<WaitVerificationResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let res = client
            .wait_verification(req.session_id.clone(), req.timeout.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(WaitVerificationResponse {
            status: res,
            error: None,
        })
    }

    async fn get_verification_status(
        &self,
        req: &GetVerificationStatusRequest,
    ) -> Result<GetVerificationStatusResponse, String> {
        let config_data = req.get_config_data()?;

        let client = identity_v2::configure(config_data.clone());

        let res = client
            .get_verification_status(req.session_id.clone())
            .await
            .map_err(|e| e.to_string())?;

        Ok(GetVerificationStatusResponse {
            status: res.success,
            error: None,
        })
    }
}
