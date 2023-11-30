use serde::{Deserialize, Deserializer, Serialize, Serializer};

use crate::{EncrypterError, Result};
use std::fmt;

pub const AES_ALG: &str = "A256GCM";
pub const RSA_ALG: &str = "RSA";

#[derive(Clone, Debug, PartialEq)]
pub enum EncryptionAlg {
    A256gcm,
    Rsa,
}

impl Serialize for EncryptionAlg {
    fn serialize<S>(&self, serializer: S) -> std::result::Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        serializer.serialize_str(&self.to_string())
    }
}

impl<'de> Deserialize<'de> for EncryptionAlg {
    fn deserialize<D>(deserializer: D) -> std::result::Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        let s = String::deserialize(deserializer)?;
        EncryptionAlg::try_from(s.as_str()).map_err(serde::de::Error::custom)
    }
}

impl TryFrom<&str> for EncryptionAlg {
    type Error = EncrypterError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            AES_ALG => Ok(Self::A256gcm),
            RSA_ALG => Ok(Self::Rsa),
            _ => Err(EncrypterError::InvalidAlgorithm()),
        }
    }
}

impl fmt::Display for EncryptionAlg {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            EncryptionAlg::A256gcm => write!(f, "{AES_ALG}"),
            EncryptionAlg::Rsa => write!(f, "{RSA_ALG}"),
        }
    }
}
