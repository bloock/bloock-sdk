package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Encrypter interface {
    ToProto() *proto.Encrypter
}

type AesEncrypter struct {
	Alg  string
	Args EncrypterArgs
}

func NewAesEncrypter(secret string) AesEncrypter {
    return AesEncrypter{
    	Alg:  "AES",
    	Args: EncrypterArgs{
    		Secret: secret,
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
	Secret string
}

func (e EncrypterArgs) ToProto() *proto.EncrypterArgs {
	return &proto.EncrypterArgs{
		Secret: e.Secret,
	}
}
