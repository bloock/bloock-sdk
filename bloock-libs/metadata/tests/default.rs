#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::pdf::*;

#[test]
fn test_pdf_load() {
    pdf_load();
}

#[tokio::test]
async fn test_pdf_sign() {
    pdf_sign().await;
}

#[tokio::test]
async fn test_pdf_multisign() {
    pdf_multisign().await;
}
