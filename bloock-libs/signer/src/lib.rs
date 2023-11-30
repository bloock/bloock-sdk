use crate::entity::signature::Signature;
use crate::rsa::RsaSigner;
use async_trait::async_trait;
use bjj::BJJSigner;
use bloock_keys::entity::key::{Key, Local, Managed};
use ecdsa::EcdsaSigner;
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod bjj;
pub mod ecdsa;
pub mod ens;
pub mod entity;
pub mod format;
pub mod rsa;

pub type Result<T> = std::result::Result<T, SignerError>;

pub async fn sign(
    api_host: String,
    api_key: String,
    environment: Option<String>,
    payload: &[u8],
    key: &Key,
) -> Result<Signature> {
    let alg = match key {
        Key::Local(l) => match l {
            Local::Key(k) => k.key_type.clone(),
            Local::Certificate(k) => k.key.key_type.clone(),
        },
        Key::Managed(m) => match m {
            Managed::Key(k) => k.key_type.clone(),
            Managed::Certificate(k) => k.key.key_type.clone(),
        },
    };

    let signer: Box<dyn Signer> = match alg {
        bloock_keys::KeyType::EcP256k => EcdsaSigner::new_boxed(api_host, api_key, environment),
        bloock_keys::KeyType::BJJ => BJJSigner::new_boxed(api_host, api_key, environment),
        bloock_keys::KeyType::Rsa2048 => RsaSigner::new_boxed(api_host, api_key, environment),
        bloock_keys::KeyType::Rsa3072 => RsaSigner::new_boxed(api_host, api_key, environment),
        bloock_keys::KeyType::Rsa4096 => RsaSigner::new_boxed(api_host, api_key, environment),
        bloock_keys::KeyType::Aes128 => Err(SignerError::InvalidSignatureAlg())?,
        bloock_keys::KeyType::Aes256 => Err(SignerError::InvalidSignatureAlg())?,
    };

    match key {
        Key::Local(l) => signer.sign_local(payload, l).await,
        Key::Managed(m) => signer.sign_managed(payload, m).await,
    }
}

pub async fn verify(
    api_host: String,
    api_key: String,
    environment: Option<String>,
    payload: &[u8],
    signature: &Signature,
) -> Result<bool> {
    match signature.alg {
        entity::alg::SignAlg::Es256k => {
            EcdsaSigner::new_boxed(api_host, api_key, environment)
                .verify_local(payload, signature)
                .await
        }
        entity::alg::SignAlg::Es256kM => {
            EcdsaSigner::new_boxed(api_host, api_key, environment)
                .verify_managed(payload, signature)
                .await
        }
        entity::alg::SignAlg::Bjj => {
            BJJSigner::new_boxed(api_host, api_key, environment)
                .verify_local(payload, signature)
                .await
        }
        entity::alg::SignAlg::BjjM => {
            BJJSigner::new_boxed(api_host, api_key, environment)
                .verify_managed(payload, signature)
                .await
        }
        entity::alg::SignAlg::Rsa => {
            RsaSigner::new_boxed(api_host, api_key, environment)
                .verify_local(payload, signature)
                .await
        }
        entity::alg::SignAlg::RsaM => {
            RsaSigner::new_boxed(api_host, api_key, environment)
                .verify_managed(payload, signature)
                .await
        }
    }
}

#[async_trait(?Send)]
pub trait Signer {
    async fn sign_local(&self, payload: &[u8], key: &Local) -> Result<Signature>;
    async fn sign_managed(&self, payload: &[u8], key: &Managed) -> Result<Signature>;

    async fn verify_local(&self, payload: &[u8], signature: &Signature) -> Result<bool>;
    async fn verify_managed(&self, payload: &[u8], signature: &Signature) -> Result<bool>;
}

pub trait SignFormat {
    fn prepare_payload(payload: &[u8]) -> Vec<u8>;
    fn serialize(signature: Vec<Signature>) -> Result<String>;
    fn deserialize(signature: String) -> Result<Vec<Signature>>;
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
