package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DatetimeAttributeDescriptor struct {
	AttributeDescriptor
}

func NewDatetimeAttributeDescriptor(name string, technicalName string, description string) DatetimeAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName:   name,
		TechnicalName: technicalName,
		Description:   description,
	}
	return DatetimeAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewDatetimeAttributeDescriptorFromProto(s *proto.DateTimeAttributeDefinition) DatetimeAttributeDescriptor {
	if s == nil {
		return DatetimeAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName:   s.GetId(),
		TechnicalName: s.Id,
		Description:   s.Description,
	}
	return DatetimeAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s DatetimeAttributeDescriptor) ToProto() *proto.DateTimeAttributeDefinition {
	return &proto.DateTimeAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.TechnicalName,
		Description: s.Description,
	}
}
