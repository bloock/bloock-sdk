package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// LoaderArgs represents the arguments for a data loader.
type LoaderArgs struct {
	// Id is a unique identifier associated with the loader.
	Id string
}

func (e LoaderArgs) ToProto() *proto.LoaderArgs {
	return &proto.LoaderArgs{
		Id: e.Id,
	}
}
