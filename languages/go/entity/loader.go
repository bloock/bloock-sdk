package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Loader interface {
	ToProto() *proto.Loader
}

type LoaderArgs struct {
	Id string
}

func (e LoaderArgs) ToProto() *proto.LoaderArgs {
	return &proto.LoaderArgs{
		Id: e.Id,
	}
}

type HostedLoader struct {
	Type proto.DataAvailabilityType
	Args LoaderArgs
}

func NewHostedLoader(id string) HostedLoader {
	return HostedLoader{
		Type: proto.DataAvailabilityType_HOSTED,
		Args: LoaderArgs{
			Id: id,
		},
	}
}

func (e HostedLoader) ToProto() *proto.Loader {
	return &proto.Loader{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}

type IpfsLoader struct {
	Type proto.DataAvailabilityType
	Args LoaderArgs
}

func NewIpfsLoader(hash string) IpfsLoader {
	return IpfsLoader{
		Type: proto.DataAvailabilityType_IPFS,
		Args: LoaderArgs{
			hash,
		},
	}
}

func (e IpfsLoader) ToProto() *proto.Loader {
	return &proto.Loader{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}
