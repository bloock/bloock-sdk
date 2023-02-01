package entity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type SignatureAlg int32

const (
	ECDSA                      SignatureAlg = iota
	UNRECOGNIZED_SIGNATURE_ALG SignatureAlg = -1
)

var (
	SignatureAlgFromProto = map[string]SignatureAlg{
		"ES256K": ECDSA,
	}
)

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

func (s *Signature) GetAlg() SignatureAlg {
	if alg, ok := SignatureAlgFromProto[s.Header.Alg]; ok {
		return alg
	}
	return UNRECOGNIZED_SIGNATURE_ALG
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
