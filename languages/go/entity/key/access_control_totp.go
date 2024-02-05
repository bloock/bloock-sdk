package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// AccessControlTotp represents a Time-based One-Time Password ([TOTP]) code used for access control.
//
// [TOTP]: https://datatracker.ietf.org/doc/html/rfc6238
type AccessControlTotp struct {
	Code string
}

// NewAccessControlTotp creates a new AccessControlTotp instance with the provided TOTP code.
func NewAccessControlTotp(code string) *AccessControlTotp {
	return &AccessControlTotp{
		Code: code,
	}
}

func (a AccessControlTotp) ToProto() *proto.AccessControlTotp {
	return &proto.AccessControlTotp{
		Code: a.Code,
	}
}
