package ffi

// #cgo CFLAGS: -g -Wall
// #include <stdint.h>
// #include <stdlib.h>
// #include "native/bloock_bridge.h"
// #cgo linux,amd64 LDFLAGS: ${SRCDIR}/native/x86_64-unknown-linux-musl/libbloock_bridge.a -ldl -lm
// #cgo windows,amd64 LDFLAGS: ${SRCDIR}/native/x86_64-pc-windows-gnu/libbloock_bridge_windows.a -lm -lws2_32 -luserenv -lbcrypt
// #cgo darwin,amd64 LDFLAGS: ${SRCDIR}/native/x86_64-apple-darwin/libbloock_bridge.a -ldl -lm -framework Security
// #cgo darwin,arm64 LDFLAGS: ${SRCDIR}/native/aarch64-apple-darwin/libbloock_bridge.a -ldl -lm -framework Security
import "C"
import (
	"encoding/base64"
)

func Request(requestType string, payload []byte) ([]byte, error) {
	payloadStr := base64.StdEncoding.EncodeToString(payload)

	r := C.request(C.CString(requestType), C.CString(payloadStr))

	encodedResponse := C.GoString(r)
	return base64.StdEncoding.DecodeString(encodedResponse)
}
