use super::{DefaultDocumentArgs, Document, DocumentHelper, Metadata};
use crate::{BuilderError, Result};
use serde_json::{json, Value};

const DATA_KEY: &str = "_data_";
const METADATA_KEY: &str = "_metadata_";

pub struct JSONDocument {
    source: Value,
    data: Option<Value>,
    payload: Option<Value>,
    signatures: Option<Vec<Value>>,
    proof: Option<Value>,
}

impl DocumentHelper for JSONDocument {
    fn get_data(&mut self) -> Option<Vec<u8>> {
        match &self.data {
            Some(d) => serde_json::to_vec(d).ok(),
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
        self.data = serde_json::from_slice(&data).ok();
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

impl Document for JSONDocument {
    type DocumentArgs = DefaultDocumentArgs;

    fn setup(src: Vec<u8>) -> Result<Self> {
        let json: Value = serde_json::from_slice(src.as_slice())
            .map_err(|e| BuilderError::JsonLoadError(e.to_string()))?;
        Ok(JSONDocument {
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

#[cfg(test)]
mod tests {
    use serde_json::{json, Value};

    use super::JSONDocument;
    use super::{Document, DocumentHelper};

    const CONTENT: &str = "{\"hello\":\"world\"}";

    #[test]
    fn test_constructor() {
        let file = JSONDocument::new(CONTENT, None).unwrap();

        assert_eq!(
            String::from_utf8(file.get_payload().unwrap()).unwrap(),
            CONTENT.to_string(),
            "Invalid payload received"
        )
    }

    #[test]
    fn test_constructor_with_metadata() {
        let json_value: Value = serde_json::from_str(CONTENT).unwrap();
        let json = json!({
            "_data_": json_value,
            "_metadata_": {
                "signatures": [{
                    "signature": "signature1",
                    "header": {}
                }]
            }
        });
        let mut file = JSONDocument::new(serde_json::to_vec(&json).unwrap(), None).unwrap();

        assert_eq!(
            String::from_utf8(file.get_data().unwrap()).unwrap(),
            CONTENT.to_string(),
            "Invalid data received"
        )
    }

    #[test]
    fn test_two_same_files_generates_same_payload() {
        let mut file = JSONDocument::new(CONTENT, None).unwrap();
        let mut file2 = JSONDocument::new(file.build(), None).unwrap();

        assert_eq!(
            String::from_utf8(file.get_data().unwrap()).unwrap(),
            String::from_utf8(file2.get_data().unwrap()).unwrap(),
            "Invalid data received"
        );

        assert_eq!(
            String::from_utf8(file.get_payload().unwrap()).unwrap(),
            String::from_utf8(file2.get_payload().unwrap()).unwrap(),
            "Invalid payload received"
        );

        assert_eq!(
            file.get_proof(),
            file2.get_proof(),
            "Invalid proof received"
        );

        assert_eq!(
            file.get_signatures(),
            file2.get_signatures(),
            "Invalid signatures received"
        );
    }

    #[test]
    fn test_two_same_files_with_metadata_generates_same_payload() {
        let json_value: Value = serde_json::from_str(CONTENT).unwrap();
        let json = json!({
            "_data_": json_value,
            "_metadata_": {
                "signatures": [{
                    "signature": "signature1",
                    "header": {}
                }]
            }
        });

        let mut file = JSONDocument::new(serde_json::to_vec(&json).unwrap(), None).unwrap();
        let mut file2 = JSONDocument::new(file.build(), None).unwrap();

        assert_eq!(
            String::from_utf8(file.get_data().unwrap()).unwrap(),
            String::from_utf8(file2.get_data().unwrap()).unwrap(),
            "Invalid data received"
        );

        assert_eq!(
            String::from_utf8(file.get_payload().unwrap()).unwrap(),
            String::from_utf8(file2.get_payload().unwrap()).unwrap(),
            "Invalid payload received"
        );

        assert_eq!(
            file.get_proof(),
            file2.get_proof(),
            "Invalid proof received"
        );

        assert_eq!(
            file.get_signatures(),
            file2.get_signatures(),
            "Invalid signatures received"
        );
    }

    #[test]
    fn test_set_proof() {
        let proof = json!({
            "this": "is",
            "a": "proof"
        });

        let mut file = JSONDocument::new(CONTENT, None).unwrap();
        file.set_proof(proof.clone());

        assert_eq!(
            file.get_proof().unwrap().clone(),
            proof,
            "Invalid proof received"
        );

        let mut file2 = JSONDocument::new(file.build(), None).unwrap();

        assert_eq!(
            file2.get_proof().unwrap().clone(),
            proof,
            "Invalid proof received"
        );
    }

    #[test]
    fn test_set_signature() {
        let signature = json!({
            "signature": "signature1",
            "header": {}
        });

        let mut file = JSONDocument::new(CONTENT, None).unwrap();
        file.add_signature(signature.clone());

        assert_eq!(
            file.get_signatures().unwrap().clone(),
            vec![signature.clone()],
            "Invalid signatures received"
        );

        let mut file2 = JSONDocument::new(file.build(), None).unwrap();

        assert_eq!(
            file2.get_signatures().unwrap().clone(),
            vec![signature],
            "Invalid signatures received"
        );
    }

    #[test]
    fn test_set_signature_and_proof() {
        let mut file = JSONDocument::new(CONTENT, None).unwrap();

        let signature = json!({
            "signature": "signature1",
            "header": {}
        });
        file.add_signature(signature.clone());

        let proof = json!({
            "this": "is",
            "a": "proof"
        });
        file.set_proof(proof.clone());

        assert_eq!(
            file.get_signatures().unwrap().clone(),
            vec![signature.clone()],
            "Invalid signatures received"
        );
        assert_eq!(
            file.get_proof().unwrap().clone(),
            proof,
            "Invalid proof received"
        );

        let mut file2 = JSONDocument::new(file.build(), None).unwrap();

        assert_eq!(
            file2.get_signatures().unwrap().clone(),
            vec![signature],
            "Invalid signatures received"
        );
        assert_eq!(
            file2.get_proof().unwrap().clone(),
            proof,
            "Invalid proof received"
        );
    }
}
