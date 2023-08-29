package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type StringAttributeDescriptor struct {
	AttributeDescriptor
}

func NewStringAttributeDescriptor(name string, technicalName string, description string) StringAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName:   name,
		TechnicalName: technicalName,
		Description:   description,
	}
	return StringAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewStringAttributeDescriptorFromProto(s *proto.StringAttributeDefinition) StringAttributeDescriptor {
	if s == nil {
		return StringAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName:   s.GetId(),
		TechnicalName: s.Id,
		Description:   s.Description,
	}
	return StringAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s StringAttributeDescriptor) ToProto() *proto.StringAttributeDefinition {
	return &proto.StringAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.TechnicalName,
		Description: s.Description,
	}
}
