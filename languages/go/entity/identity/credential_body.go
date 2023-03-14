package identity

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type CredentialBody struct {
	Context           []string
	Id                string
	Type              []string
	IssuanceDate      string
	CredentialSubject interface{}
	CredentialStatus  CredentialStatus
	Issuer            string
	CredentialSchema  CredentialSchema
	Proof             CredentialProof
}

func NewCredentialBodyFromProto(s *proto.CredentialBody) CredentialBody {
	if s == nil {
		return CredentialBody{}
	}
	return CredentialBody{
		Context:           s.Context,
		Id:                s.Id,
		Type:              s.Type,
		IssuanceDate:      s.IssuanceDate,
		CredentialSubject: s.CredentialSubject,
		CredentialStatus:  NewCredentialStatusFromProto(s.CredentialStatus),
		Issuer:            s.Issuer,
		CredentialSchema:  NewCredentialSchemaFromProto(s.CredentialSchema),
		Proof:             NewCredentialProofFromProto(s.Proof),
	}
}

func (c CredentialBody) ToProto() *proto.CredentialBody {
	return &proto.CredentialBody{
		Context:           c.Context,
		Id:                c.Id,
		Type:              c.Type,
		IssuanceDate:      c.IssuanceDate,
		CredentialSubject: c.CredentialSubject.(string),
		CredentialStatus:  c.CredentialStatus.ToProto(),
		Issuer:            c.Issuer,
		CredentialSchema:  c.CredentialSchema.ToProto(),
		Proof:             c.Proof.ToProto(),
	}
}
