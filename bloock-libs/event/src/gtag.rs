
use crate::{EventLayer, Result};
use async_trait::async_trait;

use serde_json::Value;
#[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
use wasm_bindgen::prelude::*;

#[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_name = gtag)]
    pub fn gtag_with_parameters(cmd: &str, id: &str, params: &JsValue);
}

pub struct GtagLayer {}

impl GtagLayer {
    pub fn new() -> Self {
        GtagLayer {}
    }
}

#[async_trait(?Send)]
impl EventLayer for GtagLayer {
    async fn push(&self, _id: &str, _params: Value) -> Result<()> {
        #[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
        gtag_with_parameters(
            "event",
            id,
            &JsValue::from_serde(&params).map_err(|_| EventError::PushError())?,
        );
        Ok(())
    }
}
