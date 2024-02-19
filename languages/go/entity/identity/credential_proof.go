package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// CredentialProof represents the proof associated with a credential, including signature and sparse merkle tree proof.
type CredentialProof struct {
	SignatureProof string
	SparseMtProof  string
}

func NewCredentialProofFromProto(s *proto.CredentialProof) CredentialProof {
	if s == nil {
		return CredentialProof{}
	}
	return CredentialProof{
		SignatureProof: s.GetSignatureProof(),
		SparseMtProof:  s.GetSparseMtProof(),
	}
}

func (c CredentialProof) ToProto() *proto.CredentialProof {
	var sparseMtProof *string

	if c.SparseMtProof == "" {
		sparseMtProof = nil
	} else {
		sparseMtProof = &c.SparseMtProof
	}
	return &proto.CredentialProof{
		SignatureProof: c.SignatureProof,
		SparseMtProof:  sparseMtProof,
	}
}
