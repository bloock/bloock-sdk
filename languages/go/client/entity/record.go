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
	hash    string
}

func NewRecordFromProto(r *proto.Record) Record {
	if r == nil {
		return Record{}
	}

	return Record{
		Payload: r.Payload,
		hash:    r.Hash,
	}
}

func (r *Record) ToProto() *proto.Record {
	return &proto.Record{
		ConfigData: config.NewConfigData(),
		Payload:    r.Payload,
		Hash:       r.hash,
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

func (r *Record) GetEncryptionAlg() (EncryptionAlg, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Record().GetEncryptionAlg(context.Background(), r.ToProto())

	if err != nil {
		return UNRECOGNIZED_ENCRYPTION_ALG, err
	}

	if res.Error != nil {
		return UNRECOGNIZED_ENCRYPTION_ALG, errors.New(res.Error.Message)
	}

	return EncryptionAlgFromProto[res.Alg], nil
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
