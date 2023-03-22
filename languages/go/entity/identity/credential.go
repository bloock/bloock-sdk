package identity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type Credential struct {
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

func NewCredentialFromProto(s *proto.Credential) Credential {
	if s == nil {
		return Credential{}
	}
	return Credential{
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

func (c Credential) ToProto() *proto.Credential {
	return &proto.Credential{
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

func NewCredentialFromJson(json string) (Credential, error) {
	bridge := bridge.NewBloockBridge()
	res, err := bridge.Identity().CredentialFromJson(context.Background(), &proto.CredentialFromJsonRequest{
		ConfigData: config.NewConfigDataDefault(),
		Json:       json,
	})

	if err != nil {
		return Credential{}, err
	}

	if res.Error != nil {
		return Credential{}, errors.New(res.Error.Message)
	}

	return NewCredentialFromProto(res.GetCredential()), nil
}

func (c Credential) ToJson() (string, error) {
	bridge := bridge.NewBloockBridge()
	res, err := bridge.Identity().CredentialToJson(context.Background(), &proto.CredentialToJsonRequest{
		ConfigData: config.NewConfigDataDefault(),
		Credential: c.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.GetJson(), nil
}
