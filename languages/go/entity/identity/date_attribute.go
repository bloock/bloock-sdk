package identity

import (
	"time"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// DateAttribute represents an attribute with a date value, including its key and formatted value.
type DateAttribute struct {
	Attribute
}

// NewDateAttribute creates a new DateAttribute instance with the provided key and time value.
func NewDateAttribute(key string, value time.Time) DateAttribute {
	a := Attribute{
		Id:    key,
		Value: value.Format("2006-01-02"),
	}
	return DateAttribute{
		Attribute: a,
	}
}

func NewDateAttributeFromProto(s *proto.DateAttribute) DateAttribute {
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

func (s DateAttribute) ToProto() *proto.DateAttribute {
	return &proto.DateAttribute{
		Id:    s.Attribute.Id,
		Value: s.Attribute.Value.(string),
	}
}
