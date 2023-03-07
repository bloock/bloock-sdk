package encryption

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type RsaEncrypter struct {
	Alg  proto.EncryptionAlg
	Args EncrypterArgs
}

func NewRsaEncrypter(args EncrypterArgs) RsaEncrypter {
	return RsaEncrypter{
		Alg:  proto.EncryptionAlg_RSA,
		Args: args,
	}
}

func (s RsaEncrypter) ToProto() *proto.Encrypter {
	var localKey *proto.LocalKey
	if s.Args.LocalKey != nil {
		localKey = s.Args.LocalKey.ToProto()
	} else if s.Args.Key != "" {
		localKey = key.LocalKey{
			Key: s.Args.Key,
		}.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.Args.ManagedKey != nil {
		managedKey = s.Args.ManagedKey.ToProto()
	}

	return &proto.Encrypter{
		Alg:        s.Alg,
		LocalKey:   localKey,
		ManagedKey: managedKey,
	}
}
