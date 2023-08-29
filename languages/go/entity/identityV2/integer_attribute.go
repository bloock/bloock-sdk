package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IntegerAttribute struct {
	Attribute
}

func NewIntegerAttribute(key string, value int64) IntegerAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return IntegerAttribute{
		Attribute: a,
	}
}

func NewIntegerAttributeFromProto(s *proto.IntegerAttributeV2) IntegerAttribute {
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

func (s IntegerAttribute) ToProto() *proto.IntegerAttributeV2 {
	return &proto.IntegerAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(int64),
	}
}
