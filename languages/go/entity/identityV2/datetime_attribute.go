package identityV2

import (
	"time"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type DatetimeAttribute struct {
	Attribute
}

func NewDatetimeAttribute(key string, value time.Time) DatetimeAttribute {
	a := Attribute{
		Id:    key,
		Value: value.Format(time.RFC3339),
	}
	return DatetimeAttribute{
		Attribute: a,
	}
}

func NewDatetimeAttributeFromProto(s *proto.DateTimeAttributeV2) DatetimeAttribute {
	if s == nil {
		return DatetimeAttribute{}
	}
	a := Attribute{
		Id:    s.GetId(),
		Value: s.GetValue(),
	}
	return DatetimeAttribute{
		Attribute: a,
	}
}

func (s DatetimeAttribute) ToProto() *proto.DateTimeAttributeV2 {
	return &proto.DateTimeAttributeV2{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
