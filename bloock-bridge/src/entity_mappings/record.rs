use crate::items::{Record, RecordReceipt};
use bloock_core::record::entity::{
    record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
};

impl From<Record> for RecordCore {
    fn from(r: Record) -> Self {
        Self { hash: r.hash }
    }
}

impl From<RecordCore> for Record {
    fn from(r: RecordCore) -> Self {
        Self { hash: r.hash }
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
