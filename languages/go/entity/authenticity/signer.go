package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Signer interface {
	ToProto() *proto.Signer
}
