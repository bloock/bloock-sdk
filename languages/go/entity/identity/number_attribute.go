package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type NumberAttribute struct {
	Attribute
}

func NewNumberAttribute(key string, value int) NumberAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return NumberAttribute{
		Attribute: a,
	}
}

func NewNumberAttributeFromProto(s *proto.NumberAttribute) NumberAttribute {
	if s == nil {
		return NumberAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return NumberAttribute{
		Attribute: a,
	}
}

func (s NumberAttribute) ToProto() *proto.NumberAttribute {
	return &proto.NumberAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(int64),
	}
}
