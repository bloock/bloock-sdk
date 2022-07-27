use bloock_core::record::entity::record::Record as BloockRecord;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::wasm_bindgen;
use wasm_bindgen::JsValue;

#[derive(Clone, Serialize, Deserialize)]
#[wasm_bindgen(getter_with_clone)]
pub struct Record {
    pub hash: String,
}

#[derive(Clone, Serialize, Deserialize)]
pub struct RecordList(pub Vec<Record>);

impl From<BloockRecord> for Record {
    fn from(a: BloockRecord) -> Self {
        Self { hash: a.hash }
    }
}

impl Into<BloockRecord> for Record {
    fn into(self) -> BloockRecord {
        BloockRecord { hash: self.hash }
    }
}

impl From<Vec<Record>> for RecordList {
    fn from(a: Vec<Record>) -> Self {
        Self(a.iter().map(|r| r.clone().into()).collect())
    }
}

impl Into<Vec<Record>> for RecordList {
    fn into(self) -> Vec<Record> {
        self.0.iter().map(|r| r.clone().into()).collect()
    }
}

impl From<Vec<BloockRecord>> for RecordList {
    fn from(a: Vec<BloockRecord>) -> Self {
        Self(a.iter().map(|r| r.clone().into()).collect())
    }
}

impl Into<Vec<BloockRecord>> for RecordList {
    fn into(self) -> Vec<BloockRecord> {
        self.0.iter().map(|r| r.clone().into()).collect()
    }
}

impl From<&JsValue> for RecordList {
    fn from(a: &JsValue) -> Self {
        let items: Vec<Record> = a.into_serde().unwrap();
        items.into()
    }
}
