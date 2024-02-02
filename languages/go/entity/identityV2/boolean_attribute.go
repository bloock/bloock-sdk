package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// BooleanAttribute represents an attribute with a boolean value.
type BooleanAttribute struct {
	Attribute
}

// NewBooleanAttribute creates a new BooleanAttribute instance with the provided key and value.
func NewBooleanAttribute(key string, value bool) BooleanAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return BooleanAttribute{
		Attribute: a,
	}
}

func NewBooleanAttributeFromProto(s *proto.BooleanAttribute) BooleanAttribute {
	if s == nil {
		return BooleanAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return BooleanAttribute{
		Attribute: a,
	}
}

func (s BooleanAttribute) ToProto() *proto.BooleanAttributeV2 {
	return &proto.BooleanAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(bool),
	}
}
