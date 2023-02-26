package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type NumberAttributeDescriptor struct {
	AttributeDescriptor
}

func NewNumberAttributeDescriptor(name string, technicalName string, description string) NumberAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName:   name,
		TechnicalName: technicalName,
		Description:   description,
	}
	return NumberAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewNumberAttributeDescriptorFromProto(s *proto.NumberAttributeDefinition) NumberAttributeDescriptor {
	if s == nil {
		return NumberAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName:   s.GetId(),
		TechnicalName: s.Id,
		Description:   s.Description,
	}
	return NumberAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s NumberAttributeDescriptor) ToProto() *proto.NumberAttributeDefinition {
	return &proto.NumberAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.TechnicalName,
		Description: s.Description,
	}
}
