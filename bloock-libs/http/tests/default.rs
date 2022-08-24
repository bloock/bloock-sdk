#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::*;

#[tokio::test]
async fn test_http_client_get_api_key() {
    http_client_get_api_key().await;
}

#[tokio::test]
async fn test_http_client_get() {
    http_client_get().await;
}

#[tokio::test]
async fn test_http_client_post() {
    http_client_post().await;
}
