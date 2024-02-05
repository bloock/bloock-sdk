package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// Signature represents a cryptographic signature along with additional metadata.
type Signature struct {
	// Signature is the cryptographic signature.
	Signature   string
	// Alg is the algorithm used for the signature.
	Alg         string
	// Kid is the key identifier associated with the signature. (public key or key ID).
	Kid         string
	// MessageHash is the hash of the message that was signed.
	MessageHash string
	// Subject is an optional field representing the subject of the signature.
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

// GetAlg returns the SignatureAlg based on the algorithm specified in the Alg field.
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
