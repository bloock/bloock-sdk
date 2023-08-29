package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialProof struct {
	SignatureProof string
	IntegrityProof string
	SparseMtProof  string
}

func NewCredentialProofFromProto(s *proto.CredentialProofV2) CredentialProof {
	if s == nil {
		return CredentialProof{}
	}
	return CredentialProof{
		SignatureProof: s.GetSignatureProof(),
		IntegrityProof: s.GetIntegrityProof(),
		SparseMtProof:  s.GetSparseMtProof(),
	}
}

func (c CredentialProof) ToProto() *proto.CredentialProofV2 {
	var integrityProof, sparseMtProof *string
	if c.IntegrityProof == "" {
		integrityProof = nil
	} else {
		integrityProof = &c.IntegrityProof
	}
	if c.SparseMtProof == "" {
		sparseMtProof = nil
	} else {
		sparseMtProof = &c.SparseMtProof
	}
	return &proto.CredentialProofV2{
		SignatureProof: c.SignatureProof,
		IntegrityProof: integrityProof,
		SparseMtProof:  sparseMtProof,
	}
}
