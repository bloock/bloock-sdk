#![cfg(target_arch = "wasm32")]

mod common;
use common::pdf::*;
use wasm_bindgen_test::wasm_bindgen_test;
wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn test_pdf_load() {
    pdf_load();
}

#[wasm_bindgen_test]
async fn test_pdf_sign() {
    pdf_sign().await;
}

#[wasm_bindgen_test]
async fn test_pdf_multisign() {
    pdf_multisign().await;
}
