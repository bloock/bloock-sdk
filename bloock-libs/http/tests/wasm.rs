#![cfg(target_arch = "wasm32")]

mod common;
use common::*;
use wasm_bindgen_test::wasm_bindgen_test;
wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
async fn test_http_client_get_api_key() {
    http_client_get_api_key().await;
}

#[wasm_bindgen_test]
async fn test_http_client_get() {
    http_client_get().await;
}

#[wasm_bindgen_test]
async fn test_http_client_post() {
    http_client_post().await;
}
