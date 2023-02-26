package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

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
