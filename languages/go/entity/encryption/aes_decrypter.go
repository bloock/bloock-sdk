package encryption

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type AesDecrypter struct {
	Alg  proto.EncryptionAlg
	Args DecrypterArgs
}

func NewAesDecrypter(args DecrypterArgs) AesDecrypter {
	return AesDecrypter{
		Alg:  proto.EncryptionAlg_A256GCM,
		Args: args,
	}
}

func (s AesDecrypter) ToProto() *proto.Decrypter {
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

	return &proto.Decrypter{
		Alg:        s.Alg,
		LocalKey:   localKey,
		ManagedKey: managedKey,
	}
}
