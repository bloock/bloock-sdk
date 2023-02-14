use crate::{
    error::{BridgeError, BridgeResult},
    items::{Signature, SignatureHeader},
};
use bloock_core::{Signature as SignatureCore, SignatureHeader as SignatureHeaderCore};
use std::convert::TryFrom;

impl From<SignatureHeader> for SignatureHeaderCore {
    fn from(s: SignatureHeader) -> Self {
        Self {
            alg: s.alg,
            kid: s.kid,
        }
    }
}

impl From<SignatureHeaderCore> for SignatureHeader {
    fn from(s: SignatureHeaderCore) -> Self {
        Self {
            alg: s.alg,
            kid: s.kid,
        }
    }
}

impl TryFrom<Signature> for SignatureCore {
    type Error = BridgeError;
    fn try_from(r: Signature) -> BridgeResult<SignatureCore> {
        let signature_header = match r.header {
            Some(s) => s.into(),
            None => {
                return Err(BridgeError::RequestDeserialization(
                    "couldn't get signature header".to_string(),
                ))
            }
        };

        Ok(Self {
            signature: r.signature,
            header: signature_header,
            protected: r.protected,
            message_hash: r.message_hash,
        })
    }
}

impl From<SignatureCore> for Signature {
    fn from(s: SignatureCore) -> Self {
        Self {
            signature: s.signature,
            protected: s.protected,
            header: Some(s.header.into()),
            message_hash: s.message_hash,
        }
    }
}
