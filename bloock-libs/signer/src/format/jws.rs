use crate::entity::alg::SignAlg;
use crate::entity::signature::Signature;
use crate::Result;
use crate::SignFormat;
use crate::SignerError;
use serde::{Deserialize, Serialize};
use std::str::from_utf8;

#[derive(Default, Debug, Clone)]
pub struct JwsFormatter;

impl SignFormat for JwsFormatter {
    fn prepare_payload(&self, payload: &[u8]) -> Vec<u8> {
        [base64_url::encode("{}"), base64_url::encode(payload)]
            .join(".")
            .as_bytes()
            .to_owned()
    }

    fn serialize(&self, signatures: Vec<Signature>) -> String {
        let signatures: Vec<JwsSignature> = signatures.iter().map(|s| JwsSignature {
            protected: s.protected,
            signature: s.signature,
            header: JwsSignatureHeader {
                alg: s.alg.to_string(),
                kid: hex::encode(s.key.serialize()),
            },
            message_hash: s.message_hash,
        });

        serde_json::to_string(&signatures)
    }

    fn deserialize(&self, signatures: String) -> Vec<Signature> {
        let signatures: Vec<JwsSignature> = serde_json::from_str(&signatures);
        let signatures: Vec<Signature> = signatures.iter().map(|s| Signature {
            alg: todo!(),
            key: todo!(),
            signature: s.signature,
            message_hash: s.message_hash,
        });
        signatures
    }
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
struct JwsSignature {
    protected: String,
    signature: String,
    header: JwsSignatureHeader,
    message_hash: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
struct JwsSignatureHeader {
    pub alg: String,
    pub kid: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
struct ProtectedHeader {
    pub common_name: Option<String>,
}

impl ProtectedHeader {
    pub fn serialize(&self) -> Result<String> {
        Ok(base64_url::encode(&serde_json::to_string(self).map_err(
            |err| SignerError::GeneralSerializeError(err.to_string()),
        )?))
    }

    pub fn deserialize(protected: &str) -> Result<Self> {
        serde_json::from_str(
            from_utf8(
                &base64_url::decode(&protected)
                    .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))?,
            )
            .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))?,
        )
        .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))
    }
}
