package ffi

// #cgo CFLAGS: -g -Wall
// #include <stdint.h>
// #include <stdlib.h>
// #include "native/BloockBridge.h"
// #cgo linux,amd64 LDFLAGS: ${SRCDIR}/native/linux/libbloock_bridge.a -ldl -lm
// #cgo darwin,amd64 LDFLAGS: ${SRCDIR}/native/macos/amd64/libbloock_bridge.a -ldl -lm -framework Security
// #cgo darwin,arm64 LDFLAGS: ${SRCDIR}/native/macos/arm64/lib.a -ldl -lm -framework Security
// #cgo windows,amd64 LDFLAGS: ${SRCDIR}/native/windows/lib.a -lm -lws2_32 -luserenv -lbcrypt
import "C"
import (
	"encoding/base64"
	"fmt"
)

func Request(requestType string, payload []byte) ([]byte, error) {
	payloadStr := base64.StdEncoding.EncodeToString(payload)

	w := C.malloc(2048)
	defer C.free(w)
	writer := C.diplomat_simple_writeable((*C.char)(w), 2048)
	r := C.BloockBridge_request(C.CString(requestType), C.ulong(len(requestType)), C.CString(payloadStr), C.ulong(len(payloadStr)), &writer)
	if !bool(r.is_ok) {
		return []byte{}, fmt.Errorf("an error occurred while running request")
	}
	encodedResponse := C.GoString((*C.char)(w))
	return base64.StdEncoding.DecodeString(encodedResponse)
}
