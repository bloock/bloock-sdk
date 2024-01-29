package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type AccessControlSecret struct {
	Secret   string
}

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