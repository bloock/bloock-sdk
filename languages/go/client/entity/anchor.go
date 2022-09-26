package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Anchor struct {
	Id         int64
	BlockRoots []string
	Networks   []AnchorNetwork
	Root       string
	Status     string
}

func NewAnchorFromProto(a *proto.Anchor) Anchor {
	return Anchor{
		Id:         a.Id,
		BlockRoots: a.BlockRoots,
		Networks:   MapAnchorNetworksFromProto(a.Networks),
		Root:       a.Root,
		Status:     a.Status,
	}
}

type AnchorNetwork struct {
	Name   string
	State  string
	TxHash string
}

func NewAnchorNetworkFromProto(a *proto.AnchorNetwork) AnchorNetwork {
	return AnchorNetwork{
		Name:   a.Name,
		State:  a.State,
		TxHash: a.TxHash,
	}
}

func MapAnchorNetworksFromProto(n []*proto.AnchorNetwork) []AnchorNetwork {
	networks := make([]AnchorNetwork, len(n))
	for i, network := range n {
		networks[i] = NewAnchorNetworkFromProto(network)
	}
	return networks
}

func (a AnchorNetwork) ToProto() *proto.AnchorNetwork {
	return &proto.AnchorNetwork{
		Name:   a.Name,
		State:  a.State,
		TxHash: a.TxHash,
	}
}
