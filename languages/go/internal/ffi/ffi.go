package ffi

// #cgo CFLAGS: -g -Wall
// #include <stdint.h>
// #include <stdlib.h>
// #include "native/bloock_bridge.h"
// #cgo linux,amd64 LDFLAGS: ${SRCDIR}/native/x86_64_unknown_linux_musl/libbloock_bridge.a -ldl -lm -lpthread
// #cgo windows,amd64 LDFLAGS: ${SRCDIR}/native/x86_64_pc_windows_gnu/libbloock_bridge_windows.a -lm -lws2_32 -luserenv -lbcrypt
// #cgo darwin,amd64 LDFLAGS: ${SRCDIR}/native/x86_64_apple_darwin/libbloock_bridge.a -ldl -lm -framework Security
// #cgo darwin,arm64 LDFLAGS: ${SRCDIR}/native/aarch64_apple_darwin/libbloock_bridge.a -ldl -lm -framework Security
import "C"
import (
	"encoding/base64"

	_ "github.com/bloock/bloock-sdk-go/v2/internal/ffi/native"
)

func Request(requestType string, payload []byte) ([]byte, error) {
	payloadStr := base64.StdEncoding.EncodeToString(payload)

	r := C.request(C.CString(requestType), C.CString(payloadStr))

	encodedResponse := C.GoString(r)
	return base64.StdEncoding.DecodeString(encodedResponse)
}
