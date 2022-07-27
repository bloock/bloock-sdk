use wasm_bindgen::JsValue;

use bloock_core::error::{BloockError, OperationalError};

pub(crate) struct Error(BloockError);

pub(crate) fn serialization_error(msg: String) -> JsValue {
    Error(OperationalError::Serialization(msg).into()).into()
}

impl From<BloockError> for Error {
    fn from(other: BloockError) -> Self {
        Self(other)
    }
}

impl From<Error> for js_sys::Error {
    fn from(err: Error) -> Self {
        let e = Self::new(&err.0.to_string());
        e.set_name(&format!("{}", err.0));
        e
    }
}

impl From<Error> for JsValue {
    fn from(err: Error) -> Self {
        js_sys::Error::from(err).into()
    }
}
