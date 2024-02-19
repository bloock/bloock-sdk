package identity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// IssuerStateReceipt represents a receipt for the issuer's state.
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
