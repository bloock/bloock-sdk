package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type ManagedCertificate struct {
	ID         string
	Protection KeyProtectionLevel
	KeyType    KeyType
	Expiration int64
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
