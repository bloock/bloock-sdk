pub mod items {
    include!(concat!(env!("OUT_DIR"), "/bloock.rs"));
}
mod entity_mappings;
mod error;
pub mod ffi;
mod server;

#[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
pub mod wasm {
    use crate::server::Server;
    use js_sys::Promise;
    use wasm_bindgen::prelude::*;
    use web_sys::console;

    #[wasm_bindgen]
    pub async fn request(request_type: String, payload: String) -> Result<JsValue, JsValue> {
        Server::do_request(&request_type, &payload)
            .await
            .map(|r| r.into())
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }
}

#[cfg(not(any(target_arch = "wasm32", target_arch = "wasm64")))]
pub mod default {
    use crate::{ffi::string::FfiStr, server::Server};

    #[no_mangle]
    pub extern "C" fn request(request_type: FfiStr, payload: FfiStr) -> FfiStr<'static> {
        let result = match bloock_executor::Executor::block_on(Server::do_request(
            request_type.as_str(),
            payload.as_str(),
        )) {
            Ok(r) => r,
            Err(e) => {
                println!("{}", e);
                return FfiStr::from_string(e.to_string()).unwrap();
            }
        };
        let response = match result {
            Ok(r) => r,
            Err(e) => {
                println!("{}", e);
                e.to_string()
            }
        };

        FfiStr::from_string(response).unwrap()
    }
}
