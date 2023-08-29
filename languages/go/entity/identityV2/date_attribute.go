package identityV2

import (
	"time"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type DateAttribute struct {
	Attribute
}

func NewDateAttribute(key string, value time.Time) DateAttribute {
	a := Attribute{
		Id:    key,
		Value: value.Format("2006-01-02"),
	}
	return DateAttribute{
		Attribute: a,
	}
}

func NewDateAttributeFromProto(s *proto.DateAttributeV2) DateAttribute {
	if s == nil {
		return DateAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return DateAttribute{
		Attribute: a,
	}
}

func (s DateAttribute) ToProto() *proto.DateAttributeV2 {
	return &proto.DateAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
