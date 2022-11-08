use crate::{MetadataError, MetadataParser, Result};
use lopdf::{Dictionary, Document, Object};
use serde::{de::DeserializeOwned, Serialize};

#[derive(Debug, Clone)]
pub struct PdfParser {
    document: Document,
}

impl MetadataParser for PdfParser {
    fn load(payload: &[u8]) -> Result<Self> {
        let document =
            Document::load_mem(payload).map_err(|e| MetadataError::LoadError(e.to_string()))?;

        Ok(PdfParser { document })
    }

    fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T> {
        let dictionary = self.get_metadata_dict().ok()?;

        let object = Object::from(key);
        dictionary
            .get(object.as_name().ok()?)
            .ok()
            .and_then(|v| v.as_str().ok())
            .and_then(|v| serde_json::from_slice(v).ok())
    }

    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> Result<()> {
        let dictionary = self.get_metadata_dict_mut()?;

        let object = Object::from(key);
        let object_key = object
            .as_name()
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))?;

        let v = serde_json::to_string(value).map_err(|_| MetadataError::SerializeError)?;
        dictionary.set(object_key, Object::string_literal(v));

        Ok(())
    }

    fn del(&mut self, key: &str) -> Result<()> {
        let dictionary = self.get_metadata_dict_mut()?;

        let object = Object::from(key);
        let object_key = object
            .as_name()
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))?;
        dictionary.remove(object_key);

        Ok(())
    }

    fn get_data(&mut self) -> Result<Vec<u8>> {
        let mut doc = self.clone();
        doc.del("proof")?;
        doc.del("signatures")?;
        doc.build()
    }

    fn build(&mut self) -> Result<Vec<u8>> {
        let mut out: Vec<u8> = Vec::new();
        self.document
            .save_to(&mut out)
            .map_err(|e| MetadataError::WriteError(e.to_string()))?;
        Ok(out)
    }
}

impl PdfParser {
    fn get_metadata_dict(&self) -> Result<&Dictionary> {
        self.document
            .trailer
            .get(b"Info")
            .and_then(Object::as_reference)
            .and_then(|id| self.document.get_object(id))
            .and_then(Object::as_dict)
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))
    }

    fn get_metadata_dict_mut(&mut self) -> Result<&mut Dictionary> {
        self.document
            .trailer
            .get(b"Info")
            .and_then(Object::as_reference)
            .and_then(|id| self.document.get_object_mut(id))
            .and_then(Object::as_dict_mut)
            .map_err(|e| MetadataError::LoadMetadataError(e.to_string()))
    }
}
