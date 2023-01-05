package bridge

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BloockBridge struct {
	anchor  proto.AnchorServiceClient
	record  proto.RecordServiceClient
	proof   proto.ProofServiceClient
	webhook proto.WebhookServiceClient
}

func NewBloockBridge() BloockBridge {
	conn := NewBloockConnection()
	return BloockBridge{
		anchor:  proto.NewAnchorServiceClient(conn),
		record:  proto.NewRecordServiceClient(conn),
		proof:   proto.NewProofServiceClient(conn),
		webhook: proto.NewWebhookServiceClient(conn),
	}
}

func (b *BloockBridge) Anchor() proto.AnchorServiceClient {
	return b.anchor
}

func (b *BloockBridge) Record() proto.RecordServiceClient {
	return b.record
}

func (b *BloockBridge) Proof() proto.ProofServiceClient {
	return b.proof
}

func (b *BloockBridge) Webhook() proto.WebhookServiceClient {
	return b.webhook
}
