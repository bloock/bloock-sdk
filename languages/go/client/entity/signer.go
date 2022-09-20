package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Signer struct {
	Alg  string
	Args SignerArgs
}

func (s Signer) ToProto() *proto.Signer {
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
