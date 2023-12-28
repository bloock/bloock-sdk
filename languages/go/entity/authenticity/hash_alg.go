package authenticity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type HashAlg int32

const (
	Sha256       HashAlg = iota
	Keccak256    HashAlg = iota
	Poseidon     HashAlg = iota
	None         HashAlg = iota
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
