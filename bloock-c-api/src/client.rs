use crate::block_on::block_on;
use crate::misc::BLOOCK_SUCCESS;
use crate::misc::{box_ptr, ffi_ref, from_json};
use crate::record::RecordList;
use crate::result::ffi_try;
use crate::result::CResult;
use crate::string::ffi_string;
use bloock_core::client::{configure, BloockClient};
use bloock_core::config::entity::network::Network;
use bloock_core::error;
use bloock_core::record::entity::record::Record;
use std::ffi::c_void;
use std::ffi::CStr;
use std::ffi::CString;
use std::os::raw::c_char;
use std::panic::{catch_unwind, AssertUnwindSafe};

#[no_mangle]
pub extern "C" fn client_new(name: *const c_char) -> *mut BloockClient {
    let name = unsafe { ffi_string!(name) };

    box_ptr!(configure(name.as_ref().to_string()))
}

#[no_mangle]
pub extern "C" fn client_set_api_host(
    _self: *mut BloockClient,
    host: *const c_char,
) -> *mut CResult<c_void> {
    ffi_try!({
        let client = unsafe { ffi_ref!(_self) };
        let host = unsafe { ffi_string!(host) };

        client.set_api_host(host.as_ref().to_string());

        Ok(())
    })
}

#[no_mangle]
pub extern "C" fn client_set_network_configuration(
    _self: *mut BloockClient,
    network: *const c_char,
    configuration: *const c_char,
) -> *mut CResult<c_void> {
    ffi_try!({
        let client = unsafe { ffi_ref!(_self) };
        let network = unsafe { ffi_string!(network) };
        from_json(configuration).and_then(|configuration| {
            client.set_network_configuration(
                Network::from(network.as_ref().to_string()),
                configuration,
            );
            Ok(())
        })
    })
}

#[no_mangle]
pub extern "C" fn client_send_records(
    _self: *mut BloockClient,
    records: *mut RecordList,
) -> *mut CResult<c_char> {
    ffi_try!({
        let client = unsafe { ffi_ref!(_self) };
        let records = unsafe { ffi_ref!(records) };

        let result = block_on!({ client.send_records(Vec::<Record>::from(records)) })?;

        let msg_json = serde_json::to_string(&result).unwrap();
        Ok(CString::new(msg_json)
            .expect("JSON should not contain any 0 bytes")
            .into_raw())
    })
}

// #[no_mangle]
// pub extern "C" fn client_get_records(
//     _self: *mut BloockClient,
//     records: *mut RecordList,
// ) -> *mut CResult<c_char> {
//     ffi_try!({
//         let client = unsafe { ffi_ref!(_self) };
//         let records = unsafe { ffi_ref!(records) };

//         let result = block_on!({ client.get_records(&Vec::<Record>::from(records)) })?;

//         let msg_json = serde_json::to_string(&result).unwrap();
//         Ok(CString::new(msg_json)
//             .expect("JSON should not contain any 0 bytes")
//             .into_raw())
//     })
// }
#[no_mangle]
pub extern "C" fn client_get_anchor(_self: *mut BloockClient, anchor: i64) -> *mut CResult<c_char> {
    ffi_try!({
        let client = unsafe { ffi_ref!(_self) };
        let result = block_on!({ client.get_anchor(anchor.try_into().unwrap()) })?;

        let msg_json = serde_json::to_string(&result).unwrap();
        Ok(CString::new(msg_json)
            .expect("JSON should not contain any 0 bytes")
            .into_raw())
    })
}
#[no_mangle]
pub extern "C" fn client_wait_anchor(
    _self: *mut BloockClient,
    anchor: i64,
    timeout: i64,
) -> *mut CResult<c_char> {
    ffi_try!({
        let client = unsafe { ffi_ref!(_self) };
        let result = block_on!({ client.wait_anchor(anchor, timeout) })?;

        let msg_json = serde_json::to_string(&result).unwrap();
        Ok(CString::new(msg_json)
            .expect("JSON should not contain any 0 bytes")
            .into_raw())
    })
}
// #[no_mangle]
// pub extern "C" fn client_get_proof(
//     _self: *mut BloockClient,
//     records: *mut RecordList,
// ) -> *mut CResult<c_char> {
//     ffi_try!({
//         let client = unsafe { ffi_ref!(_self) };
//         let records = unsafe { ffi_ref!(records) };

//         let result = client.get_proof(&Vec::<Record>::from(records))?;

//         let msg_json = serde_json::to_string(&result).unwrap();
//         Ok(CString::new(msg_json)
//             .expect("JSON should not contain any 0 bytes")
//             .into_raw())
//     })
// }
// #[no_mangle]
// pub extern "C" fn client_verify_root(
//     _self: *mut BloockClient,
//     root: *mut Record,
//     network: *const c_char,
// ) -> *mut CResult<i64> {
//     ffi_try!({
//         let client = unsafe { ffi_ref!(_self) };
//         let network = unsafe { ffi_string!(network) };
//         let root = unsafe { ffi_ref!(root) };

//         client.verify_root(root, network.as_ref())
//     })
// }
// #[no_mangle]
// pub extern "C" fn client_verify_proof(
//     _self: *mut BloockClient,
//     proof: *const c_char,
// ) -> *mut CResult<Record> {
//     ffi_try!({
//         let client = unsafe { ffi_ref!(_self) };
//         from_json(proof).and_then(|proof| client.verify_proof(proof))
//     })
// }
// #[no_mangle]
// pub extern "C" fn client_verify_records(
//     _self: *mut BloockClient,
//     records: *mut RecordList,
// ) -> *mut CResult<i64> {
//     ffi_try!({
//         let client = unsafe { ffi_ref!(_self) };
//         let records = unsafe { ffi_ref!(records) };

//         client.verify_records(&Vec::<Record>::from(records))
//     })
// }
// #[no_mangle]
// pub extern "C" fn client_verify_signatures(
//     _self: *mut BloockClient,
//     records: *mut RecordList,
// ) -> *mut CResult<i64> {
//     ffi_try!({
//         let client = unsafe { ffi_ref!(_self) };
//         let records = unsafe { ffi_ref!(records) };

//         client.verify_signatures(&Vec::<Record>::from(records))
//     })
// }

/// Recovers the original boxed version of `bloock` so that
/// it can be properly freed
#[no_mangle]
pub extern "C" fn client_free(bloock: *mut BloockClient) -> i32 {
    std::mem::drop(unsafe { Box::from_raw(bloock) });
    BLOOCK_SUCCESS
}
