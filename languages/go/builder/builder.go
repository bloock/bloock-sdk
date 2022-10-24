package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/client/entity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type RecordBuilder struct {
	payload     interface{}
	payloadType proto.RecordTypes
	signer      *proto.Signer
	encrypter   *proto.Encrypter
	decrypter   *proto.Decrypter
}

func (b RecordBuilder) WithSigner(signer entity.Signer) RecordBuilder {
	b.signer = signer.ToProto()
	return b
}

func (b RecordBuilder) WithEncrypter(encrypter entity.Encrypter) RecordBuilder {
	b.encrypter = encrypter.ToProto()
	return b
}

func (b RecordBuilder) WithDecrypter(decrypter entity.Decrypter) RecordBuilder {
	b.decrypter = decrypter.ToProto()
	return b
}

func (b RecordBuilder) Build() (entity.Record, error) {
	bridgeClient := bridge.NewBloockBridge()

	var res *proto.RecordBuilderResponse
	var err error

	switch b.payloadType {
	case proto.RecordTypes_STRING:
		res, err = bridgeClient.Record().BuildRecordFromString(context.Background(), &proto.RecordBuilderFromStringRequest{
			Payload:   b.payload.(string),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
		})
	case proto.RecordTypes_BYTES:
		res, err = bridgeClient.Record().BuildRecordFromBytes(context.Background(), &proto.RecordBuilderFromBytesRequest{
			Payload:   b.payload.([]byte),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
		})
	case proto.RecordTypes_FILE:
		res, err = bridgeClient.Record().BuildRecordFromFile(context.Background(), &proto.RecordBuilderFromFileRequest{
			Payload:   b.payload.([]byte),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
		})
	case proto.RecordTypes_JSON:
		res, err = bridgeClient.Record().BuildRecordFromJson(context.Background(), &proto.RecordBuilderFromJSONRequest{
			Payload:   b.payload.(string),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
		})
	case proto.RecordTypes_HEX:
		res, err = bridgeClient.Record().BuildRecordFromHex(context.Background(), &proto.RecordBuilderFromHexRequest{
			Payload:   b.payload.(string),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
		})
	case proto.RecordTypes_RECORD:
		res, err = bridgeClient.Record().BuildRecordFromRecord(context.Background(), &proto.RecordBuilderFromRecordRequest{
			Payload:   b.payload.(*proto.Record),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
		})
	case proto.RecordTypes_RAW:
		res, err = bridgeClient.Record().BuildRecordFromRaw(context.Background(), &proto.RecordBuilderFromRawRequest{
			Payload:   b.payload.(string),
			Signer:    b.signer,
			Encrypter: b.encrypter,
			Decrypter: b.decrypter,
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

func NewRecordBuilderFromRecord(record entity.Record) RecordBuilder {
	return RecordBuilder{
		payload:     record.ToProto(),
		payloadType: proto.RecordTypes_RECORD,
	}
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
		payload:     file_bytes,
		payloadType: proto.RecordTypes_FILE,
	}
}

func NewRecordBuilderFromBytes(bytes []byte) RecordBuilder {
	return RecordBuilder{
		payload:     bytes,
		payloadType: proto.RecordTypes_BYTES,
	}
}

func NewRecordBuilderFromRaw(raw string) RecordBuilder {
	return RecordBuilder{
		payload:     raw,
		payloadType: proto.RecordTypes_RAW,
	}
}
