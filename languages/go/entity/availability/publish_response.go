package availability

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// PublishResponse represents an object with a the publish response attributes.
type PublishResponse struct {
	ID      string
	IpnsKey *IpnsKey
}

// NewIpnsKey constructs a PublishResponse object with the specified parameters.
func NewPublishResponse(id string, ipnsKey *IpnsKey) PublishResponse {
	return PublishResponse{
		ID:      id,
		IpnsKey: ipnsKey,
	}
}

func NewPublishResponseFromProto(res *proto.PublishResponse) PublishResponse {
	return NewPublishResponse(res.Id, NewIpnsKeyFromProto(res.IpnsKey))
}
