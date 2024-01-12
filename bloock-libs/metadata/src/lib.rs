use async_trait::async_trait;
use bloock_encrypter::entity::{
    alg::EncryptionAlg, encryption::Encryption, encryption_key::EncryptionKey,
};
use bloock_hasher::HashAlg;
use bloock_keys::entity::key::Key;
use bloock_signer::entity::signature::Signature;
use default::DefaultParser;
use pdf::PdfParser;
use serde::{de::DeserializeOwned, Serialize};
use thiserror::Error as ThisError;

pub mod cms;
pub mod default;
pub mod dictionary;
pub mod pdf;

pub type Result<T> = std::result::Result<T, MetadataError>;

#[derive(Debug, Clone)]
pub enum FileParser {
    Default(DefaultParser),
    Pdf(PdfParser),
}

impl FileParser {
    pub fn load(payload: &[u8]) -> Result<Self> {
        let file_type = infer::get(payload);

        let parser = match file_type.map(|t| t.mime_type()) {
            Some("application/pdf") => FileParser::Pdf(PdfParser::load(payload)?),
            _ => FileParser::Default(DefaultParser::load(payload)?),
        };

        Ok(parser)
    }

    pub fn get_type(&self) -> Option<String> {
        let file_type = infer::get(&self.get_payload().ok()?)?;
        Some(file_type.mime_type().to_string())
    }
}

#[async_trait(?Send)]
impl MetadataParser for FileParser {
    async fn sign(
        &mut self,
        key: &Key,
        hash_alg: Option<HashAlg>,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Signature> {
        match self {
            FileParser::Pdf(p) => p.sign(key, hash_alg, api_host, api_key, environment).await,
            FileParser::Default(p) => p.sign(key, hash_alg, api_host, api_key, environment).await,
        }
    }

    async fn verify(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<bool> {
        match self {
            FileParser::Pdf(p) => p.verify(api_host, api_key, environment).await,
            FileParser::Default(p) => p.verify(api_host, api_key, environment).await,
        }
    }

    async fn encrypt(
        &mut self,
        key: &Key,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Encryption> {
        match self {
            FileParser::Pdf(p) => {
                //p.encrypt(encrypter).await,
                let payload = p.build()?;
                *self = FileParser::Default(DefaultParser::load(&payload)?);
                self.encrypt(key, api_host, api_key, environment).await
            }
            FileParser::Default(p) => p.encrypt(key, api_host, api_key, environment).await,
        }
    }

    async fn decrypt(
        &mut self,
        key: &Key,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<()> {
        match self {
            FileParser::Pdf(p) => p.decrypt(key, api_host, api_key, environment).await,
            FileParser::Default(p) => {
                p.decrypt(key, api_host, api_key, environment).await?;
                let payload = &p.build()?;
                *self = FileParser::load(payload)?;
                Ok(())
            }
        }
    }

    fn set_proof<T: Serialize>(&mut self, value: &T) -> Result<()> {
        match self {
            FileParser::Pdf(p) => p.set_proof(value),
            FileParser::Default(p) => p.set_proof(value),
        }
    }

    fn get_proof<T: DeserializeOwned>(&self) -> Option<T> {
        match self {
            FileParser::Pdf(p) => p.get_proof(),
            FileParser::Default(p) => p.get_proof(),
        }
    }

    fn is_encrypted(&self) -> bool {
        match self {
            FileParser::Pdf(p) => p.is_encrypted(),
            FileParser::Default(p) => p.is_encrypted(),
        }
    }

    fn get_payload(&self) -> Result<Vec<u8>> {
        match self {
            FileParser::Default(p) => p.get_payload(),
            FileParser::Pdf(p) => p.get_payload(),
        }
    }

    fn get_signatures(&self) -> Result<Vec<Signature>> {
        match self {
            FileParser::Default(p) => p.get_signatures(),
            FileParser::Pdf(p) => p.get_signatures(),
        }
    }

    fn get_encryption_alg(&self) -> Option<EncryptionAlg> {
        match self {
            FileParser::Default(p) => p.get_encryption_alg(),
            FileParser::Pdf(p) => p.get_encryption_alg(),
        }
    }

    fn get_encryption_key(&self) -> Option<EncryptionKey> {
        match self {
            FileParser::Default(p) => p.get_encryption_key(),
            FileParser::Pdf(p) => p.get_encryption_key(),
        }
    }

    fn build(&self) -> Result<Vec<u8>> {
        match self {
            FileParser::Pdf(p) => p.build(),
            FileParser::Default(p) => p.build(),
        }
    }
}

#[async_trait(?Send)]
pub trait MetadataParser
where
    Self: Sized,
{
    async fn sign(
        &mut self,
        key: &Key,
        hash_alg: Option<HashAlg>,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Signature>;
    async fn verify(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<bool>;
    async fn encrypt(
        &mut self,
        key: &Key,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Encryption>;
    async fn decrypt(
        &mut self,
        key: &Key,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<()>;
    fn set_proof<T: Serialize>(&mut self, value: &T) -> Result<()>;
    fn is_encrypted(&self) -> bool;
    fn get_payload(&self) -> Result<Vec<u8>>;
    fn get_proof<T: DeserializeOwned>(&self) -> Option<T>;
    fn get_signatures(&self) -> Result<Vec<Signature>>;
    fn get_encryption_alg(&self) -> Option<EncryptionAlg>;
    fn get_encryption_key(&self) -> Option<EncryptionKey>;
    fn build(&self) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum MetadataError {
    #[error("Error loading: {0}")]
    LoadError(String),
    #[error("Error signing: {0}")]
    SignError(String),
    #[error("Error verifying: {0}")]
    VerifyError(String),
    #[error("Error encrypting: {0}")]
    EncryptError(String),
    #[error("Error loading metadata: {0}")]
    LoadMetadataError(String),
    #[error("Error getting payload to sign: {0}")]
    GetPayloadToSignError(String),
    #[error("Error getting signed data: {0}")]
    GetSignedDataError(String),
    #[error("Error serializing field")]
    SerializeError,
    #[error("Error deserializing field")]
    DeserializeError,
    #[error("Error writing: {0}")]
    WriteError(String),
    #[error("This feature is not available for this file type")]
    Unsupported(),
    #[error("Multisignature feature is not available")]
    UnsupportedMultiSignature(),
}
