use crate::entity::signature::Signature;
use async_trait::async_trait;
use bloock_hasher::H256;
use bloock_keys::entity::key::Key;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod bjj;
pub mod ecdsa;
pub mod ens;
pub mod entity;
pub mod format;

pub type Result<T> = std::result::Result<T, SignerError>;

#[async_trait(?Send)]
pub trait Signer {
    async fn sign(&self, payload: &[u8], key: Key) -> Result<Signature>;
    async fn verify(&self, payload: &[u8], signature: Signature) -> Result<bool>;
    async fn recover_public_key(&self, signature: &Signature) -> Result<Vec<u8>>;
    async fn get_common_name(&self, signature: &Signature) -> Result<String>;
}

pub trait SignFormat {
    fn prepare_payload(&self, payload: &[u8]) -> Vec<u8>;
    fn serialize(&self, signature: Vec<Signature>) -> String;
    fn deserialize(&self, signature: String) -> Vec<Signature>;
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
