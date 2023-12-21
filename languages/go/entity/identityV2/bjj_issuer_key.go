package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BjjIdentityKey struct {
	Args IssuerKeyArgs
}

func NewBjjIdentityKey(args IssuerKeyArgs) BjjIdentityKey {
	return BjjIdentityKey{
		Args: args,
	}
}

func (s BjjIdentityKey) ToProto() *proto.IdentityKey {
	var localKey *proto.LocalKey
	if s.Args.LocalKey != nil {
		localKey = s.Args.LocalKey.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.Args.ManagedKey != nil {
		managedKey = s.Args.ManagedKey.ToProto()
	}

	return &proto.IdentityKey{
		LocalKey:   localKey,
		ManagedKey: managedKey,
	}
}
