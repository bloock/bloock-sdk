package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

// Signer represents a signer with various key types and additional configurations.
type Signer struct {
	LocalKey           *key.LocalKey
	ManagedKey         *key.ManagedKey
	ManagedCertificate *key.ManagedCertificate
	LocalCertificate   *key.LocalCertificate
	HashAlg            *HashAlg
	AccessControl      *key.AccessControl
}

// NewSignerWithLocalKey creates a Signer instance with a local key and specified hash algorithm.
func NewSignerWithLocalKey(key key.LocalKey, hashAlg *HashAlg) Signer {
	return Signer{
		LocalKey: &key,
		HashAlg:  hashAlg,
	}
}

// NewSignerWithManagedKey creates a Signer instance with a managed key, specified hash algorithm,
// and access control configuration.
func NewSignerWithManagedKey(key key.ManagedKey, hashAlg *HashAlg, accessControl *key.AccessControl) Signer {
	return Signer{
		ManagedKey:    &key,
		HashAlg:       hashAlg,
		AccessControl: accessControl,
	}
}

// NewSignerWithLocalCertificate creates a Signer instance with a local certificate and specified hash algorithm.
func NewSignerWithLocalCertificate(key key.LocalCertificate, hashAlg *HashAlg) Signer {
	return Signer{
		LocalCertificate: &key,
		HashAlg:          hashAlg,
	}
}

// NewSignerWithManagedCertificate creates a Signer instance with a managed certificate, specified hash algorithm,
// and access control configuration.
func NewSignerWithManagedCertificate(key key.ManagedCertificate, hashAlg *HashAlg, accessControl *key.AccessControl) Signer {
	return Signer{
		ManagedCertificate: &key,
		HashAlg:            hashAlg,
		AccessControl:      accessControl,
	}
}

func (s Signer) ToProto() *proto.Signer {
	var localKey *proto.LocalKey
	if s.LocalKey != nil {
		localKey = s.LocalKey.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.ManagedKey != nil {
		managedKey = s.ManagedKey.ToProto()
	}

	var managedCertificate *proto.ManagedCertificate
	if s.ManagedCertificate != nil {
		managedCertificate = s.ManagedCertificate.ToProto()
	}

	var localCertificate *proto.LocalCertificate
	if s.LocalCertificate != nil {
		localCertificate = s.LocalCertificate.ToProto()
	}

	var hashAlg *proto.HashAlg
	if s.HashAlg != nil {
		hashAlg = HashAlgToProto[*s.HashAlg]
	}

	var accessControl *proto.AccessControl
	if s.AccessControl != nil {
		accessControl = s.AccessControl.ToProto()
	}

	return &proto.Signer{
		LocalKey:           localKey,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
		LocalCertificate:   localCertificate,
		HashAlg:            hashAlg,
		AccessControl:      accessControl,
	}
}
