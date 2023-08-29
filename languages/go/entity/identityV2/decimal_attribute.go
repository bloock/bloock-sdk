package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DecimalAttribute struct {
	Attribute
}

func NewDecimalAttribute(key string, value float64) DecimalAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return DecimalAttribute{
		Attribute: a,
	}
}

func NewDecimalAttributeFromProto(s *proto.DecimalAttributeV2) DecimalAttribute {
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

func (s DecimalAttribute) ToProto() *proto.DecimalAttributeV2 {
	return &proto.DecimalAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(float64),
	}
}
