package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// HostedLoader represents a loader for hosted data availability.
type HostedLoader struct {
	Type proto.DataAvailabilityType
	Args LoaderArgs
}

// NewHostedLoader creates a HostedLoader instance with the provided identifier (ex: c137fded-cb04-4c6e-9415-1e7baf48b659).
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
