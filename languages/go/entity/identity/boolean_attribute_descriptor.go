package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BooleanAttributeDescriptor struct {
	AttributeDescriptor
}

func NewBooleanAttributeDescriptor(name string, technicalName string, description string) BooleanAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName:   name,
		TechnicalName: technicalName,
		Description:   description,
	}
	return BooleanAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewBooleanAttributeDescriptorFromProto(s *proto.BooleanAttributeDefinition) BooleanAttributeDescriptor {
	if s == nil {
		return BooleanAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName:   s.GetId(),
		TechnicalName: s.Id,
		Description:   s.Description,
	}
	return BooleanAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s BooleanAttributeDescriptor) ToProto() *proto.BooleanAttributeDefinition {
	return &proto.BooleanAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.TechnicalName,
		Description: s.Description,
	}
}
