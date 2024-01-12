use core::time::Duration;
use std::time::{Duration as TimeDuration, SystemTime};

use x509_cert::{
    der,
    time::{Time, Validity},
    Certificate,
};

use crate::{
    entity::key::{Key, Local, Managed},
    KeyType,
};

use self::{
    local::{LocalCertificate, LocalCertificateParams, LocalCertificateWithKeyParams},
    managed::ManagedCertificate,
};
use async_trait::async_trait;

pub mod local;
pub mod managed;
mod p12;

#[derive(Clone)]
pub struct CertificateSubject {
    pub common_name: String,
    pub organizational_unit: Option<String>,
    pub organization: Option<String>,
    pub location: Option<String>,
    pub state: Option<String>,
    pub country: Option<String>,
}

impl CertificateSubject {
    pub fn serialize(&self) -> String {
        let mut subject_names = vec![];
        subject_names.push(format!("CN={}", self.common_name));

        if let Some(ou) = &self.organizational_unit {
            subject_names.push(format!("OU={}", ou));
        }

        if let Some(o) = &self.organization {
            subject_names.push(format!("O={}", o));
        }

        if let Some(l) = &self.location {
            subject_names.push(format!("L={}", l));
        }

        if let Some(s) = &self.state {
            subject_names.push(format!("S={}", s));
        }

        if let Some(c) = &self.country {
            subject_names.push(format!("C={}", c));
        }

        subject_names.join(",")
    }
}

#[async_trait(?Send)]
pub trait GetX509Certficate {
    async fn get_certificate(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Option<Certificate>;
}

#[async_trait(?Send)]
impl GetX509Certficate for Key {
    async fn get_certificate(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Option<Certificate> {
        match self {
            Key::Local(l) => l.get_certificate(api_host, api_key, environment).await,
            Key::Managed(m) => m.get_certificate(api_host, api_key, environment).await,
        }
    }
}

#[async_trait(?Send)]
impl GetX509Certficate for Local {
    async fn get_certificate(
        &self,
        _api_host: String,
        _api_key: String,
        _environment: Option<String>,
    ) -> Option<Certificate> {
        match self {
            Local::Key(key) => {
                let params = LocalCertificateWithKeyParams {
                    key,
                    password: "".to_string(),
                    subject: CertificateSubject {
                        common_name: "Self-issued".to_string(),
                        organizational_unit: None,
                        organization: None,
                        location: None,
                        state: None,
                        country: None,
                    },
                    expiration: 1,
                };
                let certificate = LocalCertificate::new_from_key(&params).ok()?;
                Some(certificate.certificate)
            }
            Local::Certificate(local_certificate) => local_certificate.get_certificate_inner().ok(),
        }
    }
}

#[async_trait(?Send)]
impl GetX509Certficate for Managed {
    async fn get_certificate(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Option<Certificate> {
        match self {
            Managed::Key(_) => Some(create_self_certificate()),
            Managed::Certificate(managed_certificate) => ManagedCertificate::load_x509_certificate(
                managed_certificate.id.clone(),
                api_host,
                api_key,
                environment,
            )
            .await
            .ok(),
        }
    }
}

fn create_self_certificate() -> Certificate {
    let params = LocalCertificateParams {
        key_type: KeyType::Rsa2048,
        password: "password".to_string(),
        subject: CertificateSubject {
            common_name: "Bloock".to_string(),
            organizational_unit: None,
            organization: None,
            location: None,
            state: None,
            country: None,
        },
        expiration: 2,
    };
    let certificate = LocalCertificate::new(&params).unwrap();
    certificate.certificate
}

pub fn from_now(duration: Duration) -> der::Result<Validity> {
    let now = u128_to_system_time(get_current_timestamp());
    let then = now + duration;

    Ok(Validity {
        not_before: Time::try_from(now)?,
        not_after: Time::try_from(then)?,
    })
}

#[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
fn get_current_timestamp() -> u128 {
    (js_sys::Date::now()) as u128
}

#[cfg(not(any(target_arch = "wasm32", target_arch = "wasm64")))]
fn get_current_timestamp() -> u128 {
    use std::time::UNIX_EPOCH;

    match SystemTime::now().duration_since(UNIX_EPOCH) {
        Ok(d) => d.as_millis(),
        Err(_) => 1,
    }
}

fn u128_to_system_time(nanoseconds: u128) -> SystemTime {
    let duration = TimeDuration::from_millis(nanoseconds.try_into().unwrap());
    SystemTime::UNIX_EPOCH + duration
}
