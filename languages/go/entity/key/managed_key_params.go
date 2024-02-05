package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// ManagedKeyParams represents the parameters for creating a managed key.
type ManagedKeyParams struct {
	// Name is the name of the managed key.
	Name       string
	// Protection is the protection level for the key.
	Protection KeyProtectionLevel
	// KeyType is the type of the key.
	KeyType    KeyType
	// Expiration is the timestamp indicating when the key expires.
	Expiration int64
}

func NewManagedKeyParamsFromProto(s *proto.ManagedKeyParams) ManagedKeyParams {
	if s == nil {
		return ManagedKeyParams{}
	}
	return ManagedKeyParams{
		Name:       s.GetName(),
		Protection: KeyProtectionLevel(s.GetProtection()),
		KeyType:    KeyType(s.GetKeyType()),
		Expiration: s.GetExpiration(),
	}
}

func (s ManagedKeyParams) ToProto() *proto.ManagedKeyParams {
	return &proto.ManagedKeyParams{
		Name:       &s.Name,
		Protection: KeyProtectionLevelToProto[s.Protection],
		KeyType:    KeyTypeToProto[s.KeyType],
		Expiration: &s.Expiration,
	}
}
