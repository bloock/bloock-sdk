package ffi

// #cgo CFLAGS: -g -Wall
// #include <stdint.h>
// #include <stdlib.h>
// #include "native/BloockBridge.h"
// #cgo linux,amd64 LDFLAGS: ${SRCDIR}/native/linux/lib.a -ldl -lm
// #cgo darwin,amd64 LDFLAGS: ${SRCDIR}/native/macos/amd64/libbloock_bridge.a -ldl -lm -framework Security
// #cgo darwin,arm64 LDFLAGS: ${SRCDIR}/native/macos/arm64/lib.a -ldl -lm -framework Security
// #cgo windows,amd64 LDFLAGS: ${SRCDIR}/native/windows/lib.a -lm -lws2_32 -luserenv -lbcrypt
import "C"
import (
	"fmt"
)

func Request(requestType string, payload []byte) (string, error) {
	payloadStr := string(payload)

	w := C.malloc(1024)
	defer C.free(w)
	writer := C.diplomat_simple_writeable((*C.char)(w), 1024)
	r := C.BloockBridge_request(C.CString(requestType), C.ulong(len(requestType)), C.CString(payloadStr), C.ulong(len(payload)), &writer)
	if !bool(r.is_ok) {
		return "", fmt.Errorf("an error occurred while running request")
	}
	return C.GoString((*C.char)(w)), nil
}
