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
import "unsafe"

type RecordFfi struct {
	ptr *C.bloock_Record
}

func newRecordFfiFromResult(s *C.bloock_CResult_Record) (*RecordFfi, error) {
	res, err := checkResultRecord(s)
	if err != nil {
		return nil, err
	}
	return &RecordFfi{
		ptr: res,
	}, nil
}

func newRecordFfi(s *C.bloock_Record) (*RecordFfi, error) {
	return &RecordFfi{
		ptr: s,
	}, nil
}

func NewRecordFromHash(hash string) (*RecordFfi, error) {
	return newRecordFfiFromResult(C.record_from_hash(toCString(hash)))
}

func NewRecordFromHex(hex string) (*RecordFfi, error) {
	return newRecordFfiFromResult(C.record_from_hex(toCString(hex)))
}

func NewRecordFromString(str string) (*RecordFfi, error) {
	return newRecordFfiFromResult(C.record_from_string(toCString(str)))
}

func (r *RecordFfi) GetHash() (string, error) {
	return checkResultString(C.record_get_hash(r.ptr))
}

func (p *RecordFfi) delete() {
	C.record_free(p.ptr)
	p = nil
}

type RecordListFfi struct {
	data *RecordFfi
	len  uint
}

func toCRecordList(records []*RecordFfi) *C.bloock_RecordList {
	return C.new_record_list((*C.bloock_Record)(unsafe.Pointer(records[0])), C.uintptr_t(len(records)))
}
