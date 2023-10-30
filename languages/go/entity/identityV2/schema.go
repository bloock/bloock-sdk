package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Schema struct {
	Cid        string
	CidJsonLd  string
	SchemaType string
	Json       string
}

func NewSchemaFromProto(s *proto.SchemaV2) Schema {
	if s == nil {
		return Schema{}
	}
	return Schema{
		Cid:        s.Cid,
		CidJsonLd:  s.CidJsonLd,
		SchemaType: s.SchemaType,
		Json:       s.Json,
	}
}

func (c Schema) ToProto() *proto.SchemaV2 {
	return &proto.SchemaV2{
		Cid:        c.Cid,
		CidJsonLd:  c.CidJsonLd,
		SchemaType: c.SchemaType,
		Json:       c.Json,
	}
}
