package identity

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type Credential struct {
	ThreadID string
	Body     CredentialBody
}

func NewCredentialFromProto(s *proto.Credential) Credential {
	if s == nil {
		return Credential{}
	}
	return Credential{
		ThreadID: s.ThreadId,
		Body:     NewCredentialBodyFromProto(s.Body),
	}
}

func (c Credential) ToProto() *proto.Credential {
	return &proto.Credential{
		ThreadId: c.ThreadID,
		Body:     c.Body.ToProto(),
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
