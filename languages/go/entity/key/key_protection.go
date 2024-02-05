package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// KeyProtectionLevel represents the protection level of a cryptographic key.
type KeyProtectionLevel int32

const (
	// KEY_PROTECTION_SOFTWARE indicates that the key is protected by software.
	KEY_PROTECTION_SOFTWARE KeyProtectionLevel = iota
	// KEY_PROTECTION_HSM indicates that the key is protected by a Hardware Security Module (HSM).
	KEY_PROTECTION_HSM      KeyProtectionLevel = iota
)

var (
	KeyProtectionLevelFromProto = map[proto.KeyProtectionLevel]KeyProtectionLevel{
		proto.KeyProtectionLevel_SOFTWARE: KEY_PROTECTION_SOFTWARE,
		proto.KeyProtectionLevel_HSM:      KEY_PROTECTION_HSM,
	}

	KeyProtectionLevelToProto = map[KeyProtectionLevel]proto.KeyProtectionLevel{
		KEY_PROTECTION_SOFTWARE: proto.KeyProtectionLevel_SOFTWARE,
		KEY_PROTECTION_HSM:      proto.KeyProtectionLevel_HSM,
	}
)
