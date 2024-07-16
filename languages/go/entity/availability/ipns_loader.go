package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IpnsLoader represents a loader for IPNS data availability.
type IpnsLoader struct {
	Type proto.DataAvailabilityType
	Args LoaderArgs
}

// NewIpnsLoader creates an IpnsLoader instance with the provided IPNS hash.
func NewIpnsLoader(hash string) IpfsLoader {
	return IpfsLoader{
		Type: proto.DataAvailabilityType_IPNS,
		Args: LoaderArgs{
			hash,
		},
	}
}

func (e IpnsLoader) ToProto() *proto.Loader {
	return &proto.Loader{
		Type: e.Type,
		Args: e.Args.ToProto(),
	}
}
