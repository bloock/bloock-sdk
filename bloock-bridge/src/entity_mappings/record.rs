use crate::items::{Record, RecordReceipt};
use bloock_core::record::entity::{
    record::Record as RecordCore, record_receipt::RecordReceipt as RecordReceiptCore,
};

pub fn map_record(record: Record) -> RecordCore {
    RecordCore { hash: record.hash }
}

pub fn map_record_receipt(receipt: RecordReceiptCore) -> RecordReceipt {
    RecordReceipt {
        anchor: receipt.anchor,
        client: receipt.client,
        record: receipt.record,
        status: receipt.status,
    }
}
