use crate::{KeyType, KeysError, Result};
use bloock_http::Client;
use serde::{Deserialize, Serialize};

#[derive(Copy, Clone, PartialEq, Debug)]
pub enum ProtectionLevel {
    SOFTWARE,
    HSM,
}
impl Into<u8> for ProtectionLevel {
    fn into(self) -> u8 {
        match self {
            ProtectionLevel::SOFTWARE => 1,
            ProtectionLevel::HSM => 2,
        }
    }
}

impl From<u8> for ProtectionLevel {
    fn from(value: u8) -> Self {
        match value {
            1 => ProtectionLevel::SOFTWARE,
            2 => ProtectionLevel::HSM,
            _ => ProtectionLevel::SOFTWARE,
        }
    }
}

pub struct ManagedKeyParams {
    pub name: Option<String>,
    pub key_type: KeyType,
    pub protection: ProtectionLevel,
    pub expiration: Option<u64>,
}

pub struct ManagedKey {
    pub id: String,
    pub name: Option<String>,
    pub key_type: KeyType,
    pub public_key: String,
    pub protection: ProtectionLevel,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct ManagedKeyRequest {
    pub name: Option<String>,
    pub key_type: String,
    pub key_curve: Option<String>,
    pub key_size: Option<u32>,
    pub protection_level: u8,
    pub expiration: Option<u64>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct ManagedKeyResponse {
    pub key_id: String,
    pub name: String,
    pub key_type: String,
    pub key_curve: String,
    pub key_size: u32,
    pub key_protection: u8,
    pub pub_key: String,
    pub expiration: u64,
}

impl ManagedKey {
    pub async fn new(
        params: &ManagedKeyParams,
        api_host: String,
        api_key: String,
    ) -> Result<ManagedKey> {
        let client = bloock_http::BloockHttpClient::new(api_key);

        let req = ManagedKeyRequest {
            name: params.name.clone(),
            key_type: params.key_type.get_key_type(),
            key_curve: params.key_type.get_key_curve(),
            key_size: params.key_type.get_key_size(),
            protection_level: params.protection.into(),
            expiration: params.expiration,
        };
        let res: ManagedKeyResponse = client
            .post_json(format!("{}/keys/v1/keys", api_host), req, None)
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(ManagedKey {
            id: res.key_id,
            name: Some(res.name),
            key_type: KeyType::new(&res.key_type, Some(&res.key_curve), Some(res.key_size))?,
            public_key: res.pub_key,
            protection: res.key_protection.into(),
        })
    }
}

#[cfg(test)]
mod tests {
    use crate::{managed::ProtectionLevel, KeyType};

    use super::{ManagedKey, ManagedKeyParams};

    #[tokio::test]
    async fn test_managed_key_ec() {
        let name = "Test key".to_string();
        let key_type = KeyType::EcP256k;
        let protection = ProtectionLevel::SOFTWARE;

        let params = ManagedKeyParams {
            name: Some(name.clone()),
            key_type: key_type.clone(),
            protection: protection,
            expiration: None,
        };
        let key = ManagedKey::new(
            &params,
            "https://api.bloock.dev".to_string(),
            option_env!("API_KEY").unwrap().to_string(),
        )
        .await
        .unwrap();

        assert_eq!(key.name, Some(name));
        assert_eq!(key.key_type, key_type);
        assert_eq!(key.protection, protection);
        assert_ne!(key.public_key, "".to_string());
    }

    #[tokio::test]
    async fn test_managed_key_rsa() {
        let name = "Test key".to_string();
        let key_type = KeyType::Rsa2048;
        let protection = ProtectionLevel::SOFTWARE;

        let params = ManagedKeyParams {
            name: Some(name.clone()),
            key_type: key_type.clone(),
            protection: protection,
            expiration: None,
        };
        let key = ManagedKey::new(
            &params,
            "https://api.bloock.dev".to_string(),
            option_env!("API_KEY").unwrap().to_string(),
        )
        .await
        .unwrap();

        assert_eq!(key.name, Some(name));
        assert_eq!(key.key_type, key_type);
        assert_eq!(key.protection, protection);
        assert_ne!(key.public_key, "".to_string());
    }
}
