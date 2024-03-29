use crate::entity::alg::SignAlg;
use crate::entity::signature::Signature;
use crate::Result;
use crate::SignFormat;
use crate::SignerError;
use bloock_hasher::HashAlg;
use serde::{Deserialize, Serialize};

#[derive(Default, Debug, Clone)]
pub struct JwsFormatter;

impl SignFormat for JwsFormatter {
    fn prepare_payload(payload: &[u8]) -> Vec<u8> {
        [base64_url::encode("{}"), base64_url::encode(payload)]
            .join(".")
            .as_bytes()
            .to_owned()
    }

    fn serialize(signatures: Vec<Signature>) -> Result<String> {
        let signatures: Vec<JwsSignature> = signatures
            .iter()
            .map(|s| JwsSignature {
                protected: base64_url::encode("{}"),
                signature: s.signature.clone(),
                header: JwsSignatureHeader {
                    alg: s.alg.to_string(),
                    kid: s.key.clone(),
                    subject: s.subject.clone(),
                    hash_alg: s.hash_alg.clone(),
                },
                message_hash: s.message_hash.clone(),
            })
            .collect();

        serde_json::to_string(&signatures)
            .map_err(|err| SignerError::GeneralSerializeError(err.to_string()))
    }

    fn deserialize(signatures: String) -> Result<Vec<Signature>> {
        let signatures: Vec<JwsSignature> = serde_json::from_str(&signatures)
            .map_err(|err| SignerError::GeneralDeserializeError(err.to_string()))?;
        let signatures: Vec<Signature> = signatures
            .iter()
            .map(|s| {
                Ok(Signature {
                    alg: SignAlg::try_from(s.header.alg.as_str())?,
                    key: s.header.kid.clone(),
                    subject: s.header.subject.clone(),
                    signature: s.signature.clone(),
                    message_hash: s.message_hash.clone(),
                    hash_alg: s.header.hash_alg.clone(),
                })
            })
            .collect::<Result<Vec<Signature>>>()?;
        Ok(signatures)
    }
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct JwsSignature {
    pub protected: String,
    pub signature: String,
    pub header: JwsSignatureHeader,
    pub message_hash: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct JwsSignatureHeader {
    pub alg: String,
    pub kid: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub subject: Option<String>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub hash_alg: Option<HashAlg>,
}
