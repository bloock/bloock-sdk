package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type EnsArgs struct {
	PrivateKey string
}

type EnsSigner struct {
	Alg  proto.SignerAlg
	Args SignerArgs
}

func NewEnsSigner(args EnsArgs) EcdsaSigner {
	return EcdsaSigner{
		Alg: proto.SignerAlg_ENS,
		Args: SignerArgs{
			PrivateKey: args.PrivateKey,
		},
	}
}

func (s EnsSigner) ToProto() *proto.Signer {
	return &proto.Signer{
		Alg:  s.Alg,
		Args: s.Args.ToProto(),
	}
}
