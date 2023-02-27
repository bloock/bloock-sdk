package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type KeyType int32

const (
	EcP256k KeyType = iota
	Rsa2048 KeyType = iota
	Rsa3072 KeyType = iota
	Rsa4096 KeyType = iota
)

var (
	KeyTypeFromProto = map[proto.KeyType]KeyType{
		proto.KeyType_EcP256k: EcP256k,
		proto.KeyType_Rsa2048: Rsa2048,
		proto.KeyType_Rsa3072: Rsa3072,
		proto.KeyType_Rsa4096: Rsa4096,
	}

	KeyTypeToProto = map[KeyType]proto.KeyType{
		EcP256k: proto.KeyType_EcP256k,
		Rsa2048: proto.KeyType_Rsa2048,
		Rsa3072: proto.KeyType_Rsa3072,
		Rsa4096: proto.KeyType_Rsa4096,
	}
)
