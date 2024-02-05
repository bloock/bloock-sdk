package record

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// Record represents a record with payload, hash, and configuration data.
type Record struct {
	Payload    []byte
	hash       string
	configData *proto.ConfigData
}

func NewRecordFromProto(r *proto.Record, configData *proto.ConfigData) Record {
	if r == nil {
		return Record{}
	}

	return Record{
		Payload:    r.Payload,
		hash:       r.Hash,
		configData: configData,
	}
}

func (r *Record) ToProto() *proto.Record {
	return &proto.Record{
		ConfigData: r.configData,
		Payload:    r.Payload,
		Hash:       r.hash,
	}
}

// GetHash retrieves the hash of the record.
func (r *Record) GetHash() (string, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().GetHash(context.Background(), &proto.GetHashRequest{ConfigData: r.configData, Record: r.ToProto()})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.Hash, nil
}

// GetPayload retrieves the payload of the record.
func (r *Record) GetPayload() ([]byte, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().GetPayload(context.Background(), &proto.GetPayloadRequest{ConfigData: r.configData, Record: r.ToProto()})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Payload, nil
}

// Retrieve returns the payload of the record.
func (r *Record) Retrieve() []byte {
	return r.Payload
}

// SetProof sets the proof for a record.
func (r *Record) SetProof(proof integrity.Proof) error {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().SetProof(context.Background(), &proto.SetProofRequest{
		ConfigData: r.configData,
		Record:     r.ToProto(),
		Proof:      proof.ToProto(),
	})

	if err != nil {
		return err
	}

	if res.Error != nil {
		return errors.New(res.Error.Message)
	}

	r.Payload = res.Record.Payload

	return nil
}

func MapRecordsToProto(records []Record) []*proto.Record {
	recordsProto := make([]*proto.Record, len(records))
	for i, record := range records {
		recordsProto[i] = record.ToProto()
	}
	return recordsProto
}
