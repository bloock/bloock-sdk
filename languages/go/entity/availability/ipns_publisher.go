package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IpnsPublisher represents a publisher for IPFS data availability.
type IpnsPublisher struct {
	Type proto.DataAvailabilityType
	Args PublisherArgs
}

// NewIpnsPublisher represents a publisher for IPFS data availability.
func NewIpnsPublisher(keyID string) IpnsPublisher {
	return IpnsPublisher{
		Type: proto.DataAvailabilityType_IPFS,
		Args: PublisherArgs{
			KeyID: keyID,
		},
	}
}

func (e IpnsPublisher) ToProto() *proto.Publisher {
	return &proto.Publisher{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}
