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
			Password: password,
		},
	}
}

func (e AesDecrypter) ToProto() *proto.Decrypter {
	return &proto.Decrypter{
		Alg:  e.Alg,
		Args: e.Args.ToProto(),
	}
}

type DecrypterArgs struct {
	Password string
}

func (e DecrypterArgs) ToProto() *proto.DecrypterArgs {
	return &proto.DecrypterArgs{
		Password: e.Password,
	}
}
