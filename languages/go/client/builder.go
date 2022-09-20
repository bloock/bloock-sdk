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
	payloadType PayloadType
	signer      *proto.Signer
	encrypter   *proto.Encrypter
}

type PayloadType string

type PayloadTypes struct {
	String PayloadType
	Hex    PayloadType
	Json   PayloadType
	Bytes  PayloadType
	File   PayloadType
}

func GetPayloadTypes() PayloadTypes {
	return PayloadTypes{
		String: "string",
		Hex:    "hex",
		Json:   "json",
		Bytes:  "bytes",
		File:   "file",
	}
}

func NewRecordBuilder(payload []byte, payloadType PayloadType) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString(payload),
		payloadType: payloadType,
	}
}

func (b RecordBuilder) WithSigner(signer *entity.Signer) RecordBuilder {
	b.signer = signer.ToProto()
	return b
}

func (b RecordBuilder) WithEncrypter(encrypter *entity.Encrypter) RecordBuilder {
	b.encrypter = encrypter.ToProto()
	return b
}

func (b RecordBuilder) Build() (entity.Record, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().BuildRecord(context.Background(), &proto.RecordBuilderRequest{
		Payload:   b.payload,
		Type:      string(b.payloadType),
		Signer:    &proto.Signer{},
		Encrypter: &proto.Encrypter{},
	})

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
		payload:     base64.RawStdEncoding.EncodeToString(payload),
		payloadType: GetPayloadTypes().Bytes,
	}, nil
}

func NewRecordBuilderFromString(str string) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString([]byte(str)),
		payloadType: GetPayloadTypes().String,
	}
}

func NewRecordBuilderFromHex(hex string) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString([]byte(hex)),
		payloadType: GetPayloadTypes().Hex,
	}
}

func NewRecordBuilderFromJSON(json string) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString([]byte(json)),
		payloadType: GetPayloadTypes().Json,
	}
}

func NewRecordBuilderFromFile(file_bytes []byte) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString(file_bytes),
		payloadType: GetPayloadTypes().Bytes,
	}
}

func NewRecordBuilderFromBytes(bytes []byte) RecordBuilder {
	return RecordBuilder{
		payload:     base64.RawStdEncoding.EncodeToString(bytes),
		payloadType: GetPayloadTypes().Bytes,
	}
}
