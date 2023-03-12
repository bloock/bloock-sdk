package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Schema struct {
	Id   string
	Json string
}

func NewSchemaFromProto(s *proto.Schema) Schema {
	if s == nil {
		return Schema{}
	}
	return Schema{
		Id:   s.Id,
		Json: s.JsonLd,
	}
}

func (c Schema) ToProto() *proto.Schema {
	return &proto.Schema{
		Id:     c.Id,
		JsonLd: c.Json,
	}
}
