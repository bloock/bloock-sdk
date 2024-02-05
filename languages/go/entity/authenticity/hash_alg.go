package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// HashAlg represents different hash algorithms.
type HashAlg int32

// Constants representing specific hash algorithms.
const (
	// Sha256 represents the SHA-256 hash algorithm.
	Sha256       HashAlg = iota
	// Keccak256 represents the Keccak-256 hash algorithm.
	Keccak256    HashAlg = iota
	// Poseidon represents the Poseidon hash algorithm.
	Poseidon     HashAlg = iota
	// None represents no hash algorithm.
	None         HashAlg = iota
	// Unrecognized represents an unrecognized hash algorithm.
	Unrecognized HashAlg = -1
)

var (
	HashAlgFromProto = map[proto.HashAlg]HashAlg{
		proto.HashAlg_SHA_256:    Sha256,
		proto.HashAlg_KECCAK_256: Keccak256,
		proto.HashAlg_POSEIDON:   Poseidon,
		proto.HashAlg_NONE:       None,
	}

	HashAlgToProto = map[HashAlg]*proto.HashAlg{
		Sha256:    proto.HashAlg_SHA_256.Enum(),
		Keccak256: proto.HashAlg_KECCAK_256.Enum(),
		Poseidon:  proto.HashAlg_POSEIDON.Enum(),
		None:      proto.HashAlg_NONE.Enum(),
	}
)
