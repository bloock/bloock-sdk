package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BjjIssuerKey struct {
	Args IssuerKeyArgs
}

func NewBjjIssuerKey(args IssuerKeyArgs) BjjIssuerKey {
	return BjjIssuerKey{
		Args: args,
	}
}

func (s BjjIssuerKey) ToProto() *proto.IssuerKey {
	var localKey *proto.LocalKey
	if s.Args.LocalKey != nil {
		localKey = s.Args.LocalKey.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.Args.ManagedKey != nil {
		managedKey = s.Args.ManagedKey.ToProto()
	}

	return &proto.IssuerKey{
		LocalKey:   localKey,
		ManagedKey: managedKey,
	}
}