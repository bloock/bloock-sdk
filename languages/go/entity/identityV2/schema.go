package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Schema struct {
	Id   string
	Json string
}

func NewSchemaFromProto(s *proto.SchemaV2) Schema {
	if s == nil {
		return Schema{}
	}
	return Schema{
		Id:   s.Id,
		Json: s.JsonLd,
	}
}

func (c Schema) ToProto() *proto.SchemaV2 {
	return &proto.SchemaV2{
		Id:     c.Id,
		JsonLd: c.Json,
	}
}
