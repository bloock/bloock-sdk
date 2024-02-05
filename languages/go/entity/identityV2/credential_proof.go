package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// CredentialProof represents the proof associated with a credential, including signature and sparse merkle tree proof.
type CredentialProof struct {
	SignatureProof string
	SparseMtProof  string
}

func NewCredentialProofFromProto(s *proto.CredentialProofV2) CredentialProof {
	if s == nil {
		return CredentialProof{}
	}
	return CredentialProof{
		SignatureProof: s.GetSignatureProof(),
		SparseMtProof:  s.GetSparseMtProof(),
	}
}

func (c CredentialProof) ToProto() *proto.CredentialProofV2 {
	var sparseMtProof *string
	
	if c.SparseMtProof == "" {
		sparseMtProof = nil
	} else {
		sparseMtProof = &c.SparseMtProof
	}
	return &proto.CredentialProofV2{
		SignatureProof: c.SignatureProof,
		SparseMtProof:  sparseMtProof,
	}
}
