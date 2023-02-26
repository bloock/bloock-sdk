package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type DecrypterArgs struct {
	Key string
}

func (e DecrypterArgs) ToProto() *proto.DecrypterArgs {
	return &proto.DecrypterArgs{
		Key: e.Key,
	}
}
