package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Publisher interface {
	ToProto() *proto.Publisher
}

type PublisherArgs struct {
}

func (e PublisherArgs) ToProto() *proto.PublisherArgs {
	return &proto.PublisherArgs{}
}

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
