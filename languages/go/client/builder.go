package bloock

import (
	"context"
	"encoding/base64"
	"encoding/json"
	"errors"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)

type Builder struct {
	payload     string
	payloadType string
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

func NewBuilder(payload []byte, payloadType PayloadType) Builder {
	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString(payload),
		payloadType: string(payloadType),
	}
}

func (b Builder) WithSigner(signer *proto.Signer) Builder {
	b.signer = signer
	return b
}

func (b Builder) WithEncrypter(encrypter *proto.Encrypter) Builder {
	b.encrypter = encrypter
	return b
}

func (b Builder) Build() (*proto.Record, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().BuildRecord(context.Background(), &proto.RecordBuilderRequest{
		Payload:   b.payload,
		Type:      b.payloadType,
		Signer:    &proto.Signer{},
		Encrypter: &proto.Encrypter{},
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Record, nil
}

func NewBuilderFromRecord(record *Record) (Builder, error) {
	payload, err := json.Marshal(record)
	if err != nil {
		return Builder{}, err
	}

	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString(payload),
		payloadType: string(GetPayloadTypes().Bytes),
	}, nil
}

func NewBuilderFromString(str string) Builder {
	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString([]byte(str)),
		payloadType: string(GetPayloadTypes().String),
	}
}

func NewBuilderFromHex(hex string) Builder {
	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString([]byte(hex)),
		payloadType: string(GetPayloadTypes().Hex),
	}
}

func NewBuilderFromJSON(json string) Builder {
	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString([]byte(json)),
		payloadType: string(GetPayloadTypes().Json),
	}
}

func NewBuilderFromFile(file_bytes []byte) Builder {
	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString(file_bytes),
		payloadType: string(GetPayloadTypes().Bytes),
	}
}

func NewBuilderFromBytes(bytes []byte) Builder {
	return Builder{
		payload:     base64.RawStdEncoding.EncodeToString(bytes),
		payloadType: string(GetPayloadTypes().Bytes),
	}
}
