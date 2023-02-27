package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

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
