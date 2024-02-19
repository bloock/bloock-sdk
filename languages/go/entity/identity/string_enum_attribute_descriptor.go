package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// StringEnumAttributeDescriptor represents a descriptor for an attribute with a string enum value.
type StringEnumAttributeDescriptor struct {
	AttributeDescriptor
	Enum []string
}

// NewStringEnumAttributeDescriptor creates a new StringEnumAttributeDescriptor instance with the provided details.
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

func NewStringEnumAttributeDescriptorFromProto(s *proto.StringEnumAttributeDefinition) StringEnumAttributeDescriptor {
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

func (s StringEnumAttributeDescriptor) ToProto() *proto.StringEnumAttributeDefinition {
	return &proto.StringEnumAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
		Enum:        s.Enum,
	}
}
