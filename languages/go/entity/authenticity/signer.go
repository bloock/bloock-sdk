package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type Signer struct {
	LocalKey           *key.LocalKey
	ManagedKey         *key.ManagedKey
	ManagedCertificate *key.ManagedCertificate
	LocalCertificate   *key.LocalCertificate
	HashAlg            *HashAlg
}

func NewSignerWithLocalKey(key key.LocalKey, hashAlg *HashAlg) Signer {
	return Signer{
		LocalKey: &key,
		HashAlg:  hashAlg,
	}
}

func NewSignerWithManagedKey(key key.ManagedKey, hashAlg *HashAlg) Signer {
	return Signer{
		ManagedKey: &key,
		HashAlg:    hashAlg,
	}
}

func NewSignerWithLocalCertificate(key key.LocalCertificate, hashAlg *HashAlg) Signer {
	return Signer{
		LocalCertificate: &key,
		HashAlg:          hashAlg,
	}
}

func NewSignerWithManagedCertificate(key key.ManagedCertificate, hashAlg *HashAlg) Signer {
	return Signer{
		ManagedCertificate: &key,
		HashAlg:            hashAlg,
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

	return &proto.Signer{
		LocalKey:           localKey,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
		LocalCertificate:   localCertificate,
		HashAlg:            hashAlg,
	}
}
