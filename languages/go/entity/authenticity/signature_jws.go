package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type SignatureJws struct {
	Signature   string
	Protected   string
	Header      SignatureHeaderJws
	MessageHash string
}

func NewSignatureJwsFromProto(s *proto.SignatureJWS) SignatureJws {
	if s == nil {
		return SignatureJws{}
	}
	return SignatureJws{
		Signature:   s.Signature,
		Protected:   s.Protected,
		Header:      NewSignatureHeaderJwsFromProto(s.Header),
		MessageHash: s.MessageHash,
	}
}

func (s *SignatureJws) GetAlg() SignatureAlg {
	if alg, ok := SignatureAlgFromProto[s.Header.Alg]; ok {
		return alg
	}
	return UNRECOGNIZED_SIGNATURE_ALG
}

func (s SignatureJws) ToProto() *proto.SignatureJWS {
	return &proto.SignatureJWS{
		Signature:   s.Signature,
		Protected:   s.Protected,
		Header:      s.Header.ToProto(),
		MessageHash: s.MessageHash,
	}
}
