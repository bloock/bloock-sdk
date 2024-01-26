package encryption

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type Encrypter struct {
	LocalKey           *key.LocalKey
	ManagedKey         *key.ManagedKey
	ManagedCertificate *key.ManagedCertificate
	LocalCertificate   *key.LocalCertificate
	AccessControl      *key.AccessControl
}

func NewEncrypterWithLocalKey(key key.LocalKey) Encrypter {
	return Encrypter{
		LocalKey: &key,
	}
}

func NewEncrypterWithManagedKey(key key.ManagedKey, accessControl *key.AccessControl) Encrypter {
	return Encrypter{
		ManagedKey:    &key,
		AccessControl: accessControl,
	}
}

func NewEncrypterWithLocalCertificate(key key.LocalCertificate) Encrypter {
	return Encrypter{
		LocalCertificate: &key,
	}
}

func NewEncrypterWithManagedCertificate(key key.ManagedCertificate, accessControl *key.AccessControl) Encrypter {
	return Encrypter{
		ManagedCertificate: &key,
		AccessControl:      accessControl,
	}
}

func (s Encrypter) ToProto() *proto.Encrypter {
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

	var accessControl *proto.AccessControl
	if s.AccessControl != nil {
		accessControl = s.AccessControl.ToProto()
	}

	return &proto.Encrypter{
		LocalKey:           localKey,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
		LocalCertificate:   localCertificate,
		AccessControl:      accessControl,
	}
}
