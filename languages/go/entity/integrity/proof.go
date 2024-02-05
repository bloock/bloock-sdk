package integrity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// Proof represents a proof, including leaves, nodes, depth, bitmap, and anchor information.
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
