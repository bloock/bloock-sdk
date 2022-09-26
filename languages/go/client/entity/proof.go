package entity

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Proof struct {
	leaves []string
	nodes  []string
	depth  string
	bitmap string
	anchor ProofAnchor
}

func NewProofFromProto(p *proto.Proof) Proof {
	return Proof{
		leaves: p.Leaves,
		nodes:  p.Nodes,
		depth:  p.Depth,
		bitmap: p.Bitmap,
		anchor: NewProofAnchorFromProto(p.Anchor),
	}
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

func NewProofAnchorFromProto(p *proto.ProofAnchor) ProofAnchor {
	return ProofAnchor{
		AnchorID: p.AnchorId,
		Networks: MapAnchorNetworksFromProto(p.Networks),
		Root:     p.Root,
		Status:   p.Status,
	}
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
