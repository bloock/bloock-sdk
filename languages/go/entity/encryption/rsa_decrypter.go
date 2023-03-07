package encryption

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type RsaDecrypter struct {
	Alg  proto.EncryptionAlg
	Args DecrypterArgs
}

func NewRsaDecrypter(args DecrypterArgs) RsaDecrypter {
	return RsaDecrypter{
		Alg:  proto.EncryptionAlg_RSA,
		Args: args,
	}
}

func (s RsaDecrypter) ToProto() *proto.Decrypter {
	var localKey *proto.LocalKey
	if s.Args.LocalKey != nil {
		localKey = s.Args.LocalKey.ToProto()
	} else if s.Args.Key != "" {
		localKey = key.LocalKey{
			PrivateKey: s.Args.Key,
		}.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.Args.ManagedKey != nil {
		managedKey = s.Args.ManagedKey.ToProto()
	}

	return &proto.Decrypter{
		Alg:        s.Alg,
		LocalKey:   localKey,
		ManagedKey: managedKey,
	}
}
