package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// SignatureHeaderJws represents the header of a JSON Web Signature (JWS). [RFC 7515].
//
// [RFC 7515]: https://datatracker.ietf.org/doc/html/rfc7515
type SignatureHeaderJws struct {
	Alg string
	Kid string
}

func NewSignatureHeaderJwsFromProto(s *proto.SignatureHeaderJWS) SignatureHeaderJws {
	if s == nil {
		return SignatureHeaderJws{}
	}
	return SignatureHeaderJws{
		Alg: s.Alg,
		Kid: s.Kid,
	}
}

func (s SignatureHeaderJws) ToProto() *proto.SignatureHeaderJWS {
	return &proto.SignatureHeaderJWS{
		Alg: s.Alg,
		Kid: s.Kid,
	}
}
