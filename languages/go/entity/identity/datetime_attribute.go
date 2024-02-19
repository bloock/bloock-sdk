package identity

import (
	"time"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// DatetimeAttribute represents an attribute with a datetime value.
type DatetimeAttribute struct {
	Attribute
}

// NewDatetimeAttribute creates a new DatetimeAttribute instance with the provided key and value.
func NewDatetimeAttribute(key string, value time.Time) DatetimeAttribute {
	a := Attribute{
		Id:    key,
		Value: value.Format(time.RFC3339),
	}
	return DatetimeAttribute{
		Attribute: a,
	}
}

func NewDatetimeAttributeFromProto(s *proto.DateTimeAttribute) DatetimeAttribute {
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

func (s DatetimeAttribute) ToProto() *proto.DateTimeAttribute {
	return &proto.DateTimeAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
