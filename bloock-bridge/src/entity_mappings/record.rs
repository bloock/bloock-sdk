use std::convert::{TryFrom, TryInto};

use crate::{
    error::{BridgeError, BridgeResult},
    items::{
        Encryption, EncryptionHeader, Proof, Record, RecordHeader, RecordReceipt, Signature,
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

impl From<Headers> for RecordHeader {
    fn from(h: Headers) -> Self {
        Self { ty: h.ty }
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
            cty: s.cty,
        }
    }
}

impl From<EncryptionHeaderCore> for EncryptionHeader {
    fn from(e: EncryptionHeaderCore) -> Self {
        Self {
            alg: e.alg,
            enc: e.enc,
            cty: e.cty,
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

impl TryFrom<RecordCore> for Record {
    type Error = BridgeError;
    fn try_from(r: RecordCore) -> BridgeResult<Record> {
        let record_serialize = match r.serialize() {
            Ok(record_serialize) => record_serialize,
            Err(_e) => BridgeError::RecordError.to_string(),
        };

        let document = match Document::deserialize(record_serialize.as_bytes().to_vec()) {
            Ok(document) => document,
            Err(e) => return Err(BridgeError::BloockError(e)),
        };

        let signatures: Vec<Signature> = match document.signatures {
            Some(signatures) => signatures.iter().map(|s| s.clone().into()).collect(),
            None => vec![],
        };

        let encryption: Option<Encryption> = document.encryption.map(|e| e.into());

        let proof: Option<Proof> = document.proof.map(|e| e.into());

        Ok(Record {
            headers: Some(document.headers.into()),
            payload: document.payload,
            signatures,
            encryption,
            proof,
        })
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
