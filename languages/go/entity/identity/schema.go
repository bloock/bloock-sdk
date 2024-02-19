package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// Schema represents a schema with its attributes.
type Schema struct {
	Cid        string
	CidJsonLd  string
	SchemaType string
	Json       string
}

func NewSchemaFromProto(s *proto.Schema) Schema {
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

func (c Schema) ToProto() *proto.Schema {
	return &proto.Schema{
		Cid:        c.Cid,
		CidJsonLd:  c.CidJsonLd,
		SchemaType: c.SchemaType,
		Json:       c.Json,
	}
}
