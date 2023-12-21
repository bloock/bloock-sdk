package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IdentityKey interface {
	ToProto() *proto.IdentityKey
}
