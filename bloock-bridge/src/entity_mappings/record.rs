use crate::items::{Record, RecordReceipt};
use bloock_core::record::entity::{
    record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
};

impl Into<RecordCore> for Record {
    fn into(self) -> RecordCore {
        RecordCore { hash: self.hash }
    }
}

impl Into<Record> for RecordCore {
    fn into(self) -> Record {
        Record { hash: self.hash }
    }
}

impl Into<RecordReceipt> for RecordReceiptCore {
    fn into(self) -> RecordReceipt {
        RecordReceipt {
            anchor: self.anchor,
            client: self.client,
            record: self.record,
            status: self.status,
        }
    }
}
