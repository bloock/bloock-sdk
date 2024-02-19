package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IntegerAttributeDescriptor represents a descriptor for an attribute with an integer value.
type IntegerAttributeDescriptor struct {
	AttributeDescriptor
}

// NewIntegerAttributeDescriptor creates a new IntegerAttributeDescriptor instance with the provided details.
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

func NewNumberAttributeDescriptorFromProto(s *proto.IntegerAttributeDefinition) IntegerAttributeDescriptor {
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

func (s IntegerAttributeDescriptor) ToProto() *proto.IntegerAttributeDefinition {
	return &proto.IntegerAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
