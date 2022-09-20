package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type AnchorNetwork struct {
	Name   string
	State  string
	TxHash string
}

func (a AnchorNetwork) ToProto() *proto.AnchorNetwork {
	return &proto.AnchorNetwork{
		Name:   a.Name,
		State:  a.State,
		TxHash: a.TxHash,
	}
}
