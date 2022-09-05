use serde::{de::DeserializeOwned, Serialize};
use serde_json::{json, Value};

use super::{DefaultDocumentArgs, Document, DocumentHelper, DocumentType, Metadata};
use crate::{BuilderError, Result};

const DATA_KEY: &str = "_data_";
const METADATA_KEY: &str = "_metadata_";

pub struct BaseDocument<T: DocumentType + Serialize + DeserializeOwned> {
    source: Value,
    data: Option<T>,
    payload: Option<Value>,
    signatures: Option<Vec<Value>>,
    proof: Option<Value>,
}

impl<T: DocumentType + Serialize + DeserializeOwned> DocumentHelper for BaseDocument<T> {
    fn get_data(&mut self) -> Option<Vec<u8>> {
        match &self.data {
            Some(d) => d.to_vec().ok(),
            None => None,
        }
    }

    fn get_proof(&mut self) -> Option<&mut Value> {
        self.proof.as_mut()
    }

    fn get_signatures(&mut self) -> Option<&mut Vec<Value>> {
        self.signatures.as_mut()
    }

    fn get_payload(&self) -> Option<Vec<u8>> {
        match &self.payload {
            Some(p) => serde_json::to_vec(p).ok(),
            None => None,
        }
    }

    fn set_data(&mut self, data: Vec<u8>) -> &Self {
        self.data = T::from_vec(data).ok();
        self
    }

    fn set_proof(&mut self, proof: Value) -> &Self {
        self.proof = Some(proof);
        self
    }

    fn set_signatures(&mut self, signatures: Vec<Value>) -> &Self {
        self.signatures = Some(signatures);
        self
    }

    fn set_payload(&mut self, payload: Vec<u8>) -> &Self {
        self.payload = serde_json::from_slice(&payload).ok();
        self
    }
}

impl<T: DocumentType + Serialize + DeserializeOwned + Send> Document for BaseDocument<T> {
    type DocumentArgs = DefaultDocumentArgs;

    fn setup(src: Vec<u8>) -> Result<Self> {
        let json: Value = serde_json::from_slice(src.as_slice())
            .map_err(|e| BuilderError::BaseLoadError(e.to_string()))?;
        Ok(BaseDocument {
            source: json,
            data: None,
            payload: None,
            signatures: None,
            proof: None,
        })
    }

    fn fetch_metadata<S: ToString>(&self, key: S) -> Option<Value> {
        let metadata = self.source.get(METADATA_KEY)?;

        if let Some(v) = metadata.get(key.to_string()) {
            return Some(v.clone());
        }

        None
    }

    fn fetch_data(&self) -> Option<Vec<u8>> {
        if let Some(d) = self.source.get(DATA_KEY) {
            serde_json::to_vec(d).ok()
        } else {
            serde_json::to_vec(&self.source).ok()
        }
    }

    fn build_file(&mut self, metadata: Metadata) -> Vec<u8> {
        match metadata.proof.is_some() || metadata.signatures.is_some() {
            true => {
                let output = json!({
                    DATA_KEY: self.data,
                    METADATA_KEY: metadata
                });
                serde_json::to_vec(&output)
            }
            false => serde_json::to_vec(&self.data),
        }
        .unwrap_or_default()
    }
}
