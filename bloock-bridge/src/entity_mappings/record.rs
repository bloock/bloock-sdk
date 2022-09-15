use std::convert::TryFrom;

use crate::{
    error::{BridgeError, BridgeResult},
    items::{
        Encryption, EncryptionHeader, Record, RecordHeader, RecordReceipt, Signature,
        SignatureHeader,
    },
};
use bloock_core::{
    record::{
        document::{Document, Headers},
        entity::{
            record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
        },
    },
    Encryption as EncryptionCore, EncryptionHeader as EncryptionHeaderCore,
    Signature as SignatureCore, SignatureHeader as SignatureHeaderCore,
};

impl From<RecordHeader> for Headers {
    fn from(r: RecordHeader) -> Self {
        Self { ty: r.ty }
    }
}

impl From<SignatureHeader> for SignatureHeaderCore {
    fn from(s: SignatureHeader) -> Self {
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
        })
    }
}

impl From<EncryptionHeader> for EncryptionHeaderCore {
    fn from(s: EncryptionHeader) -> Self {
        Self { alg: s.alg }
    }
}

impl TryFrom<Encryption> for EncryptionCore {
    type Error = BridgeError;
    fn try_from(e: Encryption) -> BridgeResult<EncryptionCore> {
        let encryption_header = match e.header {
            Some(e) => e.into(),
            None => {
                return Err(BridgeError::RequestDeserialization(
                    "couldn't get signature header".to_string(),
                ))
            }
        };
        Ok(Self {
            header: encryption_header,
            protected: e.protected,
        })
    }
}

impl TryFrom<Record> for RecordCore {
    type Error = BridgeError;
    fn try_from(r: Record) -> BridgeResult<RecordCore> {
        let record_header = match r.headers {
            Some(h) => h.into(),
            None => {
                return Err(BridgeError::RequestDeserialization(
                    "couldn't find headers".to_string(),
                ))
            }
        };
        let record_signature = match !r.signatures.is_empty() {
            true => Some(
                r.signatures
                    .iter()
                    .map(|s| s.clone().try_into())
                    .collect::<BridgeResult<Vec<SignatureCore>>>()?,
            ),
            false => None,
        };
        let record_encryption = match r.encryption {
            Some(e) => Some(e.try_into()?),
            None => None,
        };
        let record_proof = match r.proof {
            Some(p) => Some(p.try_into()?),
            None => None,
        };
        let document = Document::new(
            record_header,
            r.payload,
            record_signature,
            record_encryption,
            record_proof,
        );
        Ok(RecordCore::new(document))
    }
}

impl From<RecordReceiptCore> for RecordReceipt {
    fn from(r: RecordReceiptCore) -> Self {
        Self {
            anchor: r.anchor,
            client: r.client,
            record: r.record,
            status: r.status,
        }
    }
}
