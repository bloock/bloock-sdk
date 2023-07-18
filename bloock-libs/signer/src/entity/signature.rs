use crate::Result;
use crate::{entity::alg::Algorithms, SignerError};
use bloock_hasher::H256;
use serde::{Deserialize, Serialize};
use std::str::from_utf8;

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct JWSignatures {
    pub signatures: Vec<Signature>,
    pub payload: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Signature {
    pub header: SignatureHeader,
    pub protected: String,
    pub signature: String,
    pub message_hash: String,
}

impl Signature {
    pub async fn get_common_name(&self, ens_provider: String, api_key: String) -> Result<String> {
        let alg = Algorithms::try_from(self.header.alg.as_str())?;
        match alg {
            Algorithms::Es256k => crate::local::ecdsa::get_common_name(self),
            Algorithms::Ens => {
                crate::local::ens::get_common_name(self, ens_provider, api_key).await
            }
            Algorithms::Es256kM => crate::local::ecdsa::get_common_name(self),
            Algorithms::EnsM => {
                crate::local::ens::get_common_name(self, ens_provider, api_key).await
            },
            Algorithms::BjjM => crate::local::ecdsa::get_common_name(self)
        }
    }

    pub fn recover_public_key(&self, message_hash: H256) -> Result<Vec<u8>> {
        let alg = Algorithms::try_from(self.header.alg.as_str())?;
        match alg {
            Algorithms::Es256k => crate::local::ecdsa::recover_public_key(self, message_hash),
            Algorithms::Ens => crate::local::ens::recover_public_key(self, message_hash),
            Algorithms::Es256kM => crate::local::ecdsa::recover_public_key(self, message_hash),
            Algorithms::EnsM => crate::local::ens::recover_public_key(self, message_hash),
            Algorithms::BjjM => crate::local::ecdsa::recover_public_key(self, message_hash),
        }
    }
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct SignatureHeader {
    pub alg: String,
    pub kid: String,
}

#[derive(Default, Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ProtectedHeader {
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

impl From<JWSignatures> for Signature {
    fn from(s: JWSignatures) -> Self {
        Self {
            protected: s.signatures[0].protected.clone(),
            signature: s.signatures[0].signature.clone(),
            header: s.signatures[0].header.clone(),
            message_hash: s.signatures[0].message_hash.clone(),
        }
    }
}
