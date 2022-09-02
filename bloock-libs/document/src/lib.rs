use serde::Serialize;
use serde_json::Value;
use thiserror::Error as ThisError;

pub mod json;
// pub mod pdf;

#[derive(Serialize)]
pub struct Metadata {
    pub signatures: Option<Vec<Value>>,
    pub proof: Option<Value>,
}

pub trait DocumentHelper {
    fn get_data(&mut self) -> Option<Vec<u8>>;

    fn get_proof(&mut self) -> Option<&mut Value>;

    fn get_signatures(&mut self) -> Option<&mut Vec<Value>>;

    fn get_payload(&self) -> Option<Vec<u8>>;

    fn set_data(&mut self, data: Vec<u8>) -> &Self;

    fn set_proof(&mut self, proof: Value) -> &Self;

    fn set_signatures(&mut self, signatures: Vec<Value>) -> &Self;

    fn set_payload(&mut self, payload: Vec<u8>) -> &Self;
}

pub struct DefaultDocumentArgs {}

pub trait Document
where
    Self: DocumentHelper + Sized + Send,
    <Self as Document>::DocumentArgs: Send,
{
    const PROOF_KEY: &'static str = "proof";
    const SIGNATURES_KEY: &'static str = "signatures";

    type DocumentArgs;

    fn new<S: Into<Vec<u8>> + Send>(
        src: S,
        _args: Option<Self::DocumentArgs>,
    ) -> Result<Self, DocumentError> {
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

    fn setup(src: Vec<u8>) -> Result<Self, DocumentError>;

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

#[derive(ThisError, Debug, PartialEq, Eq, Clone, Serialize)]
pub enum DocumentError {
    #[error("Document Error: {0}")]
    DocumentError(String),
    #[error("JSON Error: {0}")]
    JsonError(String),
    #[error("PDF Load error: {0}")]
    PDFLoadError(String),
}
