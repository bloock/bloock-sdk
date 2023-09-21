use crate::{Result, SignerError};
use std::fmt;

pub const ECDSA_ALG: &str = "ES256K";
pub const ENS_ALG: &str = "ENS";
pub const MANAGED_ECDSA_ALG: &str = "ES256K_M";
pub const MANAGED_ENS_ALG: &str = "ENS_M";
pub const MANAGED_BJJ_ALG: &str = "BJJ_M";

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum SignAlg {
    Es256k,
    Ens,
    Es256kM,
    EnsM,
    BjjM,
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
            SignAlg::Ens => write!(f, "{ENS_ALG}"),
            SignAlg::Es256kM => write!(f, "{MANAGED_ECDSA_ALG}"),
            SignAlg::EnsM => write!(f, "{MANAGED_ENS_ALG}"),
            SignAlg::BjjM => write!(f, "{MANAGED_BJJ_ALG}"),
        }
    }
}

impl TryFrom<&str> for SignAlg {
    type Error = SignerError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            ECDSA_ALG => Ok(Self::Es256k),
            ENS_ALG => Ok(Self::Ens),
            MANAGED_ECDSA_ALG => Ok(Self::Es256kM),
            MANAGED_ENS_ALG => Ok(Self::EnsM),
            MANAGED_BJJ_ALG => Ok(Self::BjjM),
            _ => Err(SignerError::InvalidSignatureAlg()),
        }
    }
}
