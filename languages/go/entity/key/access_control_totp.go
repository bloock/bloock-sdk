package key

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type AccessControlTotp struct {
	Code string
}

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
