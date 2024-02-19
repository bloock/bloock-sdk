package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// DatetimeAttributeDescriptor represents a descriptor for an attribute with a datetime value.
type DatetimeAttributeDescriptor struct {
	AttributeDescriptor
}

// NewDatetimeAttributeDescriptor creates a new DatetimeAttributeDescriptor instance with the provided details.
func NewDatetimeAttributeDescriptor(name string, id string, description string, required bool) DatetimeAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return DatetimeAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewDatetimeAttributeDescriptorFromProto(s *proto.DateTimeAttributeDefinition) DatetimeAttributeDescriptor {
	if s == nil {
		return DatetimeAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return DatetimeAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s DatetimeAttributeDescriptor) ToProto() *proto.DateTimeAttributeDefinition {
	return &proto.DateTimeAttributeDefinition{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
