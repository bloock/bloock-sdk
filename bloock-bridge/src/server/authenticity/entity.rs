use crate::{
    error::{BridgeError, BridgeResult},
    items::Signature,
};
use bloock_signer::entity::{alg::SignAlg, signature::Signature as SignatureCore};

use std::convert::TryFrom;

impl TryFrom<Signature> for SignatureCore {
    type Error = BridgeError;
    fn try_from(r: Signature) -> BridgeResult<SignatureCore> {
        let sig_alg = SignAlg::try_from(r.alg.as_str()).map_err(|e| {
            BridgeError::RequestDeserialization(e.to_string())
        })?;

        Ok(Self {
            signature: r.signature,
            alg: sig_alg,
            kid: r.kid,
            message_hash: r.message_hash,
        })
    }
}

impl From<SignatureCore> for Signature {
    fn from(s: SignatureCore) -> Self {
        Self {
            signature: s.signature,
            alg: s.alg.to_string(),
            kid: s.kid,
            message_hash: s.message_hash,
        }
    }
}
