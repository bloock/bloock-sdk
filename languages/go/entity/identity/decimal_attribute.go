package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// DecimalAttribute represents an attribute with a decimal value.
type DecimalAttribute struct {
	Attribute
}

// NewDecimalAttribute creates a new DecimalAttribute instance with the provided key and value.
func NewDecimalAttribute(key string, value float64) DecimalAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return DecimalAttribute{
		Attribute: a,
	}
}

func NewDecimalAttributeFromProto(s *proto.DecimalAttribute) DecimalAttribute {
	if s == nil {
		return DecimalAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return DecimalAttribute{
		Attribute: a,
	}
}

func (s DecimalAttribute) ToProto() *proto.DecimalAttribute {
	return &proto.DecimalAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(float64),
	}
}
