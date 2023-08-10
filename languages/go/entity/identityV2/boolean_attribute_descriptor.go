package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BooleanAttributeDescriptor struct {
	AttributeDescriptor
}

func NewBooleanAttributeDescriptor(name string, id string, description string, required bool) BooleanAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return BooleanAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewBooleanAttributeDescriptorFromProto(s *proto.BooleanAttributeDefinitionV2) BooleanAttributeDescriptor {
	if s == nil {
		return BooleanAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return BooleanAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s BooleanAttributeDescriptor) ToProto() *proto.BooleanAttributeDefinitionV2 {
	return &proto.BooleanAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
