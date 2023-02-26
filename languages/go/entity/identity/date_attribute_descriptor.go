package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DateAttributeDescriptor struct {
	AttributeDescriptor
}

func NewDateAttributeDescriptor(name string, technicalName string, description string) DateAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName:   name,
		TechnicalName: technicalName,
		Description:   description,
	}
	return DateAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewDateAttributeDescriptorFromProto(s *proto.DateAttributeDefinition) DateAttributeDescriptor {
	if s == nil {
		return DateAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName:   s.GetId(),
		TechnicalName: s.Id,
		Description:   s.Description,
	}
	return DateAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s DateAttributeDescriptor) ToProto() *proto.DateAttributeDefinition {
	return &proto.DateAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.TechnicalName,
		Description: s.Description,
	}
}
