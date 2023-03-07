package authenticity

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type EnsSigner struct {
	Alg  proto.SignerAlg
	Args SignerArgs
}

func NewEnsSigner(args SignerArgs) EnsSigner {
	return EnsSigner{
		Alg:  proto.SignerAlg_ENS,
		Args: args,
	}
}

func (s EnsSigner) ToProto() *proto.Signer {
	var localKey *proto.LocalKey
	if s.Args.LocalKey != nil {
		localKey = s.Args.LocalKey.ToProto()
	} else if s.Args.PrivateKey != "" {
		localKey = key.LocalKey{
			PrivateKey: s.Args.PrivateKey,
		}.ToProto()
	}

	var managedKey *proto.ManagedKey
	if s.Args.ManagedKey != nil {
		managedKey = s.Args.ManagedKey.ToProto()
	}

	return &proto.Signer{
		Alg:        s.Alg,
		LocalKey:   localKey,
		ManagedKey: managedKey,
		CommonName: s.Args.CommonName,
	}
}
