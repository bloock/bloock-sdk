// everything in this file is unsafe, clippy
#![allow(clippy::not_unsafe_ptr_arg_deref)]

use bloock_core::record::entity::record::Record;

use crate::misc::BLOOCK_SUCCESS;
use bloock_core::error;

use std::ffi::{c_void, CString};
use std::os::raw::c_char;
use std::ptr::{null, null_mut};

/// Wrapper struct to help us return errors
#[repr(C)]
pub struct CResult<T> {
    pub result: *mut T,
    pub error: *const c_char,
}

impl From<Result<(), error::BloockError>> for CResult<c_void> {
    fn from(other: Result<(), error::BloockError>) -> Self {
        // Convenience handler to map `()` results to c_void
        Self::from(other.map(|_| null_mut()))
    }
}

impl From<Result<i64, error::BloockError>> for CResult<i64> {
    fn from(other: Result<i64, error::BloockError>) -> Self {
        match other {
            Ok(t) => {
                let mut i = t;
                Self {
                    result: &mut i,
                    error: null(),
                }
            }
            Err(e) => Self {
                result: null_mut(),
                error: {
                    let error_json = serde_json::to_string(&e).unwrap();
                    CString::new(error_json)
                        .expect("JSON should not contain any 0 bytes")
                        .into_raw()
                },
            },
        }
    }
}

impl From<Result<bool, error::BloockError>> for CResult<i64> {
    fn from(other: Result<bool, error::BloockError>) -> Self {
        match other {
            Ok(t) => {
                let mut i = t as i64;
                Self {
                    result: &mut i,
                    error: null(),
                }
            }
            Err(e) => Self {
                result: null_mut(),
                error: {
                    let error_json = serde_json::to_string(&e).unwrap();
                    CString::new(error_json)
                        .expect("JSON should not contain any 0 bytes")
                        .into_raw()
                },
            },
        }
    }
}

impl From<Result<Record, error::BloockError>> for CResult<Record> {
    fn from(other: Result<Record, error::BloockError>) -> Self {
        match other {
            Ok(t) => {
                let mut i = t;
                Self {
                    result: &mut i,
                    error: null(),
                }
            }
            Err(e) => Self {
                result: null_mut(),
                error: {
                    let error_json = serde_json::to_string(&e).unwrap();
                    CString::new(error_json)
                        .expect("JSON should not contain any 0 bytes")
                        .into_raw()
                },
            },
        }
    }
}

impl<T> From<Result<*mut T, error::BloockError>> for CResult<T> {
    fn from(other: Result<*mut T, error::BloockError>) -> Self {
        match other {
            Ok(t) => Self {
                result: t,
                error: null(),
            },
            Err(e) => Self {
                result: null_mut(),
                error: {
                    let error_json = serde_json::to_string(&e).unwrap();
                    CString::new(error_json)
                        .expect("JSON should not contain any 0 bytes")
                        .into_raw()
                },
            },
        }
    }
}

/// Unwrap the result term and return a zero/null pointer in the failure case
macro_rules! ffi_try {
    ($body:block) => {
        // $body.into()
        box_ptr!(catch_unwind(AssertUnwindSafe(|| $body))
            .map_err(|_| error::OperationalError::Unknown.into())
            .and_then(|res| res)
            .into())
    };
}

pub(crate) use ffi_try;

/// Recovers the original boxed version of `result` so that
/// it can be properly freed
#[no_mangle]
pub extern "C" fn result_void_free(result: *mut CResult<c_void>) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(result) });
    BLOOCK_SUCCESS
}

#[no_mangle]
pub extern "C" fn result_int_free(result: *mut CResult<i64>) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(result) });
    BLOOCK_SUCCESS
}

#[no_mangle]
pub extern "C" fn result_string_free(result: *mut CResult<c_char>) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(result) });
    BLOOCK_SUCCESS
}

#[no_mangle]
pub extern "C" fn result_record_free(result: *mut CResult<Record>) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(result) });
    BLOOCK_SUCCESS
}
