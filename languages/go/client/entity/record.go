package entity

import (
	"context"
	"errors"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)

type Record struct {
	Headers    RecordHeader
	Payload    []byte
	Signatures []Signature
	Encryption Encryption
	Proof      Proof
}

func NewRecordFromProto(r *proto.Record) Record {
	signatures := make([]Signature, len(r.Signatures))
	for i, signature := range r.Signatures {
		signatures[i] = NewSignatureFromProto(signature)
	}

	return Record{
		Headers:    NewRecordHeaderFromProto(r.Headers),
		Payload:    r.Payload,
		Signatures: signatures,
		Encryption: NewEncryptionFromProto(r.Encryption),
		Proof:      NewProofFromProto(r.Proof),
	}
}

func (r Record) ToProto() *proto.Record {
	signatures := make([]*proto.Signature, len(r.Signatures))
	for i, signature := range signatures {
		signatures[i] = signature
	}

	return &proto.Record{
		Headers:    r.Headers.ToProto(),
		Payload:    r.Payload,
		Signatures: signatures,
		Encryption: r.Encryption.ToProto(),
		Proof:      r.Proof.ToProto(),
	}
}

func (r Record) GetHash() (string, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().GetHash(context.Background(), r.ToProto())

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.Hash, nil
}

func MapRecordsToProto(records []Record) []*proto.Record {
	recordsProto := make([]*proto.Record, len(records))
	for i, record := range records {
		recordsProto[i] = record.ToProto()
	}
	return recordsProto
}

type RecordHeader struct {
	Ty string
}

func NewRecordHeaderFromProto(r *proto.RecordHeader) RecordHeader {
	return RecordHeader{
		Ty: r.Ty,
	}
}

func (rh RecordHeader) ToProto() *proto.RecordHeader {
	return &proto.RecordHeader{
		Ty: rh.Ty,
	}
}

type Signature struct {
	Signature string
	Protected string
	Header    SignatureHeader
}

func NewSignatureFromProto(s *proto.Signature) Signature {
	return Signature{
		Signature: s.Signature,
		Protected: s.Protected,
		Header:    NewSignatureHeaderFromProto(s.Header),
	}
}

func (s Signature) ToProto() *proto.Signature {
	return &proto.Signature{
		Signature: s.Signature,
		Protected: s.Protected,
		Header:    s.Header.ToProto(),
	}
}

type SignatureHeader struct {
	Alg string
	Kid string
}

func NewSignatureHeaderFromProto(s *proto.SignatureHeader) SignatureHeader {
	return SignatureHeader{
		Alg: s.Alg,
		Kid: s.Kid,
	}
}

func (s SignatureHeader) ToProto() *proto.SignatureHeader {
	return &proto.SignatureHeader{
		Alg: s.Alg,
		Kid: s.Kid,
	}
}

type Encryption struct {
	Header    EncryptionHeader
	Protected string
}

func NewEncryptionFromProto(e *proto.Encryption) Encryption {
	return Encryption{
		Header:    NewEncryptionHeaderFromProto(e.Header),
		Protected: e.Protected,
	}
}

func (e Encryption) ToProto() *proto.Encryption {
	return &proto.Encryption{
		Header:    e.Header.ToProto(),
		Protected: e.Protected,
	}
}

type EncryptionHeader struct {
	Alg string
}

func NewEncryptionHeaderFromProto(e *proto.EncryptionHeader) EncryptionHeader {
	return EncryptionHeader{
		Alg: e.Alg,
	}
}

func (e EncryptionHeader) ToProto() *proto.EncryptionHeader {
	return &proto.EncryptionHeader{
		Alg: e.Alg,
	}
}

type RecordReceipt struct {
	Anchor int64
	Client string
	Record string
	Status string
}

func NewRecordReceiptFromProto(r *proto.RecordReceipt) RecordReceipt {
	return RecordReceipt{
		Anchor: r.Anchor,
		Client: r.Client,
		Record: r.Record,
		Status: r.Status,
	}
}
