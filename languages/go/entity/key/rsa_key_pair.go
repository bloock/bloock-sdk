package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

func NewRsaKeyPairFromProto(k *proto.GenerateLocalKeyResponse) KeyPair {
	if k == nil {
		return KeyPair{}
	}
	return KeyPair{
		PublicKey:  k.LocalKey.Key,
		PrivateKey: *k.LocalKey.PrivateKey,
	}
}
