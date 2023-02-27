package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type ManagedKeyParams struct {
	Name       string
	Protection KeyProtectionLevel
	KeyType    KeyType
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
