#![cfg(target_arch = "wasm32")]

mod common;
use common::bloock::*;
use common::simple::*;
use wasm_bindgen_test::wasm_bindgen_test;
wasm_bindgen_test::wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
async fn test_bloock_http_client_get_api_key() {
    bloock_http_client_get_api_key().await;
}

#[wasm_bindgen_test]
async fn test_bloock_http_client_get() {
    bloock_http_client_get().await;
}

#[wasm_bindgen_test]
async fn test_bloock_http_client_get_json() {
    bloock_http_client_get_json().await;
}

#[wasm_bindgen_test]
async fn test_bloock_http_client_post() {
    bloock_http_client_post().await;
}

#[wasm_bindgen_test]
async fn test_bloock_http_client_post_json() {
    bloock_http_client_post_json().await;
}

#[wasm_bindgen_test]
async fn test_bloock_http_client_post_file() {
    bloock_http_client_post_file().await;
}

#[wasm_bindgen_test]
async fn test_simple_http_client_get() {
    simple_http_client_get().await;
}

#[wasm_bindgen_test]
async fn test_simple_http_client_get_json() {
    simple_http_client_get_json().await;
}

#[wasm_bindgen_test]
async fn test_simple_http_client_post() {
    simple_http_client_post().await;
}

#[wasm_bindgen_test]
async fn test_simple_http_client_post_json() {
    simple_http_client_post_json().await;
}

#[wasm_bindgen_test]
async fn test_simple_http_client_post_file() {
    simple_http_client_post_file().await;
}
