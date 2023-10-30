package identity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type CredentialProof struct {
	BloockProof    integrity.Proof
	SignatureProof authenticity.SignatureJws
}

func NewCredentialProofFromProto(s *proto.CredentialProof) CredentialProof {
	if s == nil {
		return CredentialProof{}
	}
	return CredentialProof{
		BloockProof:    integrity.NewProofFromProto(s.BloockProof),
		SignatureProof: authenticity.NewSignatureJwsFromProto(s.SignatureProof),
	}
}

func (c CredentialProof) ToProto() *proto.CredentialProof {
	return &proto.CredentialProof{
		BloockProof:    c.BloockProof.ToProto(),
		SignatureProof: c.SignatureProof.ToProto(),
	}
}
