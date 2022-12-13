package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Decrypter interface {
	ToProto() *proto.Decrypter
}

type AesDecrypter struct {
	Alg  proto.EncryptionAlg
	Args DecrypterArgs
}

func NewAesDecrypter(password string) AesDecrypter {
	return AesDecrypter{
		Alg: proto.EncryptionAlg_A256GCM,
		Args: DecrypterArgs{
			Key: password,
		},
	}
}

func (e AesDecrypter) ToProto() *proto.Decrypter {
	return &proto.Decrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}

type RsaDecrypter struct {
	Alg  proto.EncryptionAlg
	Args DecrypterArgs
}

func NewRsaDecrypter(key string) RsaDecrypter {
	return RsaDecrypter{
		Alg: proto.EncryptionAlg_RSA,
		Args: DecrypterArgs{
			Key: key,
		},
	}
}

func (e RsaDecrypter) ToProto() *proto.Decrypter {
	return &proto.Decrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}

type EciesDecrypter struct {
	Alg  proto.EncryptionAlg
	Args DecrypterArgs
}

func NewEciesDecrypter(key string) RsaDecrypter {
	return RsaDecrypter{
		Alg: proto.EncryptionAlg_ECIES,
		Args: DecrypterArgs{
			Key: key,
		},
	}
}

func (e EciesDecrypter) ToProto() *proto.Decrypter {
	return &proto.Decrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}

type DecrypterArgs struct {
	Key string
}

func (e DecrypterArgs) ToProto() *proto.DecrypterArgs {
	return &proto.DecrypterArgs{
		Key: e.Key,
	}
}
