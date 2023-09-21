use crate::{
    entity::protection_level::ProtectionLevel, CertificateType, KeyType, KeysError, Result,
};
use bloock_http::Client;
use serde::{Deserialize, Serialize};

use super::CertificateSubject;

pub struct ManagedCertificateParams {
    pub key_type: KeyType,
    pub expiration: i32,
    pub subject: CertificateSubject,
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
pub struct CreateManagedCertificateRequest {
    pub key_type: String,
    pub subject: String,
    pub expiration: i32,
}

#[derive(Clone, Debug, PartialEq, Eq, Deserialize, Serialize)]
pub struct ManagedCertificateResponse {
    pub certificate_id: String,
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
        api_version: Option<String>,
    ) -> Result<ManagedCertificate> {
        let client = bloock_http::BloockHttpClient::new(api_key, api_version);

        let req = CreateManagedCertificateRequest {
            key_type: params.key_type.get_key_type(),
            subject: params.subject.serialize(),
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
    use crate::{
        certificates::CertificateSubject, entity::protection_level::ProtectionLevel, KeyType,
    };

    use super::{ManagedCertificate, ManagedCertificateParams};

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

        assert_eq!(certificate.key_type, key_type);
        assert_eq!(certificate.protection, ProtectionLevel::SOFTWARE);
        assert_ne!(certificate.public_key, "".to_string());
    }

    #[tokio::test]
    async fn test_managed_certificate_rsa() {
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
