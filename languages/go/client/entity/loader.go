package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Loader interface {
	ToProto() *proto.Loader
}

type LoaderArgs struct {
	hash string
}

func (e LoaderArgs) ToProto() *proto.LoaderArgs {
	return &proto.LoaderArgs{
		Hash: e.hash,
	}
}

type HostedLoader struct {
	Type proto.DataAvailabilityType
	Args LoaderArgs
}

func NewHostedLoader(hash string) HostedLoader {
	return HostedLoader{
		Type: proto.DataAvailabilityType_HOSTED,
		Args: LoaderArgs{
			hash,
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
