package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

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
