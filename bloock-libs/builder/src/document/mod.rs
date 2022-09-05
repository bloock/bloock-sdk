use crate::{BuilderError, Result};
use serde::Serialize;
use serde_json::Value;
pub mod base;
pub mod json;
#[macro_use]
pub mod macros;

#[derive(Serialize)]
pub struct Metadata {
    pub signatures: Option<Vec<Value>>,
    pub proof: Option<Value>,
}

pub trait DocumentHelper {
    fn get_data(&mut self) -> Option<Vec<u8>>;
    fn set_data(&mut self, data: Vec<u8>) -> &Self;

    fn get_payload(&self) -> Option<Vec<u8>>;
    fn set_payload(&mut self, payload: Vec<u8>) -> &Self;

    fn get_proof(&mut self) -> Option<&mut Value>;
    fn set_proof(&mut self, proof: Value) -> &Self;

    fn get_signatures(&mut self) -> Option<&mut Vec<Value>>;
    fn set_signatures(&mut self, signatures: Vec<Value>) -> &Self;
}

pub struct DefaultDocumentArgs {}

pub trait Document
where
    Self: DocumentHelper + Sized + Send,
    <Self as Document>::DocumentArgs: Send,
{
    const PROOF_KEY: &'static str = "proof";
    const SIGNATURES_KEY: &'static str = "signatures";
    const ENCRYPTION_KEY: &'static str = "encryption";

    type DocumentArgs;

    fn new<S: Into<Vec<u8>> + Send>(src: S, _args: Option<Self::DocumentArgs>) -> Result<Self> {
        let mut doc = Self::setup(src.into())?;

        if let Some(proof) = doc.fetch_proof() {
            doc.set_proof(proof);
        }
        if let Some(signatures) = doc.fetch_signatures() {
            doc.set_signatures(signatures);
        }
        if let Some(data) = doc.fetch_data() {
            doc.set_data(data);
        }
        if let Some(payload) = doc.fetch_payload() {
            doc.set_payload(payload);
        }

        Ok(doc)
    }

    fn setup(src: Vec<u8>) -> Result<Self>;

    fn fetch_metadata<S: ToString>(&self, key: S) -> Option<Value>;

    fn fetch_data(&self) -> Option<Vec<u8>>;

    fn fetch_proof(&self) -> Option<Value> {
        let proof = self.fetch_metadata(Self::PROOF_KEY)?;
        if proof.is_object() {
            return Some(proof);
        }

        None
    }

    fn fetch_signatures(&self) -> Option<Vec<Value>> {
        let signatures = self.fetch_metadata(Self::SIGNATURES_KEY)?;
        if signatures.is_array() {
            return Some(signatures.as_array()?.clone());
        }

        None
    }

    fn fetch_payload(&mut self) -> Option<Vec<u8>> {
        let mut metadata = Metadata {
            proof: None,
            signatures: None,
        };

        if let Some(s) = self.get_signatures() {
            metadata.signatures = Some(s.clone());
        }

        Some(self.build_file(metadata))
    }

    fn add_signature(&mut self, signature: Value) -> &Self {
        let mut doc_signatures = match self.get_signatures() {
            Some(s) => s.clone(),
            None => vec![],
        };

        doc_signatures.push(signature);

        self.set_signatures(doc_signatures.clone());

        if let Some(payload) = self.fetch_payload() {
            self.set_payload(payload);
        }

        self
    }

    fn build(&mut self) -> Vec<u8> {
        let mut metadata = Metadata {
            proof: None,
            signatures: None,
        };

        if let Some(p) = self.get_proof() {
            metadata.proof = Some(p.clone());
        }

        if let Some(s) = self.get_signatures() {
            metadata.signatures = Some(s.clone());
        }

        self.build_file(metadata)
    }

    fn build_file(&mut self, metadata: Metadata) -> Vec<u8>;
}

pub trait DocumentType
where
    Self: Sized,
{
    fn from_vec(v: Vec<u8>) -> Result<Self>;
    fn to_vec(&self) -> Result<Vec<u8>>;
}

impl DocumentType for String {
    fn from_vec(v: Vec<u8>) -> Result<Self> {
        String::from_utf8(v).map_err(|e| BuilderError::BaseLoadError(e.to_string()))
    }

    fn to_vec(&self) -> Result<Vec<u8>> {
        Ok(self.as_bytes().to_vec())
    }
}

impl_document_type_trait! { Vec<u8> }
