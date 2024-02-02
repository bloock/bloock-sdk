package integrity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// AnchorNetwork represents information about an anchor network.
type AnchorNetwork struct {
	Name   string
	State  string
	TxHash string
	Root   *string
}

func NewAnchorNetworkFromProto(a *proto.AnchorNetwork) AnchorNetwork {
	if a == nil {
		return AnchorNetwork{}
	}
	return AnchorNetwork{
		Name:   a.Name,
		State:  a.State,
		TxHash: a.TxHash,
		Root:   a.Root,
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
		Root:   a.Root,
	}
}
