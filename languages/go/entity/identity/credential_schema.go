package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// CredentialSchema represents the schema information for a credential, including its ID and type.
type CredentialSchema struct {
	Id   string
	Type string
}

func NewCredentialSchemaFromProto(s *proto.CredentialSchema) CredentialSchema {
	if s == nil {
		return CredentialSchema{}
	}
	return CredentialSchema{
		Id:   s.Id,
		Type: s.Type,
	}
}

func (c CredentialSchema) ToProto() *proto.CredentialSchema {
	return &proto.CredentialSchema{
		Id:   c.Id,
		Type: c.Type,
	}
}
