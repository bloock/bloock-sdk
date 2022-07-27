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

func fromCString(cStr *C.char) *string {
	if cStr == nil {
		return nil
	}
	goStr := C.GoString(cStr)
	C.string_free(cStr)
	return &goStr
}

func toCString(str string) *C.char {
	return C.CString(str)
}
