package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

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
