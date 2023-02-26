package availability

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Publisher interface {
	ToProto() *proto.Publisher
}
