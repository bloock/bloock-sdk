package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type MultichoiceAttribute struct {
	Attribute
}

func NewMultichoiceAttribute(key string, value string) MultichoiceAttribute {
	a := Attribute{
		Id:    key,
		Value: value,
	}
	return MultichoiceAttribute{
		Attribute: a,
	}
}

func NewMultichoiceAttributeFromProto(s *proto.MultiChoiceAttribute) MultichoiceAttribute {
	if s == nil {
		return MultichoiceAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return MultichoiceAttribute{
		Attribute: a,
	}
}

func (s MultichoiceAttribute) ToProto() *proto.MultiChoiceAttribute {
	return &proto.MultiChoiceAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
