package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IpfsPublisher represents a publisher for IPFS data availability.
type IpfsPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

// IpfsPublisher represents a publisher for IPFS data availability.
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
