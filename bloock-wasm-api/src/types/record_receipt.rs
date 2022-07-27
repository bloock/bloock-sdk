use bloock_core::record::entity::record::Record as BloockRecord;
use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen(getter_with_clone)]
pub struct RecordReceipt {
    pub hash: String,
}

impl From<BloockRecord> for RecordReceipt {
    fn from(a: BloockRecord) -> Self {
        Self { hash: a.hash }
    }
}

impl Into<BloockRecord> for RecordReceipt {
    fn into(self) -> BloockRecord {
        BloockRecord { hash: self.hash }
    }
}
