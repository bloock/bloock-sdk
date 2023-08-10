package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialSchema struct {
	Id   string
	Type string
}

func NewCredentialSchemaFromProto(s *proto.CredentialSchemaV2) CredentialSchema {
	if s == nil {
		return CredentialSchema{}
	}
	return CredentialSchema{
		Id:   s.Id,
		Type: s.Type,
	}
}

func (c CredentialSchema) ToProto() *proto.CredentialSchemaV2 {
	return &proto.CredentialSchemaV2{
		Id:   c.Id,
		Type: c.Type,
	}
}
