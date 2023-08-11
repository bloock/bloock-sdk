package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DatetimeAttribute struct {
	Attribute
}

func NewDatetimeAttribute(key string, value int64) DatetimeAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return DatetimeAttribute{
		Attribute: a,
	}
}

func NewDatetimeAttributeFromProto(s *proto.DateTimeAttribute) DatetimeAttribute {
	if s == nil {
		return DatetimeAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return DatetimeAttribute{
		Attribute: a,
	}
}

func (s DatetimeAttribute) ToProto() *proto.DateTimeAttributeV2 {
	return &proto.DateTimeAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(int64),
	}
}
