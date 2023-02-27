package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type HostedPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

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
