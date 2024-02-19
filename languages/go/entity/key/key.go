package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// Key represents a key entity that can be either a ManagedKey or a LocalKey.
type Key struct {
	LocalKey   *LocalKey
	ManagedKey *ManagedKey
}

func (s Key) ToProto() *proto.Key {
	var localKey *proto.LocalKey
	var managedKey *proto.ManagedKey

	if s.LocalKey != nil {
		localKey = s.LocalKey.ToProto()
	}

	if s.ManagedKey != nil {
		managedKey = s.ManagedKey.ToProto()
	}

	return &proto.Key{
		LocalKey:   localKey,
		ManagedKey: managedKey,
	}
}
