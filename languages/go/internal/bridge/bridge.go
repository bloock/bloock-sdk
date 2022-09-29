package bridge

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type BloockBridge struct {
	greeting proto.GreeterClient
	anchor   proto.AnchorServiceClient
	record   proto.RecordServiceClient
	proof    proto.ProofServiceClient
}

func NewBloockBridge() BloockBridge {
	conn := NewBloockConnection()
	return BloockBridge{
		greeting: proto.NewGreeterClient(conn),
		anchor:   proto.NewAnchorServiceClient(conn),
		record:   proto.NewRecordServiceClient(conn),
		proof:    proto.NewProofServiceClient(conn),
	}
}

func (b *BloockBridge) Greeting() proto.GreeterClient {
	return b.greeting
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
