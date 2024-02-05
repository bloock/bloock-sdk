package integrity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// ProofAnchor represents a proof anchor.
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
