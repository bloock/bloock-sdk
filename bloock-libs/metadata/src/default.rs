use std::collections::HashMap;

use crate::{MetadataError, MetadataParser, Result};
use bloock_signer::{entity::signature::Signature, format::jws::JwsFormatter, SignFormat};
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

    fn get_signatures(&self) -> Option<Vec<Signature>> {
        let value = match self._metadata_.get("signatures") {
            Some(v) => v,
            None => return None,
        };
        let sig_string: Option<String> = serde_json::to_string(&value).ok();
        match sig_string {
            Some(sig) => JwsFormatter::deserialize(sig).ok(),
            None => None,
        }
    }

    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> Result<()> {
        let v = serde_json::to_value(value).map_err(|_| MetadataError::SerializeError)?;
        self._metadata_.insert(key.to_owned(), v);
        Ok(())
    }

    fn set_signatures(&mut self, signatures: Vec<Signature>) -> Result<()> {
        let sig_serialized =
            JwsFormatter::serialize(signatures).map_err(|_| MetadataError::SerializeError)?;

        let v = serde_json::from_str(&sig_serialized).unwrap();
        self._metadata_.insert("signatures".to_owned(), v);

        Ok(())
    }

    fn del(&mut self, key: &str) -> Result<()> {
        self._metadata_.remove(key);
        Ok(())
    }

    fn get_data(&self) -> Result<Vec<u8>> {
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
    use std::{collections::HashMap, vec};

    use bloock_signer::{
        entity::{alg::SignAlg, signature::Signature},
        format::jws::{JwsSignature, JwsSignatureHeader},
    };

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
                _data_: data,
                _metadata_: HashMap::new(),
            }
        );
    }

    #[test]
    fn test_default_parser_get_set_del_signatures_metadata() {
        let data = "some string".as_bytes().to_vec();
        let mut parser = DefaultParser {
            _data_: data.clone(),
            _metadata_: HashMap::new(),
        };

        let signatures = vec![Signature {
            alg: SignAlg::BjjM,
            kid: "00000000-0000-0000-0000-000000000000".to_string(),
            signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(),
            message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string(),
        }];

        let jws_signatures = vec![JwsSignature { protected: "e30".to_string(), signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(), header: JwsSignatureHeader { alg: SignAlg::BjjM.to_string(), kid: "00000000-0000-0000-0000-000000000000".to_string(), }, message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string() }];

        parser.set_signatures(signatures.clone()).unwrap();
        assert_eq!(
            parser,
            DefaultParser {
                _data_: "some string".as_bytes().to_vec(),
                _metadata_: HashMap::from([(
                    "signatures".to_string(),
                    serde_json::to_value(jws_signatures).unwrap()
                )]),
            }
        );

        let get_res = parser.get_signatures().unwrap();
        assert_eq!(get_res, signatures);

        parser.del("signatures").unwrap();

        assert_eq!(
            parser,
            DefaultParser {
                _data_: data,
                _metadata_: HashMap::new(),
            }
        );
    }
}
