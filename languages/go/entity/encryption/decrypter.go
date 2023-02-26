package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Decrypter interface {
	ToProto() *proto.Decrypter
}
