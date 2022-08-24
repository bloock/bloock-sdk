#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::*;

#[tokio::test]
async fn test_get_state() {
    get_state().await;
}
