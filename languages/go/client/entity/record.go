package entity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type Record struct {
	Payload []byte
}

func NewRecordFromProto(r *proto.Record) Record {
	if r == nil {
		return Record{}
	}

	return Record{
		Payload: r.Payload,
	}
}

func (r *Record) ToProto() *proto.Record {
	return &proto.Record{
		ConfigData: config.NewConfigData(),
		Payload:    r.Payload,
	}
}

func (r *Record) GetHash() (string, error) {
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

func (r *Record) GetSignatures() ([]Signature, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().GetSignatures(context.Background(), r.ToProto())

	if err != nil {
		return []Signature{}, err
	}

	if res.Error != nil {
		return []Signature{}, errors.New(res.Error.Message)
	}

	signatures := make([]Signature, len(res.Signatures))
	for i, signature := range res.Signatures {
		signatures[i] = NewSignatureFromProto(signature)
	}
	return signatures, nil
}

func (r *Record) Publish(p Publisher) (string, error) {
	bridgeClient := bridge.NewBloockBridge()
	req := proto.PublishRequest{
		ConfigData: config.NewConfigData(),
		Publisher:  p.ToProto(),
		Record:     r.ToProto(),
	}
	res, err := bridgeClient.Record().Publish(context.Background(), &req)

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.Hash, nil
}

func (r *Record) Retrieve() []byte {
	return r.Payload
}

func (r *Record) SetProof(proof Proof) error {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Proof().SetProof(context.Background(), &proto.SetProofRequest{
		ConfigData: config.NewConfigData(),
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

type RecordHeader struct {
	Ty string
}

func NewRecordHeaderFromProto(r *proto.RecordHeader) RecordHeader {
	if r == nil {
		return RecordHeader{}
	}
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
	if s == nil {
		return Signature{}
	}
	return Signature{
		Signature: s.Signature,
		Protected: s.Protected,
		Header:    NewSignatureHeaderFromProto(s.Header),
	}
}

func (s *Signature) GetCommonName() (string, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().GetSignatureCommonName(context.Background(), &proto.SignatureCommonNameRequest{
		ConfigData: config.NewConfigData(),
		Signature:  s.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.CommonName, nil
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
	if s == nil {
		return SignatureHeader{}
	}
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

type RecordReceipt struct {
	Anchor int64
	Client string
	Record string
	Status string
}

func NewRecordReceiptFromProto(r *proto.RecordReceipt) RecordReceipt {
	if r == nil {
		return RecordReceipt{}
	}
	return RecordReceipt{
		Anchor: r.Anchor,
		Client: r.Client,
		Record: r.Record,
		Status: r.Status,
	}
}

type KeyPair struct {
	PublicKey  string
	PrivateKey string
}

func NewKeysFromProto(k *proto.GenerateKeysResponse) KeyPair {
	if k == nil {
		return KeyPair{}
	}
	return KeyPair{
		PublicKey:  k.PublicKey,
		PrivateKey: k.PrivateKey,
	}
}

func NewRsaKeyPairFromProto(k *proto.GenerateRsaKeyPairResponse) KeyPair {
	if k == nil {
		return KeyPair{}
	}
	return KeyPair{
		PublicKey:  k.PublicKey,
		PrivateKey: k.PrivateKey,
	}
}

func NewEciesKeyPairFromProto(k *proto.GenerateEciesKeyPairResponse) KeyPair {
	if k == nil {
		return KeyPair{}
	}
	return KeyPair{
		PublicKey:  k.PublicKey,
		PrivateKey: k.PrivateKey,
	}
}
