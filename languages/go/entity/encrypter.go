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

type EciesEncrypter struct {
	Alg  proto.EncryptionAlg
	Args EncrypterArgs
}

func NewEciesEncrypter(key string) RsaEncrypter {
	return RsaEncrypter{
		Alg: proto.EncryptionAlg_ECIES,
		Args: EncrypterArgs{
			Key: key,
		},
	}
}

func (e EciesEncrypter) ToProto() *proto.Encrypter {
	return &proto.Encrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}

type EncrypterArgs struct {
	Key string
}

func (e EncrypterArgs) ToProto() *proto.EncrypterArgs {
	return &proto.EncrypterArgs{
		Key: e.Key,
	}
}
