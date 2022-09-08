pub mod types;

use std::fmt::{Debug, Display};

use crate::{encrypter::Encryption, signer::Signature};
use crate::{BuilderError, Result};
use serde::de::DeserializeOwned;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize, PartialEq, Eq, Debug, Clone)]
pub struct Headers {
    pub ty: String,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct Document {
    pub headers: Headers,
    pub payload: Vec<u8>,
    pub signatures: Option<Vec<Signature>>,
    pub encryption: Option<Encryption>,
    pub proof: Option<String>,
}

impl Document {
    pub fn new(
        headers: Headers,
        payload: Vec<u8>,
        signatures: Option<Vec<Signature>>,
        encryption: Option<Encryption>,
        proof: Option<String>,
    ) -> Self {
        Self {
            headers,
            payload,
            signatures,
            encryption,
            proof,
        }
    }

    pub fn get_payload(&self) -> &[u8] {
        &self.payload
    }

    pub fn add_signature(&mut self, signature: Signature) -> &mut Self {
        match self.signatures.as_mut() {
            Some(signatures) => signatures.push(signature),
            None => self.signatures = Some(vec![signature]),
        };

        self
    }

    pub fn set_encryption(&mut self, encryption: Encryption) -> &mut Self {
        self.encryption = Some(encryption);
        self
    }

    pub fn set_proof(&mut self, proof: String) -> &mut Self {
        self.proof = Some(proof);
        self
    }

    pub fn serialize(&self) -> Result<String> {
        let headers = serde_json::to_vec(&self.headers)
            .map_err(|e| BuilderError::SerializeError(e.to_string()))?;

        let signatures = self
            .signatures
            .as_ref()
            .map(|s| serde_json::to_vec(s).map_err(|e| BuilderError::SerializeError(e.to_string())))
            .unwrap_or(Ok(Vec::new()))?;

        let encryption = self
            .encryption
            .as_ref()
            .map(|e| serde_json::to_vec(e).map_err(|e| BuilderError::SerializeError(e.to_string())))
            .unwrap_or(Ok(Vec::new()))?;

        let proof = self.proof.clone().unwrap_or_else(|| "".to_string());

        Ok(format!(
            "{}.{}.{}.{}.{}",
            base64_url::encode(&headers),
            base64_url::encode(&self.payload),
            base64_url::encode(&signatures),
            base64_url::encode(&encryption),
            base64_url::encode(&proof)
        ))
    }

    pub fn deserialize(bytes: Vec<u8>) -> Result<Self> {
        let encoded =
            String::from_utf8(bytes).map_err(|e| BuilderError::DocumentError(e.to_string()))?;

        let splitted: Vec<&str> = encoded.split('.').into_iter().collect();

        fn deserialize_field<T: DeserializeOwned>(field: &str) -> Option<T> {
            let decoded = base64_url::decode(field).ok()?;
            serde_json::from_slice(&decoded).ok()
        }

        let headers: Headers = deserialize_field(splitted[0])
            .ok_or_else(|| BuilderError::DecodeError("couldn't find headers".to_string()))?;
        let payload: Vec<u8> = base64_url::decode(splitted[1])
            .map_err(|_| BuilderError::DecodeError("couldn't find payload".to_string()))?;
        let signatures: Option<Vec<Signature>> = deserialize_field(splitted[2]);
        let encryption: Option<Encryption> = deserialize_field(splitted[3]);
        let proof: Option<String> = deserialize_field(splitted[4]);

        Ok(Self {
            headers,
            payload,
            signatures,
            encryption,
            proof,
        })
    }
}

impl Display for Document {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        let encoded = self
            .serialize()
            .unwrap_or_else(|_| "invalid_document".to_string());
        let splitted: Vec<&str> = encoded.split('.').into_iter().collect();

        fn decode_field(field: &str) -> Option<serde_json::Value> {
            let decoded = base64_url::decode(field).ok()?;
            serde_json::from_slice(&decoded).ok()
        }

        let headers = decode_field(splitted[0]);
        let payload = decode_field(splitted[1]);
        let signatures = decode_field(splitted[2]);
        let encryption = decode_field(splitted[3]);
        let proof = decode_field(splitted[4]);

        let output = json!({
            "headers": headers,
            "payload": payload,
            "signatures": signatures,
            "encryption": encryption,
            "proof": proof
        });

        f.write_str(
            &serde_json::to_string(&output).unwrap_or_else(|_| "invalid_document".to_string()),
        )
    }
}

#[cfg(test)]
mod tests {

    use std::vec;

    use serde_json::json;

    use crate::{encrypter::EncryptionHeader, signer::SignatureHeader};

    use super::{types::PayloadType, *};

    #[test]
    fn test_with_payload() {
        let headers = PayloadType::String.to_header();
        let payload = "Some string".as_bytes().to_vec();
        let document = Document::new(headers, payload.clone(), None, None, None);

        let expected_headers = base64_url::encode(
            &serde_json::to_vec(&json!({
                "ty": "string"
            }))
            .unwrap(),
        );
        let expected_payload = base64_url::encode(&payload);
        let expected_output = format!("{}.{}...", expected_headers, expected_payload);

        assert_eq!(
            expected_output,
            document.serialize().unwrap(),
            "Unexpected output received"
        );
    }

    #[test]
    fn test_with_payload_and_signature() {
        let headers = PayloadType::String.to_header();
        let payload = "Some string".as_bytes().to_vec();
        let signature = Signature {
            protected: "e0".to_string(),
            header: SignatureHeader {
                alg: "ECSDA".to_string(),
                kid: "1234567890abcdef".to_string(),
            },
            signature: "1234567890abcdef1234567890abcdef".to_string(),
        };
        let document = Document::new(headers, payload.clone(), Some(vec![signature]), None, None);

        let expected_headers = base64_url::encode(
            &serde_json::to_vec(&json!({
                "ty": "string"
            }))
            .unwrap(),
        );
        let expected_payload = base64_url::encode(&payload);
        let expected_signature = base64_url::encode(
            &serde_json::to_vec(&json!([{
                "header": {
                    "alg": "ECSDA",
                    "kid": "1234567890abcdef",
                },
                "protected": "e0",
                "signature": "1234567890abcdef1234567890abcdef",
            }]))
            .unwrap(),
        );
        let expected_output = format!(
            "{}.{}.{}..",
            expected_headers, expected_payload, expected_signature
        );

        assert_eq!(
            expected_output,
            document.serialize().unwrap(),
            "Unexpected output received"
        );
    }

    #[test]
    fn test_with_payload_and_signature_and_encryption() {
        let headers = PayloadType::String.to_header();
        let payload = "Some string".as_bytes().to_vec();
        let signature = Signature {
            protected: "e0".to_string(),
            header: SignatureHeader {
                alg: "ECSDA".to_string(),
                kid: "1234567890abcdef".to_string(),
            },
            signature: "1234567890abcdef1234567890abcdef".to_string(),
        };
        let encryption = Encryption {
            protected: "e0".to_string(),
            header: EncryptionHeader {
                alg: "ECSDA".to_string(),
            },
        };
        let document = Document::new(
            headers,
            payload.clone(),
            Some(vec![signature]),
            Some(encryption),
            None,
        );

        let expected_headers = base64_url::encode(
            &serde_json::to_vec(&json!({
                "ty": "string"
            }))
            .unwrap(),
        );
        let expected_payload = base64_url::encode(&payload);
        let expected_signature = base64_url::encode(
            &serde_json::to_vec(&json!([{
                "header": {
                    "alg": "ECSDA",
                    "kid": "1234567890abcdef",
                },
                "protected": "e0",
                "signature": "1234567890abcdef1234567890abcdef",
            }]))
            .unwrap(),
        );
        let expected_encryption = base64_url::encode(
            &serde_json::to_vec(&json!({
                "header": {
                    "alg": "ECSDA"
                },
                "protected": "e0"
            }))
            .unwrap(),
        );
        let expected_output = format!(
            "{}.{}.{}.{}.",
            expected_headers, expected_payload, expected_signature, expected_encryption
        );

        assert_eq!(
            expected_output,
            document.serialize().unwrap(),
            "Unexpected output received"
        );
    }

    #[test]
    fn test_with_payload_and_signature_and_encryption_and_proof() {
        let headers = PayloadType::String.to_header();
        let payload = "Some string".as_bytes().to_vec();
        let signature = Signature {
            protected: "e0".to_string(),
            header: SignatureHeader {
                alg: "ECSDA".to_string(),
                kid: "1234567890abcdef".to_string(),
            },
            signature: "1234567890abcdef1234567890abcdef".to_string(),
        };
        let encryption = Encryption {
            protected: "e0".to_string(),
            header: EncryptionHeader {
                alg: "ECSDA".to_string(),
            },
        };
        let proof = "this is a proof".to_string();
        let document = Document::new(
            headers,
            payload.clone(),
            Some(vec![signature]),
            Some(encryption),
            Some(proof.clone()),
        );

        let expected_headers = base64_url::encode(
            &serde_json::to_vec(&json!({
                "ty": "string"
            }))
            .unwrap(),
        );
        let expected_payload = base64_url::encode(&payload);
        let expected_signature = base64_url::encode(
            &serde_json::to_vec(&json!([{
                "header": {
                    "alg": "ECSDA",
                    "kid": "1234567890abcdef",
                },
                "protected": "e0",
                "signature": "1234567890abcdef1234567890abcdef",
            }]))
            .unwrap(),
        );
        let expected_encryption = base64_url::encode(
            &serde_json::to_vec(&json!({
                "header": {
                    "alg": "ECSDA"
                },
                "protected": "e0"
            }))
            .unwrap(),
        );
        let expected_proof = base64_url::encode(&proof);
        let expected_output = format!(
            "{}.{}.{}.{}.{}",
            expected_headers,
            expected_payload,
            expected_signature,
            expected_encryption,
            expected_proof
        );

        assert_eq!(
            expected_output,
            document.serialize().unwrap(),
            "Unexpected output received"
        );
    }
}
