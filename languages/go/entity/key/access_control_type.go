package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// AccessControlType represents the access control type of a key.
type AccessControlType int32

const (
	// ACCESS_CONTROL_NONE indicates that the key is not protected by access control.
	ACCESS_CONTROL_NONE AccessControlType = iota
	// ACCESS_CONTROL_TOTP indicates that the key is protected by a TOTP-based access control.
	ACCESS_CONTROL_TOTP AccessControlType = iota
	// ACCESS_CONTROL_SECRET indicates that the key is protected by a SECRET-based access control.
	ACCESS_CONTROL_SECRET AccessControlType = iota
)

var (
	AccessControlTypeFromProto = map[proto.AccessControlType]AccessControlType{
		proto.AccessControlType_NO_ACCESS_CONTROL: ACCESS_CONTROL_NONE,
		proto.AccessControlType_TOTP:              ACCESS_CONTROL_TOTP,
		proto.AccessControlType_SECRET:            ACCESS_CONTROL_SECRET,
	}

	AccessControlTypeToProto = map[AccessControlType]proto.AccessControlType{
		ACCESS_CONTROL_NONE:   proto.AccessControlType_NO_ACCESS_CONTROL,
		ACCESS_CONTROL_TOTP:   proto.AccessControlType_TOTP,
		ACCESS_CONTROL_SECRET: proto.AccessControlType_SECRET,
	}
)
