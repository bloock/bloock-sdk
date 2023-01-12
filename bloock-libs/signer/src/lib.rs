use std::{fmt, str::from_utf8};

use ecdsa::{EcdsaVerifier, ECDSA_ALG};
use ens::{ENS_ALG, EnsVerifier};
use serde::{Deserialize, Serialize};
use thiserror::Error as ThisError;

pub mod ecdsa;
pub mod ens;

pub type Result<T> = std::result::Result<T, SignerError>;

enum Algorithms {
    ECDSA,
    ENS,
}

impl fmt::Display for Algorithms {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match self {
            Algorithms::ECDSA => write!(f, "{}", ECDSA_ALG),
            Algorithms::ENS => write!(f, "{}", ENS_ALG),
        }
    }
}

impl TryFrom<&str> for Algorithms {
    type Error = SignerError;

    fn try_from(value: &str) -> Result<Self> {
        match value {
            ECDSA_ALG => Ok(Self::ECDSA),
            ENS_ALG => Ok(Self::ENS),
            _ => Err(SignerError::InvalidSignatureAlg()),
        }
    }
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct JWSignatures {
    pub signatures: Vec<Signature>,
    pub payload: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Signature {
    pub header: SignatureHeader,
    pub protected: String,
    pub signature: String,
}

impl Signature {
    pub async fn get_common_name(&self) -> Result<String> {
        let alg = Algorithms::try_from(self.header.alg.as_str())?;
        match alg {
            Algorithms::ECDSA => ecdsa::get_common_name(self),
            Algorithms::ENS => ens::get_common_name(self).await,
        }
    }
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct SignatureHeader {
    pub alg: String,
    pub kid: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ProtectedHeader {
    pub common_name: Option<String>,
}

impl ProtectedHeader {
    fn serialize(&self) -> Result<String> {
        Ok(base64_url::encode(&serde_json::to_string(self).map_err(
            |err| SignerError::GeneralSerializeError(err.to_string()),
        )?))
    }

    fn deserialize(protected: &str) -> Result<Self> {
        serde_json::from_str(
            from_utf8(
                &base64_url::decode(&protected)
                    .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))?,
            )
            .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))?,
        )
        .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))
    }
}

pub trait Signer {
    fn sign(&self, payload: &[u8]) -> Result<Signature>;
}

pub trait Verifier {
    fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool>;
}

pub fn create_verifier_from_signature(signature: &Signature) -> Result<Box<dyn Verifier>> {
    match Algorithms::try_from(signature.header.alg.as_str())? {
        Algorithms::ECDSA => Ok(Box::new(EcdsaVerifier::default())),
        Algorithms::ENS => Ok(Box::new(EnsVerifier::default())),
    }
}

impl From<JWSignatures> for Signature {
    fn from(s: JWSignatures) -> Self {
        Self {
            protected: s.signatures[0].protected.clone(),
            signature: s.signatures[0].signature.clone(),
            header: s.signatures[0].header.clone(),
        }
    }
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum SignerError {
    #[error("Invalid UTF-8 sequence: {0}")]
    StringConversionError(String),
    #[error("Error generating key pair: {0}")]
    KeyPairError(String),
    #[error("Error Signer: {0}")]
    SignerError(String),
    #[error("Invalid Secret Key: {0}")]
    InvalidSecretKey(String),
    #[error("Invalid Public Key: {0}")]
    InvalidPublicKey(String),
    #[error("Invalid Signature: {0}")]
    InvalidSignature(String),
    #[error("Invalid signature algorithm found")]
    InvalidSignatureAlg(),
    #[error("Error General Serialize: {0}")]
    GeneralSerializeError(String),
    #[error("Error General Deserialize: {0}")]
    GeneralDeserializeError(String),
    #[error("Error Verifier: {0}")]
    VerifierError(String),
    #[error(
        "Could not retrieve common name. Common name is not set or the format is invalid: {0}"
    )]
    CommonNameNotSetOrInvalidFormat(String),
    #[error("ETH Domain not found")]
    EthDomainNotFound(),
}
