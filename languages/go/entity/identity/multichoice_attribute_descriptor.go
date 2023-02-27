package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type MultichoiceAttributeDescriptor struct {
	AttributeDescriptor
	AllowedValues []string
}

func NewMultichoiceAttributeDescriptor(name string, technicalName string, allowedValues []string, description string) MultichoiceAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName:   name,
		TechnicalName: technicalName,
		Description:   description,
	}
	return MultichoiceAttributeDescriptor{
		AttributeDescriptor: a,
		AllowedValues:       allowedValues,
	}
}

func NewMultichoiceAttributeDescriptorFromProto(s *proto.MultiChoiceAttributeDefinition) MultichoiceAttributeDescriptor {
	if s == nil {
		return MultichoiceAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName:   s.GetId(),
		TechnicalName: s.Id,
		Description:   s.Description,
	}
	return MultichoiceAttributeDescriptor{
		AttributeDescriptor: a,
		AllowedValues:       s.AllowedValues,
	}
}

func (s MultichoiceAttributeDescriptor) ToProto() *proto.MultiChoiceAttributeDefinition {
	return &proto.MultiChoiceAttributeDefinition{
		DisplayName:   s.DisplayName,
		Id:            s.TechnicalName,
		Description:   s.Description,
		AllowedValues: s.AllowedValues,
	}
}
