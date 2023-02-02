#![cfg(target_arch = "wasm32")]

mod common;
use common::*;
use wasm_bindgen_test::wasm_bindgen_test;
wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
async fn test_get_state() {
    get_state().await;
}

#[wasm_bindgen_test]
async fn test_reverse_ens() {
    reverse_ens().await;
}
