package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Encrypter struct {
	Alg  string
	Args EncrypterArgs
}

func (e Encrypter) ToProto() *proto.Encrypter {
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
