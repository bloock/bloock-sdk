use crate::misc::{box_ptr, ffi_ref};
use crate::result::ffi_try;
use crate::result::CResult;
use crate::string::ffi_string;
use bloock_core::record::entity::record::Record;
use std::ffi::CStr;
use std::ffi::CString;

use crate::byte_array::Buffer;
use std::panic::{catch_unwind, AssertUnwindSafe};

use crate::misc::BLOOCK_SUCCESS;
use bloock_core::error;

use std::os::raw::c_char;

#[repr(C)]
pub struct RecordList {
    data: *mut Record,
    len: usize,
}

impl From<&mut Vec<Record>> for RecordList {
    fn from(buf: &mut Vec<Record>) -> Self {
        let data = buf.as_mut_ptr();
        let len = buf.len();
        std::mem::forget(buf);
        RecordList { data, len }
    }
}

impl From<&mut RecordList> for Vec<Record> {
    fn from(buf: &mut RecordList) -> Vec<Record> {
        let s = unsafe { std::slice::from_raw_parts(buf.data, buf.len) };
        s.to_vec()
    }
}

#[no_mangle]
pub extern "C" fn new_record_list(ptr: *mut Record, len: usize) -> *mut RecordList {
    box_ptr!(RecordList {
        data: ptr,
        len: len,
    })
}

#[no_mangle]
pub extern "C" fn record_list_free(records: *mut RecordList) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(records) });
    BLOOCK_SUCCESS
}

#[no_mangle]
pub extern "C" fn record_from_hash(hash: *const c_char) -> *mut CResult<Record> {
    ffi_try!({
        let hash = unsafe { ffi_string!(hash) };

        Ok(box_ptr!(Record::from_hash(hash.as_ref())))
    })
}

#[no_mangle]
pub extern "C" fn record_from_hex(hex: *const c_char) -> *mut CResult<Record> {
    ffi_try!({
        let hex = unsafe { ffi_string!(hex) };

        Ok(box_ptr!(Record::from_hex(hex.as_ref())))
    })
}

#[no_mangle]
pub extern "C" fn record_from_string(s: *const c_char) -> *mut CResult<Record> {
    ffi_try!({
        let s = unsafe { ffi_string!(s) };

        Ok(box_ptr!(Record::from_string(s.as_ref())))
    })
}

#[no_mangle]
pub extern "C" fn record_from_typed_array(buf: *mut Buffer) -> *mut CResult<Record> {
    ffi_try!({
        let buf = unsafe { ffi_ref!(buf) };

        Ok(box_ptr!(Record::from_typed_array(&Vec::<u8>::from(buf))))
    })
}

#[no_mangle]
pub extern "C" fn record_from_pdf(buf: *mut Buffer) -> *mut CResult<Record> {
    ffi_try!({
        let buf = unsafe { ffi_ref!(buf) };

        Ok(box_ptr!(Record::from_pdf(&Vec::<u8>::from(buf))))
    })
}

#[no_mangle]
pub extern "C" fn record_from_json(hash: *const c_char) -> *mut CResult<Record> {
    ffi_try!({
        let hash = unsafe { ffi_string!(hash) };

        Ok(box_ptr!(Record::from_json(hash.as_ref())))
    })
}

#[no_mangle]
pub extern "C" fn record_get_hash(_self: *mut Record) -> *mut CResult<c_char> {
    ffi_try!({
        let record = unsafe { ffi_ref!(_self) };

        let hash = record.get_hash();

        Ok(CString::new(hash)
            .expect("Hash should not contain any 0 bytes")
            .into_raw())
    })
}

#[no_mangle]
pub extern "C" fn record_free(record: *mut Record) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(record) });
    BLOOCK_SUCCESS
}
