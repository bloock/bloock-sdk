package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialProof struct {
	SignatureProof string
	BloockProof    string
	SparseMtProof  string
}

func NewCredentialProofFromProto(s *proto.CredentialProofV2) CredentialProof {
	if s == nil {
		return CredentialProof{}
	}
	return CredentialProof{
		SignatureProof: s.GetSignatureProof(),
		BloockProof:    s.GetBloockProof(),
		SparseMtProof:  s.GetSparseMtProof(),
	}
}

func (c CredentialProof) ToProto() *proto.CredentialProofV2 {
	var bloockProof, sparseMtProof *string
	if c.BloockProof == "" {
		bloockProof = nil
	} else {
		bloockProof = &c.BloockProof
	}
	if c.SparseMtProof == "" {
		sparseMtProof = nil
	} else {
		sparseMtProof = &c.SparseMtProof
	}
	return &proto.CredentialProofV2{
		SignatureProof: c.SignatureProof,
		BloockProof:    bloockProof,
		SparseMtProof:  sparseMtProof,
	}
}
