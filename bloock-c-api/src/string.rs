// everything in this file is unsafe, clippy
#![allow(clippy::not_unsafe_ptr_arg_deref)]

use crate::misc::{BLOOCK_FAILURE, BLOOCK_SUCCESS};

use std::ffi::CString;
use std::os::raw::c_char;

/// Get a `Cow<str>` back from a C-style string
macro_rules! ffi_string {
    ($name:ident) => {{
        assert!(!$name.is_null());
        CStr::from_ptr($name).to_string_lossy()
    }};
}
pub(crate) use ffi_string;

/// Required to free strings properly
#[no_mangle]
pub extern "C" fn string_free(s: *mut c_char) -> i32 {
    if s.is_null() {
        return BLOOCK_FAILURE;
    }
    unsafe { CString::from_raw(s) };
    BLOOCK_SUCCESS
}
