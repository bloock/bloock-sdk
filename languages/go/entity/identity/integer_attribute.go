package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IntegerAttribute represents an attribute with an integer value.
type IntegerAttribute struct {
	Attribute
}

// NewIntegerAttribute creates a new IntegerAttribute instance with the provided key and value.
func NewIntegerAttribute(key string, value int64) IntegerAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return IntegerAttribute{
		Attribute: a,
	}
}

func NewIntegerAttributeFromProto(s *proto.IntegerAttribute) IntegerAttribute {
	if s == nil {
		return IntegerAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return IntegerAttribute{
		Attribute: a,
	}
}

func (s IntegerAttribute) ToProto() *proto.IntegerAttribute {
	return &proto.IntegerAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(int64),
	}
}
