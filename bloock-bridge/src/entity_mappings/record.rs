use crate::{
    error::{BridgeError, BridgeResult},
    items::{EncryptionAlg, Record, RecordReceipt, Signature, SignatureHeader},
};
use bloock_core::{
    record::{
        document::Document,
        entity::{
            record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
        },
    },
    Signature as SignatureCore, SignatureHeader as SignatureHeaderCore,
};
use std::convert::TryFrom;

impl From<bloock_encrypter::EncryptionAlg> for EncryptionAlg {
    fn from(alg: bloock_encrypter::EncryptionAlg) -> Self {
        match alg {
            bloock_encrypter::EncryptionAlg::A256gcm => EncryptionAlg::A256gcm,
            bloock_encrypter::EncryptionAlg::Rsa => EncryptionAlg::Rsa,
            bloock_encrypter::EncryptionAlg::Ecies => EncryptionAlg::Ecies,
        }
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

impl TryFrom<Record> for RecordCore {
    type Error = BridgeError;
    fn try_from(r: Record) -> BridgeResult<RecordCore> {
        let document = Document::new(&r.payload)?;
        if document.is_encrypted() {
            // when a record is encrypted, we cannot generate the hash,
            // so we grab the one we generated before encryption
            RecordCore::new_with_hash(document, &r.hash).map_err(BridgeError::BloockError)
        } else {
            RecordCore::new(document).map_err(BridgeError::BloockError)
        }
    }
}

impl TryFrom<RecordCore> for Record {
    type Error = BridgeError;
    fn try_from(r: RecordCore) -> BridgeResult<Record> {
        let hash = r.get_hash();
        let payload = r.serialize()?;

        Ok(Record {
            config_data: None,
            payload,
            hash,
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
