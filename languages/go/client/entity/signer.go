package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Signer interface {
	ToProto() *proto.Signer
}

type EcdsaSigner struct {
	Alg  proto.SignerAlg
	Args SignerArgs
}

func NewEcdsaSigner(args SignerArgs) EcdsaSigner {
	return EcdsaSigner{
		Alg: proto.SignerAlg_ES256K,
		Args: SignerArgs{
			PrivateKey: args.PrivateKey,
			CommonName: args.CommonName,
		},
	}
}

func (s EcdsaSigner) ToProto() *proto.Signer {
	return &proto.Signer{
		Alg:  s.Alg,
		Args: s.Args.ToProto(),
	}
}

type SignerArgs struct {
	PrivateKey string
	CommonName *string
}

func (s SignerArgs) ToProto() *proto.SignerArgs {
	return &proto.SignerArgs{
		PrivateKey: &s.PrivateKey,
		CommonName: s.CommonName,
	}
}
