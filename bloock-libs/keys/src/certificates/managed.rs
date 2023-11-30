use crate::{
    entity::protection_level::ProtectionLevel, keys::managed::ManagedKey, CertificateType, KeyType,
    KeysError, Result,
};
use bloock_http::Client;
use der::Decode;
use serde::{Deserialize, Serialize};
use x509_cert::{certificate::CertificateInner, Certificate};

use super::CertificateSubject;

pub struct ManagedCertificateParams {
    pub key_type: KeyType,
    pub expiration: i32,
    pub subject: CertificateSubject,
}

#[derive(Clone)]
pub struct ManagedCertificate {
    pub id: String,
    pub key: ManagedKey,
    pub protection: ProtectionLevel,
    pub expiration: Option<i64>,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct CreateManagedCertificateRequest {
    pub key_type: String,
    pub subject: String,
    pub expiration: i32,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct CreateManagedCertificateResponse {
    pub certificate_id: String,
    pub key_type: String,
    pub key_protection: u8,
    pub pub_key: String,
    pub expiration: i64,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct ManagedCertificateResponse {
    pub certificate_id: String,
    pub key: KeyCertificateResponse,
    pub hex_der: String,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct KeyCertificateResponse {
    pub key_type: String,
    pub key_protection: u8,
    pub pub_key: String,
    pub expiration: i64,
}

impl ManagedCertificate {
    pub async fn new(
        params: &ManagedCertificateParams,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, environment);

        let req = CreateManagedCertificateRequest {
            key_type: params.key_type.get_key_type(),
            subject: params.subject.serialize(),
            expiration: params.expiration,
        };
        let res: CreateManagedCertificateResponse = client
            .post_json(format!("{}/keys/v1/certificates", api_host), req, None)
            .await
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        Ok(ManagedCertificate {
            id: res.certificate_id.clone(),
            key: ManagedKey {
                id: res.certificate_id,
                name: None,
                key_type: KeyType::new(&res.key_type)?,
                public_key: res.pub_key,
                protection: res.key_protection.into(),
                expiration: Some(res.expiration),
            },
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }

    pub async fn load(
        id: String,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, environment);

        let res: ManagedCertificateResponse = client
            .get_json(format!("{}/keys/v1/certificates/{}", api_host, id), None)
            .await
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        Ok(ManagedCertificate {
            id: res.certificate_id.clone(),
            key: ManagedKey {
                id: res.certificate_id,
                name: None,
                key_type: KeyType::new(&res.key.key_type)?,
                public_key: res.key.pub_key,
                protection: res.key.key_protection.into(),
                expiration: Some(res.key.expiration),
            },
            protection: res.key.key_protection.into(),
            expiration: Some(res.key.expiration),
        })
    }

    pub async fn load_x509_certificate(
        id: String,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Certificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, environment);

        let res: ManagedCertificateResponse = client
            .get_json(format!("{}/keys/v1/certificates/{}", api_host, id), None)
            .await
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        let der_certificate = hex::decode(res.hex_der)
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?;

        Ok(CertificateInner::from_der(&der_certificate)
            .map_err(|e| KeysError::ManagedCertificateRequestError(e.to_string()))?)
    }

    pub async fn import(
        certificate: Vec<u8>,
        password: Option<String>,
        certificate_type: CertificateType,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, environment);

        let res: CreateManagedCertificateResponse = client
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
            id: res.certificate_id.clone(),
            key: ManagedKey {
                id: res.certificate_id,
                name: None,
                key_type: KeyType::new(&res.key_type)?,
                public_key: res.pub_key,
                protection: res.key_protection.into(),
                expiration: Some(res.expiration),
            },
            protection: res.key_protection.into(),
            expiration: Some(res.expiration),
        })
    }
}

impl From<ManagedCertificate> for ManagedKey {
    fn from(val: ManagedCertificate) -> Self {
        val.key
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        certificates::CertificateSubject, entity::protection_level::ProtectionLevel, KeyType,
    };

    use super::{ManagedCertificate, ManagedCertificateParams};
    use std::{thread::sleep, time::Duration};

    #[tokio::test]
    async fn test_managed_certificate_ec() {
        let key_type = KeyType::EcP256k;
        let subject_params = CertificateSubject {
            common_name: "Google internet Authority G2".to_string(),
            organization: Some("Google Inc".to_string()),
            organizational_unit: Some("IT Department".to_string()),
            country: Some("US".to_string()),
            location: None,
            state: None,
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

        assert_eq!(certificate.key.key_type, key_type);
        assert_eq!(certificate.protection, ProtectionLevel::SOFTWARE);
        assert_ne!(certificate.key.public_key, "".to_string());
    }

    #[tokio::test]
    async fn test_managed_certificate_rsa() {
        let api_host = "https://api.bloock.com".to_string();
        let api_key = option_env!("API_KEY").unwrap().to_string();

        let key_type = KeyType::Rsa2048;
        let subject_params = CertificateSubject {
            common_name: "Google internet Authority G2".to_string(),
            organization: Some("Google Inc".to_string()),
            organizational_unit: Some("IT Department".to_string()),
            country: Some("US".to_string()),
            location: None,
            state: None,
        };

        let params = ManagedCertificateParams {
            key_type: key_type.clone(),
            subject: subject_params,
            expiration: 5,
        };
        let certificate = ManagedCertificate::new(&params, api_host.clone(), api_key.clone(), None)
            .await
            .unwrap();

        assert_eq!(certificate.key.key_type, key_type);
        assert_eq!(certificate.protection, ProtectionLevel::SOFTWARE);
        assert_ne!(certificate.key.public_key, "".to_string());

        sleep(Duration::from_secs(5));

        ManagedCertificate::load_x509_certificate(certificate.id, api_host, api_key, None)
            .await
            .unwrap();
    }
}
