package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IntegerEnumAttributeDescriptor struct {
	AttributeDescriptor
	Enum []int64
}

func NewIntegerEnumAttributeDescriptor(name string, id string, description string, required bool, enum []int64) IntegerEnumAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return IntegerEnumAttributeDescriptor{
		AttributeDescriptor: a,
		Enum:                enum,
	}
}

func NewIntegerEnumAttributeDescriptorFromProto(s *proto.IntegerEnumAttributeDefinitionV2) IntegerEnumAttributeDescriptor {
	if s == nil {
		return IntegerEnumAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return IntegerEnumAttributeDescriptor{
		AttributeDescriptor: a,
		Enum:                s.GetEnum(),
	}
}

func (s IntegerEnumAttributeDescriptor) ToProto() *proto.IntegerEnumAttributeDefinitionV2 {
	return &proto.IntegerEnumAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
		Enum:        s.Enum,
	}
}
