package ffi

// #cgo CFLAGS: -g -Wall
// #include <stdint.h>
// #include <stdlib.h>
// #include "native/bloock.h"
// #cgo linux,amd64 LDFLAGS: ${SRCDIR}/native/linux/libbloock.a -ldl -lm
// #cgo darwin,amd64 LDFLAGS: ${SRCDIR}/native/macos/amd64/libbloock.dylib -ldl -lm -framework Security
// #cgo darwin,arm64 LDFLAGS: ${SRCDIR}/native/macos/arm64/libbloock.a -ldl -lm -framework Security
// #cgo windows,amd64 LDFLAGS: ${SRCDIR}/native/windows/libbloock.a -lm -lws2_32 -luserenv -lbcrypt
import "C"
import (
	"encoding/json"
	"unsafe"

	"github.com/bloock/go-bloock/errors"
)

func checkResultVoid(res *C.bloock_CResult_c_void) error {
	err := res.error
	resultPtr := res.result
	defer C.result_void_free(res)
	if err != nil {
		if resultPtr != nil {
			panic("Internal error: both result and error pointers are not null")
		}
		return getError(err)
	}
	return nil
}

func checkResultString(res *C.bloock_CResult_c_char) (string, error) {
	err := res.error
	resultPtr := res.result
	// it's fine to cast this pointer to result c_void, since Rust won't
	// do anything with inner pointers anyway
	defer C.result_string_free((*C.bloock_CResult_c_char)((unsafe.Pointer)(res)))
	if err != nil {
		if resultPtr != nil {
			panic("Internal error: both result and error pointers are not null")
		}
		return "", getError(err)
	}
	result := fromCString(resultPtr)
	return *result, nil
}

func checkResultInt(res *C.bloock_CResult_i64) (int64, error) {
	err := res.error
	resultPtr := res.result
	// it's fine to cast this pointer to result c_void, since Rust won't
	// do anything with inner pointers anyway
	defer C.result_int_free((*C.bloock_CResult_i64)((unsafe.Pointer)(res)))
	if err != nil {
		if resultPtr != nil {
			panic("Internal error: both result and error pointers are not null")
		}
		return 0, getError(err)
	}
	result := fromCInt64(resultPtr)
	return *result, nil
}

func checkResultBool(res *C.bloock_CResult_i64) (bool, error) {
	err := res.error
	resultPtr := res.result
	// it's fine to cast this pointer to result c_void, since Rust won't
	// do anything with inner pointers anyway
	defer C.result_int_free((*C.bloock_CResult_i64)((unsafe.Pointer)(res)))
	if err != nil {
		if resultPtr != nil {
			panic("Internal error: both result and error pointers are not null")
		}
		return false, getError(err)
	}
	result := fromCInt64(resultPtr)
	if *result == 0 {
		return false, nil
	}
	return true, nil
}

func checkResultRecord(res *C.bloock_CResult_Record) (*C.bloock_Record, error) {
	err := res.error
	resultPtr := res.result
	// it's fine to cast this pointer to result c_void, since Rust won't
	// do anything with inner pointers anyway
	defer C.result_record_free((*C.bloock_CResult_Record)((unsafe.Pointer)(res)))
	if err != nil {
		if resultPtr != nil {
			panic("Internal error: both result and error pointers are not null")
		}
		return nil, getError(err)
	}
	return resultPtr, nil
}

func getError(err *C.char) error {
	errStr := *fromCString(err)
	var polarError errors.BloockError
	jsonErr := json.Unmarshal([]byte(errStr), &polarError)
	if jsonErr != nil {
		return jsonErr
	}
	return &polarError
}
