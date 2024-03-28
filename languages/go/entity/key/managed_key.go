package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// ManagedKey represents a managed key.
type ManagedKey struct {
	// ID is the unique identifier of the managed key (ex: 46c49ee7-ef44-472c-a873-ce81a2d5d764).
	ID string
	// Name is the name of the managed key.
	Name string
	// Protection is the protection level for the key.
	Protection KeyProtectionLevel
	// KeyType is the type of the key.
	KeyType KeyType
	// Expiration is the timestamp indicating when the key expires.
	Expiration int64
	// Key is the actual public key.
	Key string
	// AccessControlType is the access control type for the key.
	AccessControlType AccessControlType
}

func NewManagedKeyFromProto(s *proto.ManagedKey) ManagedKey {
	if s == nil {
		return ManagedKey{}
	}
	return ManagedKey{
		ID:                s.Id,
		Name:              s.GetName(),
		Protection:        KeyProtectionLevelFromProto[s.Protection],
		KeyType:           KeyTypeFromProto[s.KeyType],
		Expiration:        s.GetExpiration(),
		Key:               s.Key,
		AccessControlType: AccessControlTypeFromProto[s.AccessControlType],
	}
}

func (s ManagedKey) ToProto() *proto.ManagedKey {
	return &proto.ManagedKey{
		Id:                s.ID,
		Name:              s.Name,
		Protection:        KeyProtectionLevelToProto[s.Protection],
		KeyType:           KeyTypeToProto[s.KeyType],
		Expiration:        s.Expiration,
		Key:               s.Key,
		AccessControlType: AccessControlTypeToProto[s.AccessControlType],
	}
}

func (s ManagedKey) Type() KeyType {
	return s.KeyType
}
