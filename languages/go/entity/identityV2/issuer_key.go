package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IssuerKey interface {
	ToProto() *proto.IssuerKey
}
