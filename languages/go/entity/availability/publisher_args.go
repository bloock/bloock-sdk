package availability

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// PublisherArgs represents the arguments for a data publisher.
type PublisherArgs struct {
	// IpnsKey is a managed key or certificate object that will be used to create the IPNS record.
	IpnsKey IpnsKey
}

func (e PublisherArgs) ToProto() *proto.PublisherArgs {
	return &proto.PublisherArgs{
		IpnsKey: e.IpnsKey.ToProto(),
	}
}
