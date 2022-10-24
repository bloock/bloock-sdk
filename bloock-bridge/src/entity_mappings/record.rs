use crate::{
    error::{BridgeError, BridgeResult},
    items::{Encryption, EncryptionHeader, Record, RecordReceipt, Signature, SignatureHeader},
};
use bloock_core::{
    record::{
        document::Document,
        entity::{
            record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
        },
    },
    Encryption as EncryptionCore, EncryptionHeader as EncryptionHeaderCore,
    Signature as SignatureCore, SignatureHeader as SignatureHeaderCore,
};
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
        })
    }
}

impl From<SignatureCore> for Signature {
    fn from(s: SignatureCore) -> Self {
        Self {
            signature: s.signature,
            protected: s.protected,
            header: Some(s.header.into()),
        }
    }
}

impl From<EncryptionHeader> for EncryptionHeaderCore {
    fn from(s: EncryptionHeader) -> Self {
        Self {
            alg: s.alg,
            enc: s.enc,
        }
    }
}

impl From<EncryptionHeaderCore> for EncryptionHeader {
    fn from(e: EncryptionHeaderCore) -> Self {
        Self {
            alg: e.alg,
            enc: e.enc,
        }
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
            ciphertext: e.ciphertext,
            tag: e.tag,
        })
    }
}

impl From<EncryptionCore> for Encryption {
    fn from(e: EncryptionCore) -> Self {
        Self {
            header: Some(e.header.into()),
            protected: e.protected,
            ciphertext: e.ciphertext,
            tag: e.tag,
        }
    }
}

impl TryFrom<Record> for RecordCore {
    type Error = BridgeError;
    fn try_from(r: Record) -> BridgeResult<RecordCore> {
        let document = Document::new(&r.payload)?;
        Ok(RecordCore::new(document))
    }
}

impl TryFrom<RecordCore> for Record {
    type Error = BridgeError;
    fn try_from(r: RecordCore) -> BridgeResult<Record> {
        let payload = r.serialize()?;

        Ok(Record { payload })
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
