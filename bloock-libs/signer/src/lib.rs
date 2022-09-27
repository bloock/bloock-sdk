use ecsda::{EcsdaVerifier, ECSDA_ALG};
use serde::{Deserialize, Serialize};
use thiserror::Error as ThisError;

pub mod ecsda;

pub type Result<T> = std::result::Result<T, SignerError>;

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

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct SignatureHeader {
    pub alg: String,
    pub kid: String,
}

pub trait Signer {
    fn sign(&self, payload: &[u8]) -> Result<Signature>;
}

pub trait Verifier {
    fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool>;
}

pub fn create_verifier_from_signature(signature: &Signature) -> Result<impl Verifier> {
    match signature.header.alg.as_str() {
        ECSDA_ALG => Ok(EcsdaVerifier {}),
        _ => Err(SignerError::InvalidSignatureAlg()),
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
}
