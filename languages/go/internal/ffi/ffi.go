package ffi

// #cgo CFLAGS: -g -Wall
// #include <stdint.h>
// #include <stdlib.h>
// #include "native/bloock_bridge.h"
// #cgo linux,386 LDFLAGS: ${SRCDIR}/native/i686-unknown-linux-gnu/libbloock_bridge.a -ldl -lm
// #cgo linux,amd64 LDFLAGS: ${SRCDIR}/native/x86_64-unknown-linux-gnu/libbloock_bridge.a -ldl -lm
// #cgo linux,arm64 LDFLAGS: ${SRCDIR}/native/aarch64-unknown-linux-gnu/libbloock_bridge.a -ldl -lm
// #cgo windows,386 LDFLAGS: ${SRCDIR}/native/i686-pc-windows-gnu/libbloock_bridge.a -lm
// #cgo windows,amd64 LDFLAGS: ${SRCDIR}/native/x86_64-pc-windows-gnu/libbloock_bridge.a -lm
// #cgo darwin,amd64 LDFLAGS: ${SRCDIR}/native/x86_64-apple-darwin/libbloock_bridge.a -ldl -lm -framework Security
// #cgo darwin,arm64 LDFLAGS: ${SRCDIR}/native/aarch64-apple-darwin/libbloock_bridge.a -ldl -lm -framework Security
import "C"
import (
	"encoding/base64"
	"fmt"
)

func Request(requestType string, payload []byte) ([]byte, error) {
    fmt.Println("payload: ", payload)
	payloadStr := base64.StdEncoding.EncodeToString(payload)
    fmt.Println("payloadStr: ", payloadStr)

	r := C.request(C.CString(requestType), C.CString(payloadStr))

	encodedResponse := C.GoString(r)
    fmt.Println("encodedResponse: ", encodedResponse)
	return base64.StdEncoding.DecodeString(encodedResponse)
}
