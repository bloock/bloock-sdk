package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IpfsLoader represents a loader for IPFS data availability.
type IpfsLoader struct {
	Type proto.DataAvailabilityType
	Args LoaderArgs
}

// NewIpfsLoader creates an IpfsLoader instance with the provided IPFS hash.
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
