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
fn test_pdf_get() {
    pdf_get();
}

#[wasm_bindgen_test]
fn test_pdf_set() {
    pdf_set();
}
