package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type StringAttributeDescriptor struct {
	AttributeDescriptor
}

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

func NewStringAttributeDescriptorFromProto(s *proto.StringAttributeDefinitionV2) StringAttributeDescriptor {
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

func (s StringAttributeDescriptor) ToProto() *proto.StringAttributeDefinitionV2 {
	return &proto.StringAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
