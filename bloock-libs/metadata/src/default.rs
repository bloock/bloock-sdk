use std::collections::HashMap;

use crate::{MetadataError, MetadataParser, Result};
use async_trait::async_trait;
use bloock_encrypter::{Decrypter, Encrypter};
use bloock_keys::entity::key::Key;
use bloock_signer::{entity::signature::Signature, format::jws::JwsFormatter, SignFormat};
use serde::{de::DeserializeOwned, Deserialize, Serialize};
use serde_json::Value;

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct DefaultParser {
    pub _data_: Vec<u8>,
    pub _metadata_: HashMap<String, Value>,
}

#[async_trait(?Send)]
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

    async fn sign(
        &mut self,
        key: &Key,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<Signature> {
        let payload = self.get_data()?;

        let signature = bloock_signer::sign(api_host, api_key, environment, &payload, key)
            .await
            .map_err(|e| MetadataError::SignError(e.to_string()))?;

        let mut signatures = match self.get_signatures() {
            Some(s) => s,
            None => Vec::new(),
        };
        signatures.push(signature.clone());

        self.del("signatures")?;
        self.set_signatures(signatures)?;

        let proof: Option<Value> = self.get_proof();
        if proof.is_some() {
            self.del("proof")?;
        }

        Ok(signature)
    }

    async fn verify(
        &self,
        api_host: String,
        api_key: String,
        environment: Option<String>,
    ) -> Result<bool> {
        let vec_sig = self.get_signatures();
        let payload = self.get_data()?;
        match vec_sig {
            Some(s) => {
                for signature in s.iter() {
                    bloock_signer::verify(
                        api_host.clone(),
                        api_key.clone(),
                        environment.clone(),
                        &payload,
                        signature,
                    )
                    .await
                    .map_err(|e| MetadataError::VerifyError(e.to_string()))?;
                }
                Ok(true)
            }
            None => Ok(true),
        }
    }

    async fn encrypt(&mut self, encrypter: Box<dyn Encrypter>) -> Result<()> {
        let payload = self.build()?;
        let alg = encrypter.get_alg().to_string();

        let ciphertext = encrypter
            .encrypt(&payload)
            .await
            .map_err(|e| MetadataError::EncryptError(e.to_string()))?;
        self._data_ = ciphertext;

        self.del("proof")?;
        self.del("signatures")?;

        self.set("is_encrypted", &true)?;
        self.set("encryption_alg", &alg)?;

        Ok(())
    }

    async fn decrypt(&mut self, decrypter: Box<dyn Decrypter>) -> Result<()> {
        let ciphertext = self.get_data()?;

        let decrypted_payload = decrypter
            .decrypt(&ciphertext)
            .await
            .map_err(|e| MetadataError::EncryptError(e.to_string()))?;

        let decrypted_parser = Self::load(&decrypted_payload)?;

        self._data_ = decrypted_parser._data_;
        self._metadata_ = decrypted_parser._metadata_;

        Ok(())
    }

    fn set_proof<T: Serialize>(&mut self, value: &T) -> Result<()> {
        self.set("proof", value)
    }

    fn is_encrypted(&self) -> bool {
        let is_encrypted: Option<bool> = self.get("is_encrypted");
        match is_encrypted {
            Some(s) => s,
            None => false,
        }
    }

    fn get_proof<T: DeserializeOwned>(&self) -> Option<T> {
        self.get("proof")
    }

    fn get_encryption_algorithm(&self) -> Option<String> {
        self.get("encryption_alg")
    }

    fn get_signatures(&self) -> Result<Vec<Signature>> {
        match self.get_signatures() {
            Some(s) => Ok(s),
            None => Err(MetadataError::DeserializeError),
        }
    }

    fn build(&self) -> Result<Vec<u8>> {
        match self._metadata_.is_empty() {
            true => Ok(self._data_.clone()),
            false => serde_json::to_vec(self).map_err(|_| MetadataError::SerializeError),
        }
    }
}

impl DefaultParser {
    fn get_data(&self) -> Result<Vec<u8>> {
        Ok(self._data_.clone())
    }

    fn del(&mut self, key: &str) -> Result<()> {
        self._metadata_.remove(key);
        Ok(())
    }

    fn set_signatures(&mut self, signatures: Vec<Signature>) -> Result<()> {
        let sig_serialized =
            JwsFormatter::serialize(signatures).map_err(|_| MetadataError::SerializeError)?;

        let v = serde_json::from_str(&sig_serialized).unwrap();
        self._metadata_.insert("signatures".to_owned(), v);

        Ok(())
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

    fn get<T: DeserializeOwned>(&self, key: &str) -> Option<T> {
        let value = match self._metadata_.get(key) {
            Some(v) => v,
            None => return None,
        };
        serde_json::from_value(value.clone()).ok()
    }
}

#[cfg(test)]
mod tests {
    use std::{collections::HashMap, vec};

    use bloock_encrypter::local::aes::{LocalAesDecrypter, LocalAesEncrypter};
    use bloock_keys::keys::local::LocalKey;
    use bloock_signer::{
        entity::{alg::SignAlg, signature::Signature},
        format::jws::{JwsSignature, JwsSignatureHeader},
    };

    use crate::MetadataParser;

    use super::DefaultParser;

    #[test]
    fn test_load_default_parser_with_metadata() {
        let parser = DefaultParser {
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
        let parser = DefaultParser {
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
        let expected_signatures = vec![JwsSignature { protected: "e30".to_string(), signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(), header: JwsSignatureHeader { alg: SignAlg::BjjM.to_string(), kid: "00000000-0000-0000-0000-000000000000".to_string(), }, message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string() }];

        parser.set_signatures(signatures.clone()).unwrap();
        assert_eq!(
            parser,
            DefaultParser {
                _data_: "some string".as_bytes().to_vec(),
                _metadata_: HashMap::from([(
                    "signatures".to_string(),
                    serde_json::to_value(expected_signatures).unwrap()
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

    #[tokio::test]
    async fn test_default_parser_encrypt_and_decrypt_metadata() {
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
        let expected_signatures = vec![JwsSignature { protected: "e30".to_string(), signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(), header: JwsSignatureHeader { alg: SignAlg::BjjM.to_string(), kid: "00000000-0000-0000-0000-000000000000".to_string(), }, message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string() }];

        parser.set_signatures(signatures.clone()).unwrap();
        assert_eq!(
            parser,
            DefaultParser {
                _data_: "some string".as_bytes().to_vec(),
                _metadata_: HashMap::from([(
                    "signatures".to_string(),
                    serde_json::to_value(expected_signatures.clone()).unwrap()
                )]),
            }
        );

        let local_aes_key = LocalKey {
            key_type: bloock_keys::KeyType::Aes128,
            key: "some_password".to_string(),
            private_key: None,
            mnemonic: None,
        };
        let encrypter = LocalAesEncrypter::new(local_aes_key.clone());

        parser.encrypt(encrypter).await.unwrap();
        assert_eq!(true, parser.is_encrypted());
        assert_eq!(
            Some("A256GCM".to_string()),
            parser.get_encryption_algorithm()
        );
        assert_eq!(None, parser.get_signatures());

        let decrypter = LocalAesDecrypter::new(local_aes_key.clone());

        parser.decrypt(decrypter).await.unwrap();

        assert_eq!(false, parser.is_encrypted());
        assert_eq!(None, parser.get_encryption_algorithm());
        assert_eq!(
            parser,
            DefaultParser {
                _data_: "some string".as_bytes().to_vec(),
                _metadata_: HashMap::from([(
                    "signatures".to_string(),
                    serde_json::to_value(expected_signatures).unwrap()
                )]),
            }
        );
    }

    #[tokio::test]
    async fn test_default_parser_sign_and_verify_metadata() {
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
        let expected_signatures = vec![JwsSignature { protected: "e30".to_string(), signature: "3045022100c42e705c0c73f28341eec61d8dfa5c5be006a44e6c48b59103861a7c0914a1df022010b09d5de1d376ac3940b223ffd158e46f6e60d8a2e86f7224f951a850146920".to_string(), header: JwsSignatureHeader { alg: SignAlg::BjjM.to_string(), kid: "00000000-0000-0000-0000-000000000000".to_string(), }, message_hash: "ecb8e554bba690eff53f1bc914941d34ae7ec446e0508d14bab3388d3e5c945".to_string() }];

        parser.set_signatures(signatures.clone()).unwrap();
        assert_eq!(
            parser,
            DefaultParser {
                _data_: "some string".as_bytes().to_vec(),
                _metadata_: HashMap::from([(
                    "signatures".to_string(),
                    serde_json::to_value(expected_signatures.clone()).unwrap()
                )]),
            }
        );

        let local_key = LocalKey {
            key_type: bloock_keys::KeyType::EcP256k,
            key: "".to_string(),
            private_key: Some(
                "8d4b1adbe150fb4e77d033236667c7e1a146b3118b20afc0ab43d0560efd6dbb".to_string(),
            ),
            mnemonic: None,
        };

        parser
            .sign(
                &bloock_keys::entity::key::Key::LocalKey(local_key),
                "".to_string(),
                "".to_string(),
                None,
            )
            .await
            .unwrap();
        assert_eq!(2, parser.get_signatures().unwrap().len());

        let verified = parser
            .verify("".to_string(), "".to_string(), None)
            .await
            .unwrap();
        assert_eq!(true, verified);
    }
}
