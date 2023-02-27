package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Schema struct {
	id   string
	json string
}

func NewSchemaFromProto(s *proto.Schema) Schema {
	if s == nil {
		return Schema{}
	}
	return Schema{
		id:   s.Id,
		json: s.JsonLd,
	}
}

func (c Schema) ToProto() *proto.Schema {
	return &proto.Schema{
		Id:     c.id,
		JsonLd: c.json,
	}
}
