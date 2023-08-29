package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IntegerAttributeDescriptor struct {
	AttributeDescriptor
}

func NewIntegerAttributeDescriptor(name string, id string, description string, required bool) IntegerAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return IntegerAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewNumberAttributeDescriptorFromProto(s *proto.IntegerAttributeDefinitionV2) IntegerAttributeDescriptor {
	if s == nil {
		return IntegerAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return IntegerAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s IntegerAttributeDescriptor) ToProto() *proto.IntegerAttributeDefinitionV2 {
	return &proto.IntegerAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
