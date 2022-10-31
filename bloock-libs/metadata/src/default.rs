use std::collections::HashMap;

use crate::{MetadataError, MetadataParser, Result};
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct DefaultParser {
    pub _data_: Vec<u8>,
    pub _metadata_: HashMap<String, Value>,
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

    fn get_data(&mut self) -> Result<Vec<u8>> {
        Ok(self._data_.clone())
    }

    fn build(&mut self) -> Result<Vec<u8>> {
        match self._metadata_.is_empty() {
            true => Ok(self._data_.clone()),
            false => serde_json::to_vec(self).map_err(|_| MetadataError::SerializeError),
        }
    }
}

#[cfg(test)]
mod tests {
    use std::collections::HashMap;

    use crate::MetadataParser;

    use super::DefaultParser;

    #[test]
    fn test_load_default_parser_with_metadata() {
        let mut parser = DefaultParser {
            _data_: "some string".as_bytes().to_vec(),
            _metadata_: HashMap::from([
                ("0".to_string(), serde_json::to_value(0).unwrap()),
                ("1".to_string(), serde_json::to_value(1).unwrap()),
                ("2".to_string(), serde_json::to_value(2).unwrap()),
            ]),
        };

        let built_parser = parser.build().unwrap();

        let result = DefaultParser::load(&built_parser).unwrap();

        assert_eq!(parser, result);
    }

    #[test]
    fn test_load_default_parser_without_metadata() {
        let mut parser = DefaultParser {
            _data_: "some string".as_bytes().to_vec(),
            _metadata_: HashMap::new(),
        };

        let built_parser = parser.build().unwrap();

        let result = DefaultParser::load(&built_parser).unwrap();

        assert_eq!(parser, result);
    }

    #[test]
    fn test_default_parser_get_set_del_metadata() {
        let data = "some string".as_bytes().to_vec();
        let mut parser = DefaultParser {
            _data_: data.clone(),
            _metadata_: HashMap::new(),
        };

        parser.set("1", &serde_json::to_value(1).unwrap()).unwrap();
        assert_eq!(
            parser,
            DefaultParser {
                _data_: "some string".as_bytes().to_vec(),
                _metadata_: HashMap::from([("1".to_string(), serde_json::to_value(1).unwrap())]),
            }
        );

        let get_res: i32 = parser.get("1").unwrap();
        assert_eq!(get_res, 1);

        parser.del("1").unwrap();

        assert_eq!(
            parser,
            DefaultParser {
                _data_: data.clone(),
                _metadata_: HashMap::new(),
            }
        );
    }
}
