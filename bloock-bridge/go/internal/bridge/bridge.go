package bridge

import (
	"github.com/bloock/go-bridge/internal/bridge/protos"
)

type BloockBridge struct {
	greeting protos.GreeterClient
}

func NewBloockBridge() BloockBridge {
	conn := NewBloockConnection()
	return BloockBridge{
		greeting: protos.NewGreeterClient(conn),
	}
}

func (b *BloockBridge) Greeting() protos.GreeterClient {
	return b.greeting
}
