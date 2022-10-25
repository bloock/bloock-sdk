#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::bloock::*;
use common::simple::*;

#[tokio::test]
async fn test_bloock_http_client_get_api_key() {
    bloock_http_client_get_api_key().await;
}

#[tokio::test]
async fn test_bloock_http_client_get() {
    bloock_http_client_get().await;
}

#[tokio::test]
async fn test_bloock_http_client_post() {
    bloock_http_client_post().await;
}

#[tokio::test]
async fn test_bloock_http_client_post_file() {
    bloock_http_client_post_file().await;
}

#[tokio::test]
async fn test_simple_http_client_get() {
    simple_http_client_get().await;
}

#[tokio::test]
async fn test_simple_http_client_post() {
    simple_http_client_post().await;
}

#[tokio::test]
async fn test_simple_http_client_post_file() {
    simple_http_client_post_file().await;
}
