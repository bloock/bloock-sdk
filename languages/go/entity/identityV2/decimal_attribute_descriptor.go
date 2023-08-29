package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DecimalAttributeDescriptor struct {
	AttributeDescriptor
}

func NewDecimalAttributeDescriptor(name string, id string, description string, required bool) DecimalAttributeDescriptor {
	a := AttributeDescriptor{
		DisplayName: name,
		Id:          id,
		Description: description,
		Required:    required,
	}
	return DecimalAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func NewDecimalAttributeDescriptorFromProto(s *proto.DecimalAttributeDefinitionV2) DecimalAttributeDescriptor {
	if s == nil {
		return DecimalAttributeDescriptor{}
	}
	a := AttributeDescriptor{
		DisplayName: s.GetId(),
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
	return DecimalAttributeDescriptor{
		AttributeDescriptor: a,
	}
}

func (s DecimalAttributeDescriptor) ToProto() *proto.DecimalAttributeDefinitionV2 {
	return &proto.DecimalAttributeDefinitionV2{
		DisplayName: s.DisplayName,
		Id:          s.Id,
		Description: s.Description,
		Required:    s.Required,
	}
}
