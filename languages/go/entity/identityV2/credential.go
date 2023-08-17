package identityV2

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
	Expiration        string
	CredentialSubject interface{}
	CredentialStatus  CredentialStatus
	Issuer            string
	CredentialSchema  CredentialSchema
	Proof             CredentialProof
}

func NewCredentialFromProto(s *proto.CredentialV2) Credential {
	if s == nil {
		return Credential{}
	}
	return Credential{
		Context:           s.Context,
		Id:                s.Id,
		Type:              s.Type,
		IssuanceDate:      s.IssuanceDate,
		Expiration:        s.Expiration,
		CredentialSubject: s.CredentialSubject,
		CredentialStatus:  NewCredentialStatusFromProto(s.CredentialStatus),
		Issuer:            s.Issuer,
		CredentialSchema:  NewCredentialSchemaFromProto(s.CredentialSchema),
		Proof:             NewCredentialProofFromProto(s.GetProof()),
	}
}

func (c Credential) ToProto() *proto.CredentialV2 {
	return &proto.CredentialV2{
		Context:           c.Context,
		Id:                c.Id,
		Type:              c.Type,
		IssuanceDate:      c.IssuanceDate,
		Expiration:        c.Expiration,
		CredentialSubject: c.CredentialSubject.(string),
		CredentialStatus:  c.CredentialStatus.ToProto(),
		Issuer:            c.Issuer,
		CredentialSchema:  c.CredentialSchema.ToProto(),
		Proof:             c.Proof.ToProto(),
	}
}

func NewCredentialFromJson(json string) (Credential, error) {
	bridge := bridge.NewBloockBridge()
	res, err := bridge.IdentityV2().CredentialFromJson(context.Background(), &proto.CredentialFromJsonRequestV2{
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
	res, err := bridge.IdentityV2().CredentialToJson(context.Background(), &proto.CredentialToJsonRequestV2{
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
