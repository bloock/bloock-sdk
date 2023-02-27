package integrity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Anchor struct {
	Id         int64
	BlockRoots []string
	Networks   []AnchorNetwork
	Root       string
	Status     string
}

func NewAnchorFromProto(a *proto.Anchor) Anchor {
	if a == nil {
		return Anchor{}
	}

	return Anchor{
		Id:         a.Id,
		BlockRoots: a.BlockRoots,
		Networks:   MapAnchorNetworksFromProto(a.Networks),
		Root:       a.Root,
		Status:     a.Status,
	}
}
