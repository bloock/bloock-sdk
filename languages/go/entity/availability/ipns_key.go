package availability

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// IpnsKey represents an object with various key types.
type IpnsKey struct {
	ManagedKey         *key.ManagedKey
	ManagedCertificate *key.ManagedCertificate
}

// NewIpnsKeyWithManagedKey creates an IpnsKey instance with a managed key.
func NewIpnsKeyWithManagedKey(key key.ManagedKey) IpnsKey {
	return IpnsKey{
		ManagedKey: &key,
	}
}

// NewIpnsWithManagedCertificate creates an IpnsKey instance with a managed certificate.
/*func NewIpnsWithManagedCertificate(key key.ManagedCertificate) IpnsKey {
	return IpnsKey{
		ManagedCertificate: &key,
	}
}*/

func (s IpnsKey) ToProto() *proto.IpnsKey {
	var managedKey *proto.ManagedKey
	if s.ManagedKey != nil {
		managedKey = s.ManagedKey.ToProto()
	}

	var managedCertificate *proto.ManagedCertificate
	if s.ManagedCertificate != nil {
		managedCertificate = s.ManagedCertificate.ToProto()
	}

	return &proto.IpnsKey{
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
	}
}
