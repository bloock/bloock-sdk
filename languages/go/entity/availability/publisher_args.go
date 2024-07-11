package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// PublisherArgs represents the arguments for a data publisher.
type PublisherArgs struct {
	// KeyID is a managed key identifier of type UUID that will be used to create the IPNS record.
	KeyID string
}

func (e PublisherArgs) ToProto() *proto.PublisherArgs {
	return &proto.PublisherArgs{}
}
