package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type CredentialReceipt struct {
	Id       string
	AnchorID int64
}

func NewCredentialReceiptFromProto(s *proto.CredentialReceipt) CredentialReceipt {
	if s == nil {
		return CredentialReceipt{}
	}
	return CredentialReceipt{
		Id:       s.Id,
		AnchorID: s.AnchorId,
	}
}

func (c CredentialReceipt) ToProto() *proto.CredentialReceipt {
	return &proto.CredentialReceipt{
		Id:       c.Id,
		AnchorId: c.AnchorID,
	}
}
