use std::str::FromStr;

use serde::{
    ser::{Error, SerializeSeq},
    Deserialize, Serialize,
};
use serde_json::Value;

pub const SIGNATURE_PROOF_TYPE: &str = "BJJSignature2021";
pub const SPARSE_MT_PROOF_TYPE: &str = "Iden3SparseMerkleTreeProof";

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct CredentialProof {
    pub signature_proof: String,
    pub sparse_mt_proof: Option<String>,
}

impl Serialize for CredentialProof {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        let mut state = serializer.serialize_seq(None)?;

        let mut bjj_signature = Value::from_str(&self.signature_proof.clone())
            .map_err(|_| Error::custom("error serializing zkp signature proof"))?;
        let bjj_signature_map = bjj_signature
            .as_object_mut()
            .ok_or_else(|| Error::custom("error serializing zkp signature proof"))?;
        state.serialize_element(&bjj_signature_map)?;

        if let Some(sparse_mt_proof) = self.sparse_mt_proof.clone() {
            let mut sparse_mtp = Value::from_str(&sparse_mt_proof.clone())
                .map_err(|_| Error::custom("error serializing sparse mtp proof"))?;
            let sparse_mtp_map = sparse_mtp
                .as_object_mut()
                .ok_or_else(|| Error::custom("error serializing sparse mtp proof"))?;
            state.serialize_element(&sparse_mtp_map)?;
        }

        state.end()
    }
}

impl<'de> Deserialize<'de> for CredentialProof {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        let value: Value = Value::deserialize(deserializer)?;

        let mut signature_proof = String::new();
        let mut sparse_mt_proof: Option<String> = None;

        if let Some(proof_array) = value.as_array() {
            for proof in proof_array.iter() {
                if let Some(proof_type) = proof["type"].as_str() {
                    match proof_type {
                        SIGNATURE_PROOF_TYPE => {
                            signature_proof = proof.to_string();
                        }
                        SPARSE_MT_PROOF_TYPE => {
                            sparse_mt_proof = Some(proof.to_string());
                        }
                        _ => return Err(serde::de::Error::missing_field(SIGNATURE_PROOF_TYPE)),
                    }
                } else {
                    return Err(serde::de::Error::missing_field("type"));
                }
            }
        }

        Ok(CredentialProof {
            signature_proof,
            sparse_mt_proof,
        })
    }
}
