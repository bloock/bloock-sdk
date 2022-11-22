package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Proof struct {
	Leaves []string
	Nodes  []string
	Depth  string
	Bitmap string
	Anchor ProofAnchor
}

func NewProofFromProto(p *proto.Proof) Proof {
	if p == nil {
		return Proof{}
	}
	return Proof{
		Leaves: p.Leaves,
		Nodes:  p.Nodes,
		Depth:  p.Depth,
		Bitmap: p.Bitmap,
		Anchor: NewProofAnchorFromProto(p.Anchor),
	}
}

func (p Proof) ToProto() *proto.Proof {
	return &proto.Proof{
		Leaves: p.Leaves,
		Nodes:  p.Nodes,
		Depth:  p.Depth,
		Bitmap: p.Bitmap,
		Anchor: p.Anchor.ToProto(),
	}
}

type ProofAnchor struct {
	AnchorID int64
	Networks []AnchorNetwork
	Root     string
	Status   string
}

func NewProofAnchorFromProto(p *proto.ProofAnchor) ProofAnchor {
	if p == nil {
		return ProofAnchor{}
	}
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
