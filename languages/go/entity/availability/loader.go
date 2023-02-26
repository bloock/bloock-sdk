package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Loader interface {
	ToProto() *proto.Loader
}
