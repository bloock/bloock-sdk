use crate::{CertificateSubject, CertificateType, KeyType, KeysError, Result};
use bloock_http::Client;
use serde::{Deserialize, Serialize};

#[derive(Copy, Clone, PartialEq, Debug)]
pub enum ProtectionLevel {
    SOFTWARE,
    HSM,
}
impl From<ProtectionLevel> for u8 {
    fn from(val: ProtectionLevel) -> Self {
        match val {
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
    pub expiration: Option<i64>,
}

pub struct ManagedCertificateParams {
    pub key_type: KeyType,
    pub expiration: i32,
    pub subject: CertificateSubject,
}

#[derive(Clone)]
pub struct ManagedKey {
    pub id: String,
    pub name: Option<String>,
    pub key_type: KeyType,
    pub public_key: String,
    pub protection: ProtectionLevel,
    pub expiration: Option<i64>,
}

#[derive(Clone)]
pub struct ManagedCertificate {
    pub id: String,
    pub key_type: KeyType,
    pub public_key: String,
    pub protection: ProtectionLevel,
    pub expiration: Option<i64>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct CreateManagedKeyRequest {
    pub name: Option<String>,
    pub key_type: String,
    pub protection_level: u8,
    pub expiration: Option<i64>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct CreateManagedCertificateRequest {
    pub key_type: String,
    pub subject: CreateManagedCertificateSubjectRequest,
    pub expiration: i32,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct CreateManagedCertificateSubjectRequest {
    pub cn: String,
    pub o: String,
    pub ou: String,
    pub c: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct ManagedKeyResponse {
    pub key_id: String,
    pub name: String,
    pub key_type: String,
    pub key_protection: u8,
    pub pub_key: String,
    pub expiration: i64,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct ManagedCertificateResponse {
    pub certificate_id: String,
    pub key_type: String,
    pub key_protection: u8,
    pub pub_key: String,
    pub expiration: i64,
}

impl ManagedKey {
    pub async fn new(
        params: &ManagedKeyParams,
        api_host: String,
        api_key: String,
        api_version: Option<String>,
    ) -> Result<ManagedKey> {
        let client = bloock_http::BloockHttpClient::new(api_key, api_version);

        let req = CreateManagedKeyRequest {
            name: params.name.clone(),
            key_type: params.key_type.get_key_type(),
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
            key_type: KeyType::new(&res.key_type)?,
            public_key: res.pub_key,
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }

    pub async fn load(id: String, api_host: String, api_key: String) -> Result<ManagedKey> {
        let client = bloock_http::BloockHttpClient::new(api_key, None);

        let res: ManagedKeyResponse = client
            .get_json(format!("{}/keys/v1/keys/{}", api_host, id), None)
            .await
            .map_err(|e| KeysError::ManagedKeyRequestError(e.to_string()))?;

        Ok(ManagedKey {
            id: res.key_id,
            name: Some(res.name),
            key_type: KeyType::new(&res.key_type)?,
            public_key: res.pub_key,
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }
}

impl ManagedCertificate {
    pub async fn new(
        params: &ManagedCertificateParams,
        api_host: String,
        api_key: String,
        api_version: Option<String>,
    ) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, api_version);
        let subject_params = CreateManagedCertificateSubjectRequest {
            cn: params.subject.cn.clone(),
            o: params.subject.o.clone(),
            ou: params.subject.ou.clone(),
            c: params.subject.c.clone(),
        };
        let req = CreateManagedCertificateRequest {
            key_type: params.key_type.get_key_type(),
            subject: subject_params,
            expiration: params.expiration,
        };
        let res: ManagedCertificateResponse = client
            .post_json(format!("{}/keys/v1/certificates", api_host), req, None)
            .await
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        Ok(ManagedCertificate {
            id: res.certificate_id,
            key_type: KeyType::new(&res.key_type)?,
            public_key: res.pub_key,
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }

    pub async fn load(id: String, api_host: String, api_key: String) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, None);

        let res: ManagedCertificateResponse = client
            .get_json(format!("{}/keys/v1/certificates/{}", api_host, id), None)
            .await
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        Ok(ManagedCertificate {
            id: res.certificate_id,
            key_type: KeyType::new(&res.key_type)?,
            public_key: res.pub_key,
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }

    pub async fn import(
        certificate: Vec<u8>,
        password: Option<String>,
        certificate_type: CertificateType,
        api_host: String,
        api_key: String,
        api_version: Option<String>,
    ) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, api_version);

        let res: ManagedCertificateResponse = client
            .post_file(
                format!("{}/keys/v1/certificates/import", api_host),
                vec![("certificate".to_owned(), certificate)],
                password
                    .map(|pass| vec![("password".to_owned(), pass)])
                    .unwrap_or_else(|| vec![]),
                Some(certificate_type.get_certificate_type()),
                None,
            )
            .await
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        Ok(ManagedCertificate {
            id: res.certificate_id,
            key_type: KeyType::new(&res.key_type)?,
            public_key: res.pub_key,
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }
}

#[cfg(test)]
mod tests {
    use crate::{managed::ProtectionLevel, CertificateSubject, KeyType};

    use super::{ManagedCertificate, ManagedCertificateParams, ManagedKey, ManagedKeyParams};

    #[tokio::test]
    async fn test_managed_key_ec() {
        let name = "Test key".to_string();
        let key_type = KeyType::EcP256k;
        let protection = ProtectionLevel::SOFTWARE;

        let params = ManagedKeyParams {
            name: Some(name.clone()),
            key_type: key_type.clone(),
            protection,
            expiration: None,
        };
        let key = ManagedKey::new(
            &params,
            "https://api.bloock.com".to_string(),
            option_env!("API_KEY").unwrap().to_string(),
            None,
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
            protection,
            expiration: None,
        };
        let key = ManagedKey::new(
            &params,
            "https://api.bloock.com".to_string(),
            option_env!("API_KEY").unwrap().to_string(),
            None,
        )
        .await
        .unwrap();

        assert_eq!(key.name, Some(name));
        assert_eq!(key.key_type, key_type);
        assert_eq!(key.protection, protection);
        assert_ne!(key.public_key, "".to_string());
    }

    #[tokio::test]
    async fn test_managed_certificate_ec() {
        let key_type = KeyType::EcP256k;
        let subject_params = CertificateSubject {
            cn: "Google internet Authority G2".to_string(),
            o: "Google Inc".to_string(),
            ou: "IT Department".to_string(),
            c: "US".to_string(),
        };

        let params = ManagedCertificateParams {
            key_type: key_type.clone(),
            subject: subject_params,
            expiration: 5,
        };
        let certificate = ManagedCertificate::new(
            &params,
            "https://api.bloock.com".to_string(),
            option_env!("API_KEY").unwrap().to_string(),
            None,
        )
        .await
        .unwrap();

        assert_eq!(certificate.key_type, key_type);
        assert_eq!(certificate.protection, ProtectionLevel::SOFTWARE);
        assert_ne!(certificate.public_key, "".to_string());
    }

    #[tokio::test]
    async fn test_managed_certificate_rsa() {
        let key_type = KeyType::Rsa2048;
        let subject_params = CertificateSubject {
            cn: "Google internet Authority G2".to_string(),
            o: "Google Inc".to_string(),
            ou: "IT Department".to_string(),
            c: "US".to_string(),
        };

        let params = ManagedCertificateParams {
            key_type: key_type.clone(),
            subject: subject_params,
            expiration: 5,
        };
        let certificate = ManagedCertificate::new(
            &params,
            "https://api.bloock.com".to_string(),
            option_env!("API_KEY").unwrap().to_string(),
            None,
        )
        .await
        .unwrap();

        assert_eq!(certificate.key_type, key_type);
        assert_eq!(certificate.protection, ProtectionLevel::SOFTWARE);
        assert_ne!(certificate.public_key, "".to_string());
    }
}
