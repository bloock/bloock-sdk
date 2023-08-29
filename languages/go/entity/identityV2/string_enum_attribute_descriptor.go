package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type StringEnumAttributeDescriptor struct {
	AttributeDescriptor
	Enum []string
}

func NewStringEnumAttributeDescriptor(name string, id string, description string, required bool, enum []string) StringEnumAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return StringEnumAttributeDescriptor{
		AttributeDescriptor: a,
		Enum:                enum,
	}
}

func NewStringEnumAttributeDescriptorFromProto(s *proto.StringEnumAttributeDefinitionV2) StringEnumAttributeDescriptor {
	if s == nil {
		return StringEnumAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return StringEnumAttributeDescriptor{
		AttributeDescriptor: a,
		Enum:                s.GetEnum(),
	}
}

func (s StringEnumAttributeDescriptor) ToProto() *proto.StringEnumAttributeDefinitionV2 {
	return &proto.StringEnumAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
		Enum:        s.Enum,
	}
}
