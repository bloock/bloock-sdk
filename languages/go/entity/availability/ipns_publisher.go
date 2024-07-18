package availability

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// IpnsPublisher represents a publisher for IPNS data availability.
type IpnsPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

// NewIpnsPublisher represents a publisher for IPNS data availability.
func NewIpnsPublisher(ipnsKey IpnsKey) IpnsPublisher {
	return IpnsPublisher{
		Type: proto.DataAvailabilityType_IPNS,
		Args: PublisherArgs{
			IpnsKey: ipnsKey,
		},
	}
}

func (e IpnsPublisher) ToProto() *proto.Publisher {
	return &proto.Publisher{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}
