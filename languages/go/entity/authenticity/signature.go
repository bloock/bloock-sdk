package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type Signature struct {
	Signature   string
	Protected   string
	Header      SignatureHeader
	MessageHash string
}

func NewSignatureFromProto(s *proto.Signature) Signature {
	if s == nil {
		return Signature{}
	}
	return Signature{
		Signature:   s.Signature,
		Protected:   s.Protected,
		Header:      NewSignatureHeaderFromProto(s.Header),
		MessageHash: s.MessageHash,
	}
}

func (s *Signature) GetAlg() SignatureAlg {
	if alg, ok := SignatureAlgFromProto[s.Header.Alg]; ok {
		return alg
	}
	return UNRECOGNIZED_SIGNATURE_ALG
}

func (s Signature) ToProto() *proto.Signature {
	return &proto.Signature{
		Signature:   s.Signature,
		Protected:   s.Protected,
		Header:      s.Header.ToProto(),
		MessageHash: s.MessageHash,
	}
}
