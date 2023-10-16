use core::time::Duration;
use std::time::{Duration as TimeDuration, SystemTime};

use x509_cert::{
    certificate::CertificateInner,
    der,
    time::{Time, Validity},
    Certificate,
};

use crate::{entity::key::Key, keys::{local::LocalKey, managed::ManagedKey}, KeyType};

use self::local::{LocalCertificateParams, LocalCertificate};

pub mod local;
pub mod managed;
mod p12;

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

//TODO get X509
pub trait GetX509Certficate {
    fn get_certificate(&self) -> Option<Certificate>;
}

impl GetX509Certficate for Key {
    fn get_certificate(&self) -> Option<Certificate> {
        match self {
            Key::LocalKey(_) => Some(create_self_certificate()),
            Key::ManagedKey(_) => Some(create_self_certificate()),
            Key::LocalCertificate(local_certificate) => {
                local_certificate.get_certificate_inner().ok()
            }
            Key::ManagedCertificate(managed_certificate) => todo!(),
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
