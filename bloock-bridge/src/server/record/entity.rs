use crate::{
    error::{BridgeError, BridgeResult},
    items::Record,
};
use bloock_core::record::{document::Document, entity::record::Record as RecordCore};
use std::convert::TryFrom;

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
