package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Identity struct {
	Mnemonic   string
	Key        string
	PrivateKey string
}

func NewIdentityFromProto(s *proto.Identity) Identity {
	if s == nil {
		return Identity{}
	}
	return Identity{
		Mnemonic:   s.Mnemonic,
		Key:        s.Key,
		PrivateKey: s.PrivateKey,
	}
}

func (c Identity) ToProto() *proto.Identity {
	return &proto.Identity{
		Mnemonic:   c.Mnemonic,
		Key:        c.Key,
		PrivateKey: c.PrivateKey,
	}
}
