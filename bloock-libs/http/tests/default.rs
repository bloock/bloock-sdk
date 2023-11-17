#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::bloock::*;

#[tokio::test]
async fn test_bloock_http_client_get_api_key() {
    bloock_http_client_get_api_key().await;
}

#[tokio::test]
async fn test_bloock_http_client_get_environment() {
    bloock_http_client_get_environment().await;
}
