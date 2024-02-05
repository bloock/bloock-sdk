package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// KeyType represents the type of cryptographic key.
type KeyType int32

const (
	// EcP256k represents the elliptic curve key type P-256k.
	EcP256k KeyType = iota
	// Rsa2048 represents the RSA key type with a 2048-bit modulus.
	Rsa2048 KeyType = iota
	// Rsa3072 represents the RSA key type with a 3072-bit modulus.
	Rsa3072 KeyType = iota
	// Rsa4096 represents the RSA key type with a 4096-bit modulus.
	Rsa4096 KeyType = iota
	// Aes128 represents the AES key type with a 128-bit key length.
	Aes128  KeyType = iota
	// Aes256 represents the AES key type with a 256-bit key length.
	Aes256  KeyType = iota
	// Bjj represents the Baby JubJub key type, elliptic curve defined over the large prime subgroup of BN128.
	Bjj     KeyType = iota
)

var (
	KeyTypeFromProto = map[proto.KeyType]KeyType{
		proto.KeyType_EcP256k: EcP256k,
		proto.KeyType_Rsa2048: Rsa2048,
		proto.KeyType_Rsa3072: Rsa3072,
		proto.KeyType_Rsa4096: Rsa4096,
		proto.KeyType_Aes128:  Aes128,
		proto.KeyType_Aes256:  Aes256,
		proto.KeyType_Bjj:     Bjj,
	}

	KeyTypeToProto = map[KeyType]proto.KeyType{
		EcP256k: proto.KeyType_EcP256k,
		Rsa2048: proto.KeyType_Rsa2048,
		Rsa3072: proto.KeyType_Rsa3072,
		Rsa4096: proto.KeyType_Rsa4096,
		Aes128:  proto.KeyType_Aes128,
		Aes256:  proto.KeyType_Aes256,
		Bjj:     proto.KeyType_Bjj,
	}
)
