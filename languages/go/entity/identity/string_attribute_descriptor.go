package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// StringAttributeDescriptor represents a descriptor for an attribute with a string value.
type StringAttributeDescriptor struct {
	AttributeDescriptor
}

// NewStringAttributeDescriptor creates a new StringAttributeDescriptor instance with the provided details.
func NewStringAttributeDescriptor(name string, id string, description string, required bool) StringAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return StringAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewStringAttributeDescriptorFromProto(s *proto.StringAttributeDefinition) StringAttributeDescriptor {
	if s == nil {
		return StringAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return StringAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s StringAttributeDescriptor) ToProto() *proto.StringAttributeDefinition {
	return &proto.StringAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
