package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type LocalKey struct {
	Key        string
	PrivateKey string
}

func NewLocalKeyFromProto(s *proto.LocalKey) LocalKey {
	if s == nil {
		return LocalKey{}
	}
	return LocalKey{
		Key:        s.GetKey(),
		PrivateKey: s.GetPrivateKey(),
	}
}

func (s LocalKey) ToProto() *proto.LocalKey {
	return &proto.LocalKey{
		Key:        s.Key,
		PrivateKey: &s.PrivateKey,
	}
}
