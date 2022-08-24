package bridge

import "github.com/bloock/go-bridge/internal/bridge/proto"

type BloockBridge struct {
	greeting proto.GreeterClient
	anchor   proto.AnchorServiceClient
}

func NewBloockBridge() BloockBridge {
	conn := NewBloockConnection()
	return BloockBridge{
		greeting: proto.NewGreeterClient(conn),
		anchor: proto.NewAnchorServiceClient(conn),
	}
}

func (b *BloockBridge) Greeting() proto.GreeterClient {
	return b.greeting
}

func (b *BloockBridge) Anchor() proto.AnchorServiceClient {
    return b.anchor
}