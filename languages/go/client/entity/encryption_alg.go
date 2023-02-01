package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type EncryptionAlg int32

const (
	AES256GCM                   EncryptionAlg = iota
	RSA                         EncryptionAlg = iota
	ECIES                       EncryptionAlg = iota
	UNRECOGNIZED_ENCRYPTION_ALG EncryptionAlg = -1
)

var (
	EncryptionAlgFromProto = map[proto.EncryptionAlg]EncryptionAlg{
		0: AES256GCM,
		1: RSA,
		2: ECIES,
	}
	EncryptionAlgToProto = map[EncryptionAlg]proto.EncryptionAlg{
		AES256GCM: 0,
		RSA:       1,
		ECIES:     2,
	}
)
