use crate::{
    error::{BridgeError, BridgeResult},
    items::{HashAlg, Signature},
};
use bloock_hasher::HashAlg as HashAlgCore;
use bloock_signer::entity::{alg::SignAlg, signature::Signature as SignatureCore};
use std::convert::TryFrom;

impl TryFrom<Signature> for SignatureCore {
    type Error = BridgeError;
    fn try_from(r: Signature) -> BridgeResult<SignatureCore> {
        let sig_alg = SignAlg::try_from(r.alg.as_str())
            .map_err(|e| BridgeError::RequestDeserialization(e.to_string()))?;

        let hash_alg = r
            .hash_alg
            .and_then(|h| HashAlgCore::try_from(h.as_str()).ok());

        Ok(Self {
            signature: r.signature,
            alg: sig_alg,
            key: r.kid,
            subject: r.subject,
            message_hash: r.message_hash,
            hash_alg,
        })
    }
}

impl From<SignatureCore> for Signature {
    fn from(s: SignatureCore) -> Self {
        Self {
            signature: s.signature,
            alg: s.alg.to_string(),
            kid: s.key,
            subject: s.subject,
            message_hash: s.message_hash,
            hash_alg: s.hash_alg.and_then(|h| Some(h.to_string())),
        }
    }
}

impl From<HashAlg> for HashAlgCore {
    fn from(r: HashAlg) -> HashAlgCore {
        match r {
            HashAlg::Sha256 => HashAlgCore::Sha256,
            HashAlg::Keccak256 => HashAlgCore::Keccak256,
            HashAlg::Poseidon => HashAlgCore::Poseidon,
        }
    }
}
