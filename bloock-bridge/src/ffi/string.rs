use std::{
    ffi::{CStr, CString},
    marker::PhantomData,
    os::raw::c_char,
};

#[repr(transparent)]
pub struct FfiStr<'a> {
    pub cstr: *const c_char,
    _boo: PhantomData<&'a ()>,
}

impl<'a> FfiStr<'a> {
    #[inline]
    pub unsafe fn from_raw(ptr: *const c_char) -> Self {
        Self {
            cstr: ptr,
            _boo: PhantomData,
        }
    }

    #[inline]
    pub fn from_cstr(cstr: &'a CStr) -> Self {
        Self {
            cstr: cstr.as_ptr(),
            _boo: PhantomData,
        }
    }

    #[inline]
    pub fn from_string(s: String) -> Option<Self> {
        match CString::new(s) {
            Ok(c) => Some(Self {
                cstr: c.into_raw(),
                _boo: PhantomData,
            }),
            Err(_) => None,
        }
    }

    #[inline]
    pub fn as_str(&self) -> &'a str {
        self.as_opt_str()
            .expect("Unexpected null string pointer passed to rust")
    }

    pub fn as_opt_str(&self) -> Option<&'a str> {
        if self.cstr.is_null() {
            return None;
        }
        unsafe {
            match std::ffi::CStr::from_ptr(self.cstr).to_str() {
                Ok(s) => Some(s),
                Err(_) => None,
            }
        }
    }
}
