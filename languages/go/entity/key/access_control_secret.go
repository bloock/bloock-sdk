package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// AccessControlSecret represents a secret used for secret-based access control.
type AccessControlSecret struct {
	Secret   string
}

// NewAccessControlSecret creates a new AccessControlSecret instance with the provided secret.
func NewAccessControlSecret(secret string) *AccessControlSecret {
	return &AccessControlSecret{
		Secret: secret,
	}
}

func (a AccessControlSecret) ToProto() *proto.AccessControlSecret {
	return &proto.AccessControlSecret{
		Secret: a.Secret,
	}
}