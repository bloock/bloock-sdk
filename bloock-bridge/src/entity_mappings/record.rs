use std::convert::TryFrom;

use crate::{
    error::BridgeError,
    items::{Error, Record, RecordHeader, RecordReceipt, Signature, SignatureHeader},
};
use bloock_core::{
    record::{
        document::{Document, Headers},
        entity::{
            record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
        },
    },
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
    fn try_from(r: Signature) -> Result<Self, Self::Error> {
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

impl From<Record> for RecordCore {
    fn from(r: Record) -> Self {
        let record_signature = match r.signatures {
            Some(s) => Some(s.into()),
            None => None,
        };
        let record_encryption = match r.encryption {
            Some(e) => Some(e.into()),
            None => None,
        };
        let record_proof = match r.proof {
            Some(p) => Some(p.into()),
            None => None,
        };
        let document = Document::new(
            r.headers.into(),
            r.payload,
            record_signature,
            record_encryption,
            record_proof,
        );
        return RecordCore::new(document);
    }
}

/*impl From<RecordCore> for Record {
    fn from(r: RecordCore) -> Self {
        Self { hash: r.hash }
    }
}
*/
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
