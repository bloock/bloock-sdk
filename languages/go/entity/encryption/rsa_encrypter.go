package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type RsaEncrypter struct {
	Alg  proto.EncryptionAlg
	Args EncrypterArgs
}

func NewRsaEncrypter(key string) RsaEncrypter {
	return RsaEncrypter{
		Alg: proto.EncryptionAlg_RSA,
		Args: EncrypterArgs{
			Key: key,
		},
	}
}

func (e RsaEncrypter) ToProto() *proto.Encrypter {
	return &proto.Encrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}
