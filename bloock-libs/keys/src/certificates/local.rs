use super::p12::PFX;
use super::{from_now, CertificateSubject};
use crate::KeysError;
use crate::{
    keys::local::{LocalKey, LocalKeyParams},
    KeyType, Result,
};
use rsa::{
    pkcs1v15::SigningKey,
    pkcs8::{DecodePrivateKey, DecodePublicKey, EncodePrivateKey, EncodePublicKey, LineEnding},
};
use sha2::Sha256;
use std::{str::FromStr, time::Duration};
use x509_cert::{
    builder::{Builder, CertificateBuilder, Profile},
    certificate::CertificateInner,
    der::{Decode, Encode},
    name::Name,
    serial_number::SerialNumber,
    spki::SubjectPublicKeyInfoOwned,
    Certificate,
};

const SECONDS_PER_YEAR: i32 = 31556926;

pub struct LocalCertificateParams {
    pub key_type: KeyType,
    pub subject: CertificateSubject,
    pub password: String,
    pub expiration: i32,
}

pub struct LocalCertificateWithKeyParams<'a> {
    pub key: &'a LocalKey<String>,
    pub subject: CertificateSubject,
    pub password: String,
    pub expiration: i32,
}

#[derive(Clone)]
pub struct LocalCertificate<S: ToString> {
    pub key: LocalKey<S>,
    pub certificate: CertificateInner,
    pub pkcs12: Vec<u8>,
    pub password: String,
}

impl LocalCertificate<String> {
    pub fn new(params: &LocalCertificateParams) -> Result<LocalCertificate<String>> {
        if params.key_type != KeyType::Rsa2048
            && params.key_type != KeyType::Rsa3072
            && params.key_type != KeyType::Rsa4096
        {
            return Err(crate::KeysError::NotSupportedLocalCertificateType());
        }

        let serial_number = SerialNumber::from(42u32);
        let now = Duration::new(
            (params.expiration * SECONDS_PER_YEAR)
                .try_into()
                .map_err(|_| {
                    KeysError::NewLocalCertificateError(
                        "cannot parse expiration interval".to_string(),
                    )
                })?,
            0,
        );
        let validity =
            from_now(now).map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;

        let profile = Profile::Root;
        let subject = Name::from_str(&params.subject.serialize())
            .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;

        let key = LocalKey::new(&LocalKeyParams {
            key_type: params.key_type.clone(),
        })
        .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;

        let pub_key = rsa::RsaPublicKey::from_public_key_pem(&key.key.clone())
            .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;
        let pub_key =
            SubjectPublicKeyInfoOwned::try_from(pub_key.to_public_key_der().unwrap().as_bytes())
                .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;
        let private_key = rsa::RsaPrivateKey::from_pkcs8_pem(&key.private_key.clone().unwrap())
            .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;
        let signer = SigningKey::<Sha256>::new(private_key.clone());
        let builder =
            CertificateBuilder::new(profile, serial_number, validity, subject, pub_key, &signer)
                .expect("Create certificate");
        let certificate: CertificateInner = builder
            .build()
            .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?;

        let p12 = PFX::new(
            certificate
                .to_der()
                .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?
                .as_slice(),
            private_key
                .to_pkcs8_der()
                .map_err(|e| KeysError::NewLocalCertificateError(e.to_string()))?
                .as_bytes(),
            None,
            &params.password.clone(),
            "",
        )
        .ok_or(KeysError::NewLocalCertificateError("".to_string()))?;

        Ok(LocalCertificate {
            key,
            certificate,
            pkcs12: p12.to_der(),
            password: params.password.clone(),
        })
    }

    pub fn new_from_key(
        params: &LocalCertificateWithKeyParams,
    ) -> Result<LocalCertificate<String>> {
        if params.key.key_type != KeyType::Rsa2048
            && params.key.key_type != KeyType::Rsa3072
            && params.key.key_type != KeyType::Rsa4096
        {
            return Err(crate::KeysError::NotSupportedLocalCertificateType());
        }

        let serial_number = SerialNumber::from(42u32);
        let now = Duration::new(
            (params.expiration * SECONDS_PER_YEAR)
                .try_into()
                .map_err(|_| {
                    KeysError::LoadLocalCertificateError(
                        "cannot parse expiration interval".to_string(),
                    )
                })?,
            0,
        );
        let validity =
            from_now(now).map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?;

        let profile = Profile::Root;
        let subject = Name::from_str(&params.subject.serialize())
            .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?;

        let key = params.key.clone();

        let pub_key = rsa::RsaPublicKey::from_public_key_pem(&key.key.clone())
            .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?;
        let pub_key = SubjectPublicKeyInfoOwned::try_from(
            pub_key
                .to_public_key_der()
                .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?
                .as_bytes(),
        )
        .unwrap();
        let private_key = rsa::RsaPrivateKey::from_pkcs8_pem(&key.private_key.clone().ok_or(
            KeysError::LoadLocalCertificateError("no private key found".to_string()),
        )?)
        .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?;
        let signer = SigningKey::<Sha256>::new(private_key.clone());
        let builder =
            CertificateBuilder::new(profile, serial_number, validity, subject, pub_key, &signer)
                .expect("Create certificate");
        let certificate: CertificateInner = builder
            .build()
            .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?;

        let p12 = PFX::new(
            certificate
                .to_der()
                .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?
                .as_slice(),
            private_key
                .to_pkcs8_der()
                .map_err(|e| KeysError::LoadLocalCertificateError(e.to_string()))?
                .as_bytes(),
            None,
            &params.password.clone(),
            "",
        )
        .ok_or(KeysError::LoadLocalCertificateError("".to_string()))?;

        Ok(LocalCertificate {
            key,
            certificate,
            pkcs12: p12.to_der(),
            password: params.password.clone(),
        })
    }

    pub fn load_pkcs12(pkcs12: &[u8], password: &str) -> Result<LocalCertificate<String>> {
        let p12 = PFX::parse(pkcs12).unwrap();

        let certs = p12.cert_x509_bags(password).unwrap();
        let cert = certs.first().unwrap();

        let keys = p12.key_bags(password).unwrap();
        let key = keys.first().unwrap();

        let certificate = Certificate::from_der(cert).unwrap();

        let private_key = rsa::RsaPrivateKey::from_pkcs8_der(key).unwrap();

        let key = LocalKey::load(
            KeyType::Rsa2048,
            private_key
                .to_pkcs8_pem(LineEnding::default())
                .unwrap()
                .to_string(),
        )
        .unwrap();

        Ok(LocalCertificate {
            key,
            certificate,
            pkcs12: p12.to_der(),
            password: password.to_owned(),
        })
    }

    pub fn get_certificate_inner(&self) -> Result<Certificate> {
        Ok(self.certificate.clone())
    }
}

#[cfg(test)]
mod tests {
    use crate::{
        certificates::{
            local::{LocalCertificate, LocalCertificateParams, LocalCertificateWithKeyParams},
            CertificateSubject,
        },
        keys::local::{LocalKey, LocalKeyParams},
        KeyType,
    };

    #[test]
    fn test_local_rsa_2048() {
        let cert_type = KeyType::Rsa2048;

        let params = LocalCertificateParams {
            key_type: cert_type.clone(),
            password: "password".to_string(),
            subject: CertificateSubject {
                common_name: "a common name".to_string(),
                organizational_unit: None,
                organization: None,
                location: Some("a location".to_string()),
                state: None,
                country: None,
            },
            expiration: 2,
        };
        let certificate = LocalCertificate::new(&params).unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());

        let certificate = LocalCertificate::load_pkcs12(&certificate.pkcs12, "password").unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());
    }

    #[test]
    fn test_local_rsa_2048_from_key() {
        let key_type = KeyType::Rsa2048;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        let params = LocalCertificateWithKeyParams {
            key: &key,
            password: "password".to_string(),
            subject: CertificateSubject {
                common_name: "a common name".to_string(),
                organizational_unit: None,
                organization: None,
                location: Some("a location".to_string()),
                state: None,
                country: None,
            },
            expiration: 10,
        };
        let certificate = LocalCertificate::new_from_key(&params).unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());

        let certificate = LocalCertificate::load_pkcs12(&certificate.pkcs12, "password").unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());
    }

    #[test]
    fn test_local_rsa_3072_from_key() {
        let key_type = KeyType::Rsa3072;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        let params = LocalCertificateWithKeyParams {
            key: &key,
            password: "password".to_string(),
            subject: CertificateSubject {
                common_name: "a common name".to_string(),
                organizational_unit: None,
                organization: None,
                location: Some("a location".to_string()),
                state: None,
                country: None,
            },
            expiration: 20,
        };
        let certificate = LocalCertificate::new_from_key(&params).unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());

        let certificate = LocalCertificate::load_pkcs12(&certificate.pkcs12, "password").unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());
    }

    #[test]
    fn test_local_rsa_4096_from_key() {
        let key_type = KeyType::Rsa4096;

        let params = LocalKeyParams {
            key_type: key_type.clone(),
        };
        let key = LocalKey::new(&params).unwrap();

        let params = LocalCertificateWithKeyParams {
            key: &key,
            password: "password".to_string(),
            subject: CertificateSubject {
                common_name: "a common name".to_string(),
                organizational_unit: None,
                organization: None,
                location: Some("a location".to_string()),
                state: None,
                country: None,
            },
            expiration: 30,
        };
        let certificate = LocalCertificate::new_from_key(&params).unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());

        let certificate = LocalCertificate::load_pkcs12(&certificate.pkcs12, "password").unwrap();
        let subject = certificate.certificate.tbs_certificate.subject;
        assert_eq!("CN=a common name,L=a location", subject.to_string());
    }

    #[test]
    fn test_type_not_supported() {
        let key_type = KeyType::EcP256k;

        let params = LocalCertificateParams {
            key_type: key_type.clone(),
            password: "password".to_string(),
            subject: CertificateSubject {
                common_name: "a common name".to_string(),
                organizational_unit: None,
                organization: None,
                location: Some("a location".to_string()),
                state: None,
                country: None,
            },
            expiration: 50,
        };
        let certificate = LocalCertificate::new(&params);

        assert!(certificate.is_err());
    }
}
