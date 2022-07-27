mod client;
mod errors;
mod record;
mod types;

pub use client::WasmClient;
pub use record::WasmRecord;

type JsResult<T> = Result<T, wasm_bindgen::JsValue>;
