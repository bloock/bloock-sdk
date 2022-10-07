pub mod items {
    #![allow(unknown_lints)]
    #![allow(clippy::all)]
    include!(concat!(env!("OUT_DIR"), "/bloock.rs"));
}
mod entity_mappings;
mod error;
pub mod ffi;
mod server;

#[cfg(any(target_arch = "wasm32", target_arch = "wasm64"))]
pub mod wasm {
    use crate::server::Server;
    use js_sys::{Function, Promise};
    use std::{future::Future, mem};
    use wasm_bindgen::prelude::*;
    use wasm_bindgen_futures::spawn_local;

    #[wasm_bindgen]
    pub fn request(request_type: String, payload: String) -> JsValue {
        future_to_promise(_request(request_type, payload)).into()
    }

    fn future_to_promise<F>(future: F) -> Promise
    where
        F: Future<Output = Result<JsValue, JsValue>> + 'static,
    {
        let mut future = Some(future);

        let mut func = |resolve: Function, reject: Function| {
            let future = future.take().unwrap_throw();

            spawn_local(async move {
                match future.await {
                    Ok(val) => {
                        resolve.call1(&JsValue::undefined(), &val).unwrap_throw();
                    }
                    Err(val) => {
                        reject.call1(&JsValue::undefined(), &val).unwrap_throw();
                    }
                }
            });
        };
        let promise = Promise::new(&mut func);
        mem::forget(func);
        promise
    }

    async fn _request(request_type: String, payload: String) -> Result<JsValue, JsValue> {
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
