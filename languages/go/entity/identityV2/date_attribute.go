package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DateAttribute struct {
	Attribute
}

func NewDateAttribute(key string, value int64) DateAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return DateAttribute{
		Attribute: a,
	}
}

func NewDateAttributeFromProto(s *proto.DateAttribute) DateAttribute {
	if s == nil {
		return DateAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return DateAttribute{
		Attribute: a,
	}
}

func (s DateAttribute) ToProto() *proto.DateAttributeV2 {
	return &proto.DateAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(int64),
	}
}
