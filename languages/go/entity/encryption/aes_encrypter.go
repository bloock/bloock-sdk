package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type AesEncrypter struct {
	Alg  proto.EncryptionAlg
	Args EncrypterArgs
}

func NewAesEncrypter(password string) AesEncrypter {
	return AesEncrypter{
		Alg: proto.EncryptionAlg_A256GCM,
		Args: EncrypterArgs{
			Key: password,
		},
	}
}

func (e AesEncrypter) ToProto() *proto.Encrypter {
	return &proto.Encrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}
