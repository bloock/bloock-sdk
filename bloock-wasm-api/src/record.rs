use bloock_core::record::entity::record;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct WasmRecord(record::Record);

impl From<record::Record> for WasmRecord {
    fn from(r: record::Record) -> Self {
        Self(r)
    }
}

impl WasmRecord {
    pub fn get_record(&self) -> record::Record {
        self.0.clone()
    }
}

#[wasm_bindgen]
impl WasmRecord {
    #[wasm_bindgen(js_class = Record, js_name = fromHash)]
    pub fn record_from_hash(hash: &str) -> WasmRecord {
        record::Record::from_hash(hash).into()
    }

    #[wasm_bindgen(js_class = Record, js_name = fromHex)]
    pub fn record_from_hex(hex: &str) -> WasmRecord {
        record::Record::from_hex(hex).into()
    }

    #[wasm_bindgen(js_class = Record, js_name = fromString)]
    pub fn record_from_string(s: &str) -> WasmRecord {
        record::Record::from_string(s).into()
    }

    #[wasm_bindgen(js_class = Record, js_name = fromTypedArray)]
    pub fn record_from_typed_array(buf: &[u8]) -> WasmRecord {
        record::Record::from_typed_array(buf).into()
    }

    #[wasm_bindgen(js_class = Record, js_name = fromPDF)]
    pub fn record_from_pdf(buf: &[u8]) -> WasmRecord {
        record::Record::from_pdf(buf).into()
    }

    #[wasm_bindgen(js_class = Record, js_name = fromJson)]
    pub fn record_from_json(json: &str) -> WasmRecord {
        record::Record::from_json(json).into()
    }

    #[wasm_bindgen(js_class = Record, js_name = getHash)]
    pub fn record_get_hash(&self) -> String {
        self.0.get_hash()
    }
}
