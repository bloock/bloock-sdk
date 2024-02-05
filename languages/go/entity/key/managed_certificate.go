package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// ManagedCertificate represents a managed certificate with its details.
type ManagedCertificate struct {
	// ID is the identifier of the managed certificate (ex: 2abae00b-f3d9-410c-abdf-1ea391d633aa).
	ID         string
	// Protection is the protection level for the key.
	Protection KeyProtectionLevel
	// KeyType is the type of the key.
	KeyType    KeyType
	// Expiration is the timestamp indicating when the certificate expires.
	Expiration int64
	// Key is the certificate public key.
	Key        string
}

func NewManagedCertificateFromProto(s *proto.ManagedCertificate) ManagedCertificate {
	if s == nil {
		return ManagedCertificate{}
	}
	return ManagedCertificate{
		ID:         s.Id,
		Protection: KeyProtectionLevelFromProto[s.Protection],
		KeyType:    KeyTypeFromProto[s.KeyType],
		Expiration: s.GetExpiration(),
		Key:        s.Key,
	}
}

func (s ManagedCertificate) ToProto() *proto.ManagedCertificate {
	return &proto.ManagedCertificate{
		Id:         s.ID,
		Protection: KeyProtectionLevelToProto[s.Protection],
		KeyType:    KeyTypeToProto[s.KeyType],
		Expiration: s.Expiration,
		Key:        s.Key,
	}
}
