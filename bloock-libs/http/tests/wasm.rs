#![cfg(target_arch = "wasm32")]

mod common;
use common::bloock::*;
use wasm_bindgen_test::wasm_bindgen_test;
wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
async fn test_bloock_http_client_get_api_key() {
    bloock_http_client_get_api_key().await;
}
