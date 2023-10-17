use crate::{Result, SignerError};
use serde::{Deserialize, Serialize};
use std::fmt;

pub const ECDSA_ALG: &str = "ES256K";
pub const MANAGED_ECDSA_ALG: &str = "ES256K_M";
pub const ENS_ALG: &str = "ENS";
pub const MANAGED_ENS_ALG: &str = "ENS_M";
pub const BJJ_ALG: &str = "BJJ";
pub const MANAGED_BJJ_ALG: &str = "BJJ_M";
pub const RSA_2048_ALG: &str = "RSA_2048";
pub const MANAGED_RSA_2048_ALG: &str = "RSA_2048_M";

#[derive(Debug, Clone, PartialEq, Eq, Deserialize, Serialize)]
pub enum SignAlg {
    Es256k,
    Es256kM,
    Bjj,
    BjjM,
    Rsa2048,
    Rsa2048M,
}

impl Default for SignAlg {
    fn default() -> Self {
        Self::Es256k
    }
}

impl fmt::Display for SignAlg {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            SignAlg::Es256k => write!(f, "{ECDSA_ALG}"),
            SignAlg::Es256kM => write!(f, "{MANAGED_ECDSA_ALG}"),
            SignAlg::Bjj => write!(f, "{BJJ_ALG}"),
            SignAlg::BjjM => write!(f, "{MANAGED_BJJ_ALG}"),
            SignAlg::Rsa2048 => write!(f, "{RSA_2048_ALG}"),
            SignAlg::Rsa2048M => write!(f, "{MANAGED_RSA_2048_ALG}"),
        }
    }
}

impl TryFrom<&str> for SignAlg {
    type Error = SignerError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            ECDSA_ALG => Ok(Self::Es256k),
            MANAGED_ECDSA_ALG => Ok(Self::Es256kM),
            BJJ_ALG => Ok(Self::Bjj),
            MANAGED_BJJ_ALG => Ok(Self::BjjM),
            RSA_2048_ALG => Ok(Self::Rsa2048),
            MANAGED_RSA_2048_ALG => Ok(Self::Rsa2048M),
            _ => Err(SignerError::InvalidSignatureAlg()),
        }
    }
}
