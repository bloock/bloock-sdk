package types

type Proof struct {
	Leaves []string `json:"leaves"`
	Nodes  []string `json:"nodes"`
	Depth  string   `json:"depth"`
	Bitmap string   `json:"bitmap"`
}

func NewProof(leaves, nodes []string, depth, bitmap string) Proof {
	return Proof{
		Leaves: leaves,
		Nodes:  nodes,
		Depth:  depth,
		Bitmap: bitmap,
	}
}
