use std::collections::HashMap;

use crate::{MetadataError, MetadataParser, Result};
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;

#[derive(Clone, Serialize, Deserialize)]
pub struct DefaultParser {
    _data_: Vec<u8>,
    _metadata_: HashMap<String, Value>,
}

impl MetadataParser for DefaultParser {
    fn load(payload: &[u8]) -> Result<Self> {
        let parser: DefaultParser = match serde_json::from_slice(payload) {
            Ok(p) => p,
            Err(_) => DefaultParser {
                _data_: payload.to_vec(),
                _metadata_: HashMap::new(),
            },
        };
        Ok(parser)
    }

    fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T> {
        let value = match self._metadata_.get(key) {
            Some(v) => v,
            None => return None,
        };
        serde_json::from_value(value.clone()).ok()
    }

    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> Result<()> {
        let v = serde_json::to_value(value).map_err(|_| MetadataError::SerializeError)?;
        self._metadata_.insert(key.to_owned(), v);
        Ok(())
    }

    fn del(&mut self, key: &str) -> Result<()> {
        self._metadata_.remove(key);
        Ok(())
    }

    fn build(&mut self) -> Result<Vec<u8>> {
        match self._metadata_.is_empty() {
            true => return Ok(self._data_.clone()),
            false => serde_json::to_vec(self).map_err(|_| MetadataError::SerializeError),
        }
    }
}
