package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

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
