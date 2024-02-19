package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// BooleanAttributeDescriptor represents a descriptor for a boolean attribute.
type BooleanAttributeDescriptor struct {
	AttributeDescriptor
}

// NewBooleanAttributeDescriptor creates a new BooleanAttributeDescriptor instance with the provided details.
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

func NewBooleanAttributeDescriptorFromProto(s *proto.BooleanAttributeDefinition) BooleanAttributeDescriptor {
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

func (s BooleanAttributeDescriptor) ToProto() *proto.BooleanAttributeDefinition {
	return &proto.BooleanAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
