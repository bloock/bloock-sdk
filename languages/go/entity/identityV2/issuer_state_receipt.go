package identityV2

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type IssuerStateReceipt struct {
	TxHash string
}

func NewIssuerStateReceiptFromProto(s *proto.IssuerStateReceipt) IssuerStateReceipt {
	if s == nil {
		return IssuerStateReceipt{}
	}
	return IssuerStateReceipt{
		TxHash: s.TxHash,
	}
}

func (i IssuerStateReceipt) ToProto() *proto.IssuerStateReceipt {
	return &proto.IssuerStateReceipt{
		TxHash: i.TxHash,
	}
}
