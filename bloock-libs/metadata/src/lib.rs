use bloock_signer::entity::signature::Signature;
use default::DefaultParser;
use pdf::PdfParser;
use serde::{de::DeserializeOwned, Serialize};
use thiserror::Error as ThisError;

pub mod default;
pub mod pdf;

pub type Result<T> = std::result::Result<T, MetadataError>;

#[derive(Debug, Clone)]
pub enum FileParser {
    Default(DefaultParser),
    Pdf(PdfParser),
}

impl MetadataParser for FileParser {
    fn load(payload: &[u8]) -> Result<Self> {
        let file_type = infer::get(payload);

        let parser = match file_type.map(|t| t.mime_type()) {
            Some("application/pdf") => FileParser::Pdf(PdfParser::load(payload)?),
            _ => FileParser::Default(DefaultParser::load(payload)?),
        };

        Ok(parser)
    }

    fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T> {
        match self {
            FileParser::Pdf(p) => p.get(key),
            FileParser::Default(p) => p.get(key),
        }
    }

    fn get_signatures(&self) -> Option<Vec<Signature>> {
        match self {
            FileParser::Pdf(p) => p.get_signatures(),
            FileParser::Default(p) => p.get_signatures(),
        }
    }

    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> Result<()> {
        match self {
            FileParser::Pdf(p) => p.set(key, value),
            FileParser::Default(p) => p.set(key, value),
        }
    }

    fn set_signatures(&mut self, signatures: Vec<Signature>) -> Result<()> {
        match self {
            FileParser::Pdf(p) => p.set_signatures(signatures),
            FileParser::Default(p) => p.set_signatures(signatures),
        }
    }

    fn del(&mut self, key: &str) -> Result<()> {
        match self {
            FileParser::Pdf(p) => p.del(key),
            FileParser::Default(p) => p.del(key),
        }
    }

    fn get_data(&self) -> Result<Vec<u8>> {
        match self {
            FileParser::Default(p) => p.get_data(),
            FileParser::Pdf(p) => p.get_data(),
        }
    }

    fn build(&mut self) -> Result<Vec<u8>> {
        match self {
            FileParser::Pdf(p) => p.build(),
            FileParser::Default(p) => p.build(),
        }
    }
}

pub trait MetadataParser
where
    Self: Sized,
{
    fn load(payload: &[u8]) -> Result<Self>;
    fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T>;
    fn get_signatures(&self) -> Option<Vec<Signature>>;
    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> Result<()>;
    fn set_signatures(&mut self, value: Vec<Signature>) -> Result<()>;
    fn del(&mut self, key: &str) -> Result<()>;
    fn get_data(&self) -> Result<Vec<u8>>;
    fn build(&mut self) -> Result<Vec<u8>>;
}

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum MetadataError {
    #[error("Error loading: {0}")]
    LoadError(String),
    #[error("Error loading metadata: {0}")]
    LoadMetadataError(String),
    #[error("Error serializing field")]
    SerializeError,
    #[error("Error deserializing field")]
    DeserializeError,
    #[error("Error writing: {0}")]
    WriteError(String),
    #[error("This feature is not available for this file type")]
    Unsupported(),
}
