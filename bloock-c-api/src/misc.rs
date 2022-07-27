// everything in this file is unsafe, clippy
#![allow(clippy::not_unsafe_ptr_arg_deref)]

use crate::string::ffi_string;
use bloock_core::error;
use std::ffi::CStr;
use std::os::raw::c_char;

/// We use the convention of zero as an error term,
/// since we also use `null_ptr()` to indicate an error.
/// So for consistency, a zero term is an error in both cases.
pub const BLOOCK_FAILURE: i32 = 0;
pub const BLOOCK_SUCCESS: i32 = 1;

/// Get a reference to an object from a pointer
macro_rules! ffi_ref {
    ($name:ident) => {{
        assert!(!$name.is_null());
        &mut *$name
    }};
}
pub(crate) use ffi_ref;

/// Returns a raw pointer from an object
macro_rules! box_ptr {
    ($x:expr) => {
        Box::into_raw(Box::new($x))
    };
}
pub(crate) use box_ptr;

pub fn serde_error(e: serde_json::Error) -> error::BloockError {
    error::OperationalError::Serialization(e.to_string()).into()
}
pub fn from_json<T: serde::de::DeserializeOwned>(
    str: *const c_char,
) -> Result<T, error::BloockError> {
    let str = unsafe { ffi_string!(str) };
    serde_json::from_str(&str).map_err(serde_error)
}
