package encryption

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type EncryptionAlg int32

const (
	AES256GCM                   EncryptionAlg = iota
	AES256GCM_M                 EncryptionAlg = iota
	RSA                         EncryptionAlg = iota
	RSA_M                       EncryptionAlg = iota
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
