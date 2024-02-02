package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// LocalKey represents a local key with its public and private components.
type LocalKey struct {
	// Key is the public key.
	Key        string
	// PrivateKey is the private key.
	PrivateKey string
	// KeyType is the type of the key.
	KeyType    KeyType
}

func NewLocalKeyFromProto(s *proto.LocalKey) LocalKey {
	if s == nil {
		return LocalKey{}
	}
	return LocalKey{
		Key:        s.GetKey(),
		PrivateKey: s.GetPrivateKey(),
		KeyType:    KeyTypeFromProto[s.KeyType],
	}
}

func (s LocalKey) ToProto() *proto.LocalKey {
	return &proto.LocalKey{
		Key:        s.Key,
		PrivateKey: &s.PrivateKey,
		KeyType:    KeyTypeToProto[s.KeyType],
	}
}
