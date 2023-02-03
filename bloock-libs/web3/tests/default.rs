#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::*;

#[tokio::test]
async fn test_get_state() {
    get_state().await;
}

#[tokio::test]
async fn test_reverse_ens() {
    reverse_ens().await;
}
