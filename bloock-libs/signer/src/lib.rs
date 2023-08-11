use crate::entity::signature::Signature;
use async_trait::async_trait;
use entity::alg::Algorithms;
use local::ecdsa::LocalEcdsaVerifier;
use local::ens::LocalEnsVerifier;
use managed::bjj::ManagedBJJVerifier;
use managed::ecdsa::ManagedEcdsaVerifier;
use managed::ens::ManagedEnsVerifier;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod entity;
pub mod local;
pub mod managed;

pub type Result<T> = std::result::Result<T, SignerError>;

#[async_trait(?Send)]
pub trait Signer {
    async fn sign(&self, payload: &[u8]) -> Result<Signature>;
}

#[async_trait(?Send)]
pub trait Verifier {
    async fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool>;
}

pub fn create_verifier_from_signature(
    signature: &Signature,
    api_host: String,
    api_key: String,
    api_version: Option<String>,
) -> Result<Box<dyn Verifier>> {
    match Algorithms::try_from(signature.header.alg.as_str())? {
        Algorithms::Es256k => Ok(Box::<LocalEcdsaVerifier>::default()),
        Algorithms::Ens => Ok(Box::<LocalEnsVerifier>::default()),
        Algorithms::Es256kM => Ok(ManagedEcdsaVerifier::new_boxed(api_host, api_key, api_version)),
        Algorithms::EnsM => Ok(ManagedEnsVerifier::new_boxed(api_host, api_key, api_version)),
        Algorithms::BjjM => Ok(ManagedBJJVerifier::new_boxed(api_host, api_key, api_version)),
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
    #[error("Expected message hash but found none")]
    ExpectedMessageHash(),
}
