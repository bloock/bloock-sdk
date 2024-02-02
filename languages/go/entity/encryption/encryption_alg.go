package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// EncryptionAlg represents encryption algorithm types.
type EncryptionAlg int32

const (
	// AES256GCM represents the AES-256-GCM encryption algorithm.
	AES256GCM                   EncryptionAlg = iota
	// AES256GCM_M represents the AES-256-GCM with managed key encryption algorithm.
	AES256GCM_M                 EncryptionAlg = iota
	// RSA represents the RSA encryption algorithm.
	RSA                         EncryptionAlg = iota
	// RSA_M represents the RSA with managed key encryption algorithm.
	RSA_M                       EncryptionAlg = iota
	// UNRECOGNIZED_ENCRYPTION_ALG represents an unrecognized encryption algorithm.
	UNRECOGNIZED_ENCRYPTION_ALG EncryptionAlg = -1
)

var (
	EncryptionAlgFromProto = map[proto.EncryptionAlg]EncryptionAlg{
		0: AES256GCM,
		1: AES256GCM_M,
		2: RSA,
		3: RSA_M,
	}
	EncryptionAlgToProto = map[EncryptionAlg]proto.EncryptionAlg{
		AES256GCM:   0,
		AES256GCM_M: 0,
		RSA:         1,
		RSA_M:       1,
	}
)
