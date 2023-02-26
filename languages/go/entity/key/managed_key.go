package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type ManagedKey struct {
	Name       string
	Protection KeyProtectionLevel
	KeyType    KeyType
	Expiration int64
	Key        string
}

func NewManagedKeyFromProto(s *proto.ManagedKey) ManagedKey {
	if s == nil {
		return ManagedKey{}
	}
	return ManagedKey{
		Name:       s.GetName(),
		Protection: KeyProtectionLevelFromProto[s.Protection],
		KeyType:    KeyTypeFromProto[s.KeyType],
		Expiration: s.GetExpiration(),
		Key:        s.Key,
	}
}

func (s ManagedKey) ToProto() *proto.ManagedKey {
	return &proto.ManagedKey{
		Name:       &s.Key,
		Protection: KeyProtectionLevelToProto[s.Protection],
		KeyType:    KeyTypeToProto[s.KeyType],
		Expiration: &s.Expiration,
		Key:        s.Key,
	}
}
