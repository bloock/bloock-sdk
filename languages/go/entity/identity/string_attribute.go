package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// StringAttribute represents an attribute with a string value.
type StringAttribute struct {
	Attribute
}

// NewStringAttribute creates a new StringAttribute instance with the provided key and value.
func NewStringAttribute(key string, value string) StringAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return StringAttribute{
		Attribute: a,
	}
}

func NewStringAttributeFromProto(s *proto.StringAttribute) StringAttribute {
	if s == nil {
		return StringAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return StringAttribute{
		Attribute: a,
	}
}

func (s StringAttribute) ToProto() *proto.StringAttribute {
	return &proto.StringAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
