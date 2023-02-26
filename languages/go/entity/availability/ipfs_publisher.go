package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IpfsPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

func NewIpfsPublisher() IpfsPublisher {
	return IpfsPublisher{
		Type: proto.DataAvailabilityType_IPFS,
		Args: PublisherArgs{},
	}
}

func (e IpfsPublisher) ToProto() *proto.Publisher {
	return &proto.Publisher{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}
