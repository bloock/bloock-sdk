package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type StringAttribute struct {
	Attribute
}

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

func (s StringAttribute) ToProto() *proto.StringAttributeV2 {
	return &proto.StringAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
