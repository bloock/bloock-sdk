package availability

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// IpnsPublisher represents a publisher for IPNS data availability.
type IpnsPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

// NewIpnsPublisher represents a publisher for IPNS data availability with creation option.
func NewIpnsPublisher() IpnsPublisher {
	return IpnsPublisher{
		Type: proto.DataAvailabilityType_IPNS,
		Args: PublisherArgs{
			IpnsKey: nil,
		},
	}
}

// UpdateIpnsPublisher represents a publisher for IPNS data availability with update option.
func UpdateIpnsPublisher(ipnsKey *IpnsKey) IpnsPublisher {
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
