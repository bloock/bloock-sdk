package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// PublisherArgs represents the arguments for a data publisher.
type PublisherArgs struct {
}

func (e PublisherArgs) ToProto() *proto.PublisherArgs {
	return &proto.PublisherArgs{}
}
