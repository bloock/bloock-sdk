use crate::misc::box_ptr;
use crate::result::ffi_try;
use crate::result::CResult;
use bloock_core::error;
use std::panic::{catch_unwind, AssertUnwindSafe};

#[repr(C)]
pub struct Buffer {
    data: *mut u8,
    len: usize,
}

impl From<&mut Vec<u8>> for Buffer {
    fn from(buf: &mut Vec<u8>) -> Self {
        let data = buf.as_mut_ptr();
        let len = buf.len();
        std::mem::forget(buf);
        Buffer { data, len }
    }
}

impl From<&mut Buffer> for Vec<u8> {
    fn from(buf: &mut Buffer) -> Vec<u8> {
        let s = unsafe { std::slice::from_raw_parts(buf.data, buf.len) };
        s.to_vec()
    }
}

impl From<&mut [u8]> for Buffer {
    fn from(buf: &mut [u8]) -> Self {
        let data = buf.as_mut_ptr();
        let len = buf.len();
        std::mem::forget(buf);
        Buffer { data, len }
    }
}

#[no_mangle]
pub extern "C" fn new_byte_array(ptr: *mut u8, len: usize) -> *mut Buffer {
    box_ptr!(Buffer {
        data: ptr,
        len: len,
    })
}

pub extern "C" fn byte_array_free(buf: Buffer) {
    let s = unsafe { std::slice::from_raw_parts_mut(buf.data, buf.len) };
    let s = s.as_mut_ptr();
    unsafe {
        Box::from_raw(s);
    }
}
