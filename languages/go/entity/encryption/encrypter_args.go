package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type EncrypterArgs struct {
	Key string
}

func (e EncrypterArgs) ToProto() *proto.EncrypterArgs {
	return &proto.EncrypterArgs{
		Key: e.Key,
	}
}
