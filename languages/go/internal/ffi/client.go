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
	"unsafe"

	"github.com/bloock/go-bloock/types"
)

type ClientFfi struct {
	ptr *C.bloock_BloockClient
}

func NewClientFfi(apiKey string) ClientFfi {
	bloockPtr := C.client_new(toCString(apiKey))
	return ClientFfi{
		ptr: bloockPtr,
	}
}

func (p *ClientFfi) SetApiHost(host string) {
	C.client_set_api_host(p.ptr, toCString(host))
}

func (p *ClientFfi) SetNetworkConfiguration(network types.Network, configuration types.NetworkConfiguration) error {
	json, err := ffiSerialize(configuration)
	defer C.free(unsafe.Pointer(json))
	if err != nil {
		return err
	}

	result := C.client_set_network_configuration(p.ptr, toCString(string(network)), json)
	return checkResultVoid(result)
}

func (p *ClientFfi) SendRecords(records []*RecordFfi) ([]types.RecordReceipt, error) {

	json, err := checkResultString(C.client_send_records(p.ptr, toCRecordList(records)))
	if err != nil {
		return []types.RecordReceipt{}, err
	}

	var result []types.RecordReceipt
	err = ffiDeserialize(json, &result)
	if err != nil {
		return []types.RecordReceipt{}, err
	}

	return result, nil
}

/* func (p *ClientFfi) GetRecords(records []*RecordFfi) ([]types.RecordReceipt, error) {
	json, err := checkResultString(C.client_get_records(p.ptr, toCRecordList(records)))
	if err != nil {
		return []types.RecordReceipt{}, err
	}

	var result []types.RecordReceipt
	err = ffiDeserialize(json, &result)
	if err != nil {
		return []types.RecordReceipt{}, err
	}

	return result, nil
} */

func (p *ClientFfi) GetAnchor(anchor int64) (types.Anchor, error) {
	json, err := checkResultString(C.client_get_anchor(p.ptr, toCInt64(anchor)))
	if err != nil {
		return types.Anchor{}, err
	}

	var result types.Anchor
	err = ffiDeserialize(json, &result)
	if err != nil {
		return types.Anchor{}, err
	}

	return result, nil
}

func (p *ClientFfi) WaitAnchor(anchor int64, timeout int64) (types.Anchor, error) {
	json, err := checkResultString(C.client_wait_anchor(p.ptr, toCInt64(anchor), toCInt64(timeout)))
	if err != nil {
		return types.Anchor{}, err
	}

	var result types.Anchor
	err = ffiDeserialize(json, &result)
	if err != nil {
		return types.Anchor{}, err
	}

	return result, nil
}

// func (p *ClientFfi) GetProof(records []*RecordFfi) (types.Proof, error) {
// 	json, err := checkResultString(C.client_get_proof(p.ptr, toCRecordList(records)))
// 	if err != nil {
// 		return types.Proof{}, err
// 	}

// 	var result types.Proof
// 	err = ffiDeserialize(json, &result)
// 	if err != nil {
// 		return types.Proof{}, err
// 	}

// 	return result, nil
// }

// func (p *ClientFfi) VerifyRoot(root *RecordFfi, network types.Network) (int64, error) {
// 	return checkResultInt(C.client_verify_root(p.ptr, root.ptr, toCString(string(network))))
// }

// func (p *ClientFfi) VerifyProof(proof types.Proof) (*RecordFfi, error) {
// 	json, err := ffiSerialize(proof)
// 	if err != nil {
// 		return nil, err
// 	}

// 	result, err := checkResultRecord(C.client_verify_proof(p.ptr, json))
// 	if err != nil {
// 		return nil, err
// 	}

// 	return newRecordFfi(result)
// }

// func (p *ClientFfi) VerifyRecords(records []*RecordFfi) (int64, error) {
// 	return checkResultInt(C.client_verify_records(p.ptr, toCRecordList(records)))
// }

// func (p *ClientFfi) VerifySignatures(records []*RecordFfi) (bool, error) {
// 	return checkResultBool(C.client_verify_records(p.ptr, toCRecordList(records)))
// }

func (p *ClientFfi) delete() {
	C.client_free(p.ptr)
	p = nil
}
