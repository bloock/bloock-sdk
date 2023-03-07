use crate::{Result, SignerError};
use std::fmt;

pub const ECDSA_ALG: &str = "ES256K";
pub const ENS_ALG: &str = "ENS";
pub const MANAGED_ECDSA_ALG: &str = "ES256K_M";
pub const MANAGED_ENS_ALG: &str = "ENS_M";

pub enum Algorithms {
    Es256k,
    Ens,
    Es256kM,
    EnsM,
}

impl fmt::Display for Algorithms {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Algorithms::Es256k => write!(f, "{ECDSA_ALG}"),
            Algorithms::Ens => write!(f, "{ENS_ALG}"),
            Algorithms::Es256kM => write!(f, "{MANAGED_ECDSA_ALG}"),
            Algorithms::EnsM => write!(f, "{MANAGED_ENS_ALG}"),
        }
    }
}

impl TryFrom<&str> for Algorithms {
    type Error = SignerError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            ECDSA_ALG => Ok(Self::Es256k),
            ENS_ALG => Ok(Self::Ens),
            MANAGED_ECDSA_ALG => Ok(Self::Es256kM),
            MANAGED_ENS_ALG => Ok(Self::EnsM),
            _ => Err(SignerError::InvalidSignatureAlg()),
        }
    }
}
