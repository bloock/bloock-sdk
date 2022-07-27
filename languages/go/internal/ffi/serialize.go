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
import "encoding/json"

func ffiSerialize(input interface{}) (*C.char, error) {
	json, err := json.Marshal(input)
	if err != nil {
		return nil, err
	}
	return C.CString(string(json)), nil
}

func ffiDeserialize(str string, input interface{}) error {
	return json.Unmarshal([]byte(str), &input)
}
