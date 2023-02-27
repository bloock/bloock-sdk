package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Credential struct {
	json string
}

func NewCredentialFromProto(s *proto.Credential) Credential {
	if s == nil {
		return Credential{}
	}
	return Credential{
		json: s.Json,
	}
}

func (c Credential) ToProto() *proto.Credential {
	return &proto.Credential{
		Json: c.json,
	}
}

func NewCredentialFromJson(json string) Credential {
	return Credential{
		json: json,
	}
}

func (c Credential) ToJson() string {
	return c.json
}
