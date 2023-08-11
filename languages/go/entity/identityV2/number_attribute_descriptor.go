package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type NumberAttributeDescriptor struct {
	AttributeDescriptor
}

func NewNumberAttributeDescriptor(name string, id string, description string, required bool) NumberAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return NumberAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewNumberAttributeDescriptorFromProto(s *proto.NumberAttributeDefinitionV2) NumberAttributeDescriptor {
	if s == nil {
		return NumberAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return NumberAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s NumberAttributeDescriptor) ToProto() *proto.NumberAttributeDefinitionV2 {
	return &proto.NumberAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
