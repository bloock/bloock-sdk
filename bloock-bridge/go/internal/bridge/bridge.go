package bridge

import "github.com/bloock/go-bridge/internal/bridge/proto"

type BloockBridge struct {
	greeting proto.GreeterClient
}

func NewBloockBridge() BloockBridge {
	conn := NewBloockConnection()
	return BloockBridge{
		greeting: proto.NewGreeterClient(conn),
	}
}

func (b *BloockBridge) Greeting() proto.GreeterClient {
	return b.greeting
}
