package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Signer interface {
	ToProto() *proto.Signer
}

type EcsdaSigner struct {
	Alg  string
	Args SignerArgs
}

func NewEcsdaSigner(privateKey string) EcsdaSigner {
    return EcsdaSigner{
    	Alg:  "ECSDA",
    	Args: SignerArgs{
    		PrivateKey: privateKey,
    	},
    }
}

func (s EcsdaSigner) ToProto() *proto.Signer {
	return &proto.Signer{
		Alg:  s.Alg,
		Args: s.Args.ToProto(),
	}
}

type SignerArgs struct {
	PrivateKey string
}

func (s SignerArgs) ToProto() *proto.SignerArgs {
	return &proto.SignerArgs{
		PrivateKey: s.PrivateKey,
	}
}
