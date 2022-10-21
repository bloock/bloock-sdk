package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Encrypter interface {
	ToProto() *proto.Encrypter
}

type AesEncrypter struct {
	Alg  proto.EncryptionAlg
	Args EncrypterArgs
}

func NewAesEncrypter(password string) AesEncrypter {
	return AesEncrypter{
		Alg: proto.EncryptionAlg_A256GCM,
		Args: EncrypterArgs{
			Password: password,
		},
	}
}

func (e AesEncrypter) ToProto() *proto.Encrypter {
	return &proto.Encrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}

type EncrypterArgs struct {
	Password string
}

func (e EncrypterArgs) ToProto() *proto.EncrypterArgs {
	return &proto.EncrypterArgs{
		Password: e.Password,
	}
}
