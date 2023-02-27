package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Encrypter interface {
	ToProto() *proto.Encrypter
}
