use crate::error::BridgeError;
use crate::items::CreateCoreCredentialRequest;
use crate::items::CreateCoreCredentialResponse;
use crate::items::Credential;
use crate::items::CredentialReceipt;
use crate::server::response_types::RequestConfigData;
use crate::server::IdentityCoreServiceHandler;
use async_trait::async_trait;
use bloock_core::identity_core;
use bloock_keys::entity::key::Key;
use bloock_keys::keys::local::LocalKey;
use bloock_keys::keys::managed::ManagedKey;
use serde_json::Number;
use serde_json::Value;

pub struct IdentityCoreServer {}

#[async_trait(?Send)]
impl IdentityCoreServiceHandler for IdentityCoreServer {
    async fn create_core_credential(
        &self,
        req: &CreateCoreCredentialRequest,
    ) -> Result<CreateCoreCredentialResponse, String> {
        let config_data = req.get_config_data()?;
        let client = identity_core::configure(config_data.clone());

        let issuer_key = req
            .clone()
            .key
            .ok_or_else(|| "no issuer key provided".to_string())?;

        let key: Key = if let Some(managed_key) = issuer_key.managed_key {
            let managed_key_core: ManagedKey = managed_key.into();
            managed_key_core.into()
        } else if let Some(local_key) = issuer_key.local_key {
            let local_key_core: LocalKey<String> = local_key.into();
            local_key_core.into()
        } else {
            return Err("invalid issuer key provided".to_string());
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

        let deserialized_credential: Option<Credential> = Some(
            receipt
                .credential
                .clone()
                .try_into()
                .map_err(|e: BridgeError| e.to_string())?,
        );

        Ok(CreateCoreCredentialResponse {
            credential_receipt: Some(CredentialReceipt {
                credential: deserialized_credential,
                credential_id: receipt.credential_id,
                credential_type: receipt.schema_type,
            }),
            error: None,
        })
    }
}
