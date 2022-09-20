package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Proof struct {
	leaves []string
	nodes  []string
	depth  string
	bitmap string
	anchor ProofAnchor
}

func (p Proof) ToProto() *proto.Proof {
	return &proto.Proof{
		Leaves: p.leaves,
		Nodes:  p.nodes,
		Depth:  p.depth,
		Bitmap: p.bitmap,
		Anchor: p.anchor.ToProto(),
	}
}

type ProofAnchor struct {
	AnchorID int64
	Networks []AnchorNetwork
	Root     string
	Status   string
}

func (p ProofAnchor) ToProto() *proto.ProofAnchor {
	networks := make([]*proto.AnchorNetwork, len(p.Networks))
	for i, network := range p.Networks {
		networks[i] = network.ToProto()
	}

	return &proto.ProofAnchor{
		AnchorId: p.AnchorID,
		Networks: networks,
		Root:     p.Root,
		Status:   p.Status,
	}
}
