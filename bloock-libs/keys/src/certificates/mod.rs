use core::time::Duration;
use std::time::{Duration as TimeDuration, SystemTime};

use x509_cert::{
    der,
    time::{Time, Validity},
    Certificate,
};

use crate::{
    entity::key::{Key, Local, Managed}, KeyType, KeysError, Result
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
    pub fn serialize_managed(&self) -> String {
        let mut subject_names = vec![];
        subject_names.push(format!(
            "CN={}",
            normalize_value_with_quotes(&self.common_name)
        ));

        if let Some(ou) = &self.organizational_unit {
            subject_names.push(format!("OU={}", normalize_value_with_quotes(ou)));
        }

        if let Some(o) = &self.organization {
            subject_names.push(format!("O={}", normalize_value_with_quotes(o)));
        }

        if let Some(l) = &self.location {
            subject_names.push(format!("L={}", normalize_value_with_quotes(l)));
        }

        if let Some(s) = &self.state {
            subject_names.push(format!("S={}", normalize_value_with_quotes(s)));
        }

        if let Some(c) = &self.country {
            subject_names.push(format!("C={}", normalize_value_with_quotes(c)));
        }

        subject_names.join(",")
    }

    pub fn serialize_local(&self) -> String {
        let mut subject_names = vec![];
        subject_names.push(format!("CN={}", normalize_value_with_back_slash(&self.common_name)));

        if let Some(ou) = &self.organizational_unit {
            subject_names.push(format!("OU={}", normalize_value_with_back_slash(ou)));
        }

        if let Some(o) = &self.organization {
            subject_names.push(format!("O={}", normalize_value_with_back_slash(o)));
        }

        if let Some(l) = &self.location {
            subject_names.push(format!("L={}", normalize_value_with_back_slash(l)));
        }

        if let Some(s) = &self.state {
            subject_names.push(format!("S={}", normalize_value_with_back_slash(s)));
        }

        if let Some(c) = &self.country {
            subject_names.push(format!("C={}", normalize_value_with_back_slash(c)));
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
    ) -> Result<Certificate>;
}

#[async_trait(?Send)]
impl GetX509Certficate for Key {
    async fn get_certificate(
        &self,
        api_host: String,
        api_key: String,
    ) -> Result<Certificate> {
        match self {
            Key::Local(l) => l.get_certificate(api_host, api_key).await,
            Key::Managed(m) => m.get_certificate(api_host, api_key).await,
        }
    }
}

#[async_trait(?Send)]
impl GetX509Certficate for Local {
    async fn get_certificate(
        &self,
        _api_host: String,
        _api_key: String,
    ) -> Result<Certificate> {
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
                    expiration: 12,
                };
                let certificate = LocalCertificate::new_from_key(&params)?;
                Ok(certificate.certificate)
            }
            Local::Certificate(local_certificate) => local_certificate.get_certificate_inner(),
        }
    }
}

#[async_trait(?Send)]
impl GetX509Certficate for Managed {
    async fn get_certificate(
        &self,
        api_host: String,
        api_key: String,
    ) -> Result<Certificate> {
        match self {
            Managed::Key(_) => Err(KeysError::ErrorCertificateTypeNotSupported()),
            Managed::Certificate(managed_certificate) => managed_certificate.load_x509_certificate(
                api_host,
                api_key,
            )
            .await,
        }
    }
}

fn normalize_value_with_quotes(input: &str) -> String {
    let special_characters = "ñ,\\+=\"\n<>#;";

    let contains_special_character = input.chars().any(|c| special_characters.contains(c));

    if contains_special_character {
        format!("\"{}\"", input)
    } else {
        input.to_owned()
    }
}

fn normalize_value_with_back_slash(input: &str) -> String {
    let special_characters = "ñ,\\+=\"\n<>#;";

    let normalized_string: String = input
        .chars()
        .map(|c| {
            if special_characters.contains(c) {
                format!("\\{}", c)
            } else {
                c.to_string()
            }
        })
        .collect();
    normalized_string
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

#[cfg(test)]
mod tests {
    use super::{normalize_value_with_quotes, CertificateSubject};
    use regex::Regex;

    #[test]
    fn test_normalize_rdn_value() {
        let input = "Hello, World + Byte".to_string();

        let res = normalize_value_with_quotes(&input);
        assert!(contains_quoted_content(&res))
    }

    #[test]
    fn test_serialize() {
        let input = CertificateSubject {
            common_name: "Bloock, SL".to_string(),
            organizational_unit: Some("BloockI+D".to_string()),
            organization: Some("Bloock=ID".to_string()),
            location: Some("Sant;Cugat".to_string()),
            state: Some("BloockI+D".to_string()),
            country: Some("Spain\"".to_string()),
        };

        let res = input.serialize_managed();
        assert!(contains_quoted_content(&res))
    }

    fn contains_quoted_content(input: &str) -> bool {
        let re = Regex::new(r#""[^"]*""#).unwrap();

        re.is_match(input)
    }
}
