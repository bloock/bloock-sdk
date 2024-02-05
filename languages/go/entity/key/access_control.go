package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// AccessControl represents access control information, including Time-based One-Time Password (TOTP) and secret-based access.
type AccessControl struct {
	AccessControlTotp   *AccessControlTotp
	AccessControlSecret *AccessControlSecret
}

func (a AccessControl) ToProto() *proto.AccessControl {
	var accessControlTotp *proto.AccessControlTotp
	if a.AccessControlTotp != nil {
		accessControlTotp = a.AccessControlTotp.ToProto()
	}
	var accessControlSecret *proto.AccessControlSecret
	if a.AccessControlSecret != nil {
		accessControlSecret = a.AccessControlSecret.ToProto()
	}

	return &proto.AccessControl{
		AccessControlTotp:   accessControlTotp,
		AccessControlSecret: accessControlSecret,
	}
}
