#![cfg(not(target_arch = "wasm32"))]

mod common;
use common::pdf::*;

#[test]
fn test_pdf_load() {
    pdf_load();
}

#[test]
fn test_pdf_get() {
    pdf_get();
}

#[test]
fn test_pdf_set() {
    pdf_set();
}
