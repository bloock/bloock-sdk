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
}

func NewSignerWithLocalKey(key key.LocalKey) Signer {
	return Signer{
		LocalKey: &key,
	}
}

func NewSignerWithManagedKey(key key.ManagedKey) Signer {
	return Signer{
		ManagedKey: &key,
	}
}

func NewSignerWithLocalCertificate(key key.LocalCertificate) Signer {
	return Signer{
		LocalCertificate: &key,
	}
}

func NewSignerWithManagedCertificate(key key.ManagedCertificate) Signer {
	return Signer{
		ManagedCertificate: &key,
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

	return &proto.Signer{
		LocalKey:           localKey,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
		LocalCertificate:   localCertificate,
	}
}
