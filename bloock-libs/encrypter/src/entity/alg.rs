use crate::{EncrypterError, Result};
use std::fmt;

pub const AES_ALG: &str = "A256GCM";
pub const RSA_ALG: &str = "RSA";

pub enum EncryptionAlg {
    A256gcm,
    Rsa,
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
