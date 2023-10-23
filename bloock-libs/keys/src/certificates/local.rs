use super::p12::PFX;
use super::{from_now, CertificateSubject};
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

pub struct LocalCertificateParams {
    pub key_type: KeyType,
    pub subject: CertificateSubject,
    pub password: String,
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
        if params.key_type != KeyType::Rsa2048 {
            return Err(crate::KeysError::NotSupportedLocalCertificateType());
        }

        let serial_number = SerialNumber::from(42u32);
        let now = Duration::new(31536000, 0);
        let validity = from_now(now).unwrap();

        let profile = Profile::Root;
        let subject = Name::from_str(&params.subject.serialize()).unwrap();

        let key = LocalKey::new(&LocalKeyParams {
            key_type: KeyType::Rsa2048,
        })
        .unwrap();

        let pub_key = rsa::RsaPublicKey::from_public_key_pem(&key.key.clone()).unwrap();
        let pub_key =
            SubjectPublicKeyInfoOwned::try_from(pub_key.to_public_key_der().unwrap().as_bytes())
                .unwrap();
        let private_key =
            rsa::RsaPrivateKey::from_pkcs8_pem(&key.private_key.clone().unwrap()).unwrap();
        let signer = SigningKey::<Sha256>::new(private_key.clone());
        let builder =
            CertificateBuilder::new(profile, serial_number, validity, subject, pub_key, &signer)
                .expect("Create certificate");
        let certificate: CertificateInner = builder.build().unwrap();

        let p12 = PFX::new(
            certificate.to_der().unwrap().as_slice(),
            private_key.to_pkcs8_der().unwrap().as_bytes(),
            None,
            &params.password.clone(),
            "",
        )
        .unwrap();

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
        let public_key = private_key.to_public_key();

        let key = LocalKey::load(
            KeyType::Rsa2048,
            public_key.to_public_key_pem(LineEnding::default()).unwrap(),
            Some(
                private_key
                    .to_pkcs8_pem(LineEnding::default())
                    .unwrap()
                    .to_string(),
            ),
        );

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
            local::{LocalCertificate, LocalCertificateParams},
            CertificateSubject,
        },
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
        };
        let certificate = LocalCertificate::new(&params).unwrap();
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
        };
        let certificate = LocalCertificate::new(&params);

        assert!(certificate.is_err());
    }
}
