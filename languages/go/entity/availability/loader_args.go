package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type LoaderArgs struct {
	Id string
}

func (e LoaderArgs) ToProto() *proto.LoaderArgs {
	return &proto.LoaderArgs{
		Id: e.Id,
	}
}
