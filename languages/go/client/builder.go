package bloock

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"

	"github.com/bloock/go-bridge/client/entity"
	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)

type RecordBuilder struct {
	payload     string
	payloadType proto.RecordTypes
	signer      *proto.Signer
	encrypter   *proto.Encrypter
}

type PayloadType int

const (
	String PayloadType = iota
	Hex
	Json
	Bytes
	File
)

func (b RecordBuilder) WithSigner(signer entity.Signer) RecordBuilder {
	b.signer = signer.ToProto()
	return b
}

func (b RecordBuilder) WithEncrypter(encrypter entity.Encrypter) RecordBuilder {
	b.encrypter = encrypter.ToProto()
	return b
}

func (b RecordBuilder) Build() (entity.Record, error) {
	bridgeClient := bridge.NewBloockBridge()

	var res *proto.RecordBuilderResponse
	var err error

	switch b.payloadType {
	case proto.RecordTypes_STRING:
	case proto.RecordTypes_BYTES:
	case proto.RecordTypes_FILE:
	case proto.RecordTypes_JSON:
	case proto.RecordTypes_HEX:
		// TODO BuildRecordFrom... All types
		res, err = bridgeClient.Record().BuildRecord(context.Background(), &proto.RecordBuilderRequest{
			Payload:   b.payload,
			Type:      "",
			Signer:    &proto.Signer{},
			Encrypter: &proto.Encrypter{},
		})
	}

	if err != nil {
		return entity.Record{}, err
	}

	if res.Error != nil {
		return entity.Record{}, errors.New(res.Error.Message)
	}

	return entity.NewRecordFromProto(res.Record), nil
}

func NewRecordBuilderFromRecord(record entity.Record) (RecordBuilder, error) {
	payload, err := json.Marshal(record)
	if err != nil {
		return RecordBuilder{}, err
	}

	return RecordBuilder{
		payload:     string(payload),
		payloadType: proto.RecordTypes_BYTES,
	}, nil
}

func NewRecordBuilderFromString(str string) RecordBuilder {
	return RecordBuilder{
		payload:     str,
		payloadType: proto.RecordTypes_STRING,
	}
}

func NewRecordBuilderFromHex(hex string) RecordBuilder {
	return RecordBuilder{
		payload:     hex,
		payloadType: proto.RecordTypes_HEX,
	}
}

func NewRecordBuilderFromJSON(json string) RecordBuilder {
	return RecordBuilder{
		payload:     json,
		payloadType: proto.RecordTypes_JSON,
	}
}

func NewRecordBuilderFromFile(file_bytes []byte) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString(file_bytes),
		payloadType: proto.RecordTypes_RECORD,
	}
}

func NewRecordBuilderFromBytes(bytes []byte) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString(bytes),
		payloadType: proto.RecordTypes_BYTES,
	}
}
