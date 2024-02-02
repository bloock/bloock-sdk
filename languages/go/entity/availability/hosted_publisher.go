package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// HostedPublisher represents a publisher for hosted data availability.
type HostedPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

// NewHostedPublisher creates a HostedPublisher instance with default publisher arguments.
func NewHostedPublisher() HostedPublisher {
	return HostedPublisher{
		Type: proto.DataAvailabilityType_HOSTED,
		Args: PublisherArgs{},
	}
}

func (e HostedPublisher) ToProto() *proto.Publisher {
	return &proto.Publisher{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}
