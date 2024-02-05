package integrity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// RecordReceipt represents a receipt for a record, including anchor ID, client, record, and status information.
type RecordReceipt struct {
	Anchor int64
	Client string
	Record string
	Status string
}

func NewRecordReceiptFromProto(r *proto.RecordReceipt) RecordReceipt {
	if r == nil {
		return RecordReceipt{}
	}
	return RecordReceipt{
		Anchor: r.Anchor,
		Client: r.Client,
		Record: r.Record,
		Status: r.Status,
	}
}
