use crate::rsa::RsaEncrypter;
use aes::AesEncrypter;
use async_trait::async_trait;
use bloock_keys::entity::key::{Key, Local, Managed};
use entity::{encryption::Encryption, encryption_key::EncryptionKey};
use serde::Serialize;
use thiserror::Error as ThisError;

pub mod aes;
pub mod entity;
pub mod rsa;

pub type Result<T> = std::result::Result<T, EncrypterError>;

pub async fn encrypt(
    api_host: String,
    api_key: String,
    payload: &[u8],
    key: &Key,
    access_control: Option<String>,
) -> Result<Encryption> {
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

    let encrypter: Box<dyn Encrypter> = match alg {
        bloock_keys::KeyType::EcP256k => Err(EncrypterError::InvalidAlgorithm())?,
        bloock_keys::KeyType::BJJ => Err(EncrypterError::InvalidAlgorithm())?,
        bloock_keys::KeyType::Rsa2048 => RsaEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Rsa3072 => RsaEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Rsa4096 => RsaEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Aes128 => AesEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Aes256 => AesEncrypter::new_boxed(api_host, api_key),
    };

    match key {
        Key::Local(l) => encrypter.encrypt_local(payload, l).await,
        Key::Managed(m) => encrypter.encrypt_managed(payload, m, access_control).await,
    }
}

pub async fn decrypt(
    api_host: String,
    api_key: String,
    payload: &[u8],
    encryption_key: Option<EncryptionKey>,
    key: &Key,
    access_control: Option<String>,
) -> Result<Vec<u8>> {
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

    let encrypter: Box<dyn Encrypter> = match alg {
        bloock_keys::KeyType::EcP256k => Err(EncrypterError::InvalidAlgorithm())?,
        bloock_keys::KeyType::BJJ => Err(EncrypterError::InvalidAlgorithm())?,
        bloock_keys::KeyType::Rsa2048 => RsaEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Rsa3072 => RsaEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Rsa4096 => RsaEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Aes128 => AesEncrypter::new_boxed(api_host, api_key),
        bloock_keys::KeyType::Aes256 => AesEncrypter::new_boxed(api_host, api_key),
    };

    match key {
        Key::Local(l) => encrypter.decrypt_local(payload, encryption_key, l).await,
        Key::Managed(m) => encrypter.decrypt_managed(payload, encryption_key, m, access_control).await,
    }
}

#[async_trait(?Send)]
pub trait Encrypter {
    async fn encrypt_local(&self, payload: &[u8], key: &Local) -> Result<Encryption>;
    async fn encrypt_managed(&self, payload: &[u8], key: &Managed, access_control: Option<String>) -> Result<Encryption>;

    async fn decrypt_local(
        &self,
        payload: &[u8],
        encryption_key: Option<EncryptionKey>,
        key: &Local,
    ) -> Result<Vec<u8>>;
    async fn decrypt_managed(
        &self,
        payload: &[u8],
        encryption_key: Option<EncryptionKey>,
        key: &Managed,
        access_control: Option<String>
    ) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum EncrypterError {
    #[error("Failed to encrypt: {0}")]
    FailedToEncrypt(String),
    #[error("Invalid key: {0}")]
    InvalidKey(String),
    #[error("Failed to encrypt in-place: {0}")]
    FailedToEncryptInPlace(String),
    #[error("Couldn't random fill nonce: {0}")]
    FailedToFillNonce(String),
    #[error("Couldn't generate random salt: {0}")]
    FailedToGenerateSalt(String),
    #[error("Length of decoded data is <= NONCE_LEN")]
    InvalidPayloadLength(),
    #[error("Invalid payload")]
    InvalidPayload(),
    #[error("Invalid Base64 data")]
    InvalidBase64(),
    #[error("Failed to decrypt: {0}")]
    FailedToDecrypt(String),
    #[error("Document is not encrypted")]
    NotEncrypted(),
    #[error("Document is encrypted. Metadata cannot be modified")]
    Encrypted(),
    #[error("Error generating RSA key pair: {0}")]
    ErrorGeneratingRsaKeyPair(String),
    #[error("Invalid algorithm")]
    InvalidAlgorithm(),
    #[error("Could not retrieve encryption algorithm")]
    CouldNotRetrieveAlgorithm(),
    #[error("Could not retrieve encryption key")]
    CouldNotRetrieveKey(),
}
