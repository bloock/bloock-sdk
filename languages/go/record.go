package bloock

import (
	"log"

	"github.com/bloock/go-bloock/internal/ffi"
)

type Record struct {
	ffi *ffi.RecordFfi
}

func newRecord(f *ffi.RecordFfi) *Record {
	return &Record{
		ffi: f,
	}
}

func NewRecordFromHash(hash string) (*Record, error) {
	res, err := ffi.NewRecordFromHash(hash)
	if err != nil {
		return nil, err
	}
	return newRecord(res), nil
}

func NewRecordFromHex(hex string) (*Record, error) {
	res, err := ffi.NewRecordFromHex(hex)
	if err != nil {
		return nil, err
	}
	return newRecord(res), nil
}

func NewRecordFromString(str string) (*Record, error) {
	res, err := ffi.NewRecordFromString(str)
	if err != nil {
		return nil, err
	}
	return newRecord(res), nil
}

func (r *Record) GetHash() string {
	hash, err := r.ffi.GetHash()
	if err != nil {
		log.Printf("error retrieving record hash: %s", err.Error())
	}
	return hash
}
