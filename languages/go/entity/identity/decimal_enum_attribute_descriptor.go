package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// DecimalEnumAttributeDescriptor represents a descriptor for an attribute with a decimal enum value.
type DecimalEnumAttributeDescriptor struct {
	AttributeDescriptor
	Enum []float64
}

// NewDecimalEnumAttributeDescriptor creates a new DecimalEnumAttributeDescriptor instance with the provided details.
func NewDecimalEnumAttributeDescriptor(name string, id string, description string, required bool, enum []float64) DecimalEnumAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return DecimalEnumAttributeDescriptor{
		AttributeDescriptor: a,
		Enum:                enum,
	}
}

func NewDecimalEnumAttributeDescriptorFromProto(s *proto.DecimalEnumAttributeDefinition) DecimalEnumAttributeDescriptor {
	if s == nil {
		return DecimalEnumAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return DecimalEnumAttributeDescriptor{
		AttributeDescriptor: a,
		Enum:                s.GetEnum(),
	}
}

func (s DecimalEnumAttributeDescriptor) ToProto() *proto.DecimalEnumAttributeDefinition {
	return &proto.DecimalEnumAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
		Enum:        s.Enum,
	}
}
