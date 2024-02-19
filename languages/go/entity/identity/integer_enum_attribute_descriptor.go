package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IntegerEnumAttributeDescriptor represents a descriptor for an attribute with an integer enum value.
type IntegerEnumAttributeDescriptor struct {
	AttributeDescriptor
	Enum []int64
}

// NewIntegerEnumAttributeDescriptor creates a new IntegerEnumAttributeDescriptor instance with the provided details.
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

func NewIntegerEnumAttributeDescriptorFromProto(s *proto.IntegerEnumAttributeDefinition) IntegerEnumAttributeDescriptor {
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

func (s IntegerEnumAttributeDescriptor) ToProto() *proto.IntegerEnumAttributeDefinition {
	return &proto.IntegerEnumAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
		Enum:        s.Enum,
	}
}
