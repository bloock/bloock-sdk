package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type Signature struct {
	Signature   string
	Alg         string
	Kid         string
	MessageHash string
	Subject     *string
}

func NewSignatureFromProto(s *proto.Signature) Signature {
	if s == nil {
		return Signature{}
	}
	return Signature{
		Signature:   s.Signature,
		Alg:         s.Alg,
		Kid:         s.Kid,
		MessageHash: s.MessageHash,
		Subject:     s.Subject,
	}
}

func (s *Signature) GetAlg() SignatureAlg {
	if alg, ok := SignatureAlgFromProto[s.Alg]; ok {
		return alg
	}
	return UNRECOGNIZED_SIGNATURE_ALG
}

func (s Signature) ToProto() *proto.Signature {
	return &proto.Signature{
		Signature:   s.Signature,
		Alg:         s.Alg,
		Kid:         s.Kid,
		MessageHash: s.MessageHash,
		Subject:     s.Subject,
	}
}
