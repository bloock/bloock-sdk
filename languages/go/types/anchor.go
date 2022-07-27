package types

type Anchor struct {
	id         int       `json:"id"`
	blockRoots []string  `json:"block_roots"`
	networks   []Network `json:"networks"`
	root       string    `json:"root"`
	status     string    `json:"status"`
}

type AnchorParams struct {
	Timeout int
}

func NewAnchor(id int, blockRoots []string, networks []Network, root, status string) Anchor {
	return Anchor{
		id:         id,
		blockRoots: blockRoots,
		networks:   networks,
		root:       root,
		status:     status,
	}
}

func (a Anchor) ID() int {
	return a.id
}

func (a Anchor) BlockRoots() []string {
	return a.blockRoots
}

func (a Anchor) Networks() []Network {
	return a.networks
}

func (a Anchor) Root() string {
	return a.root
}

func (a Anchor) Status() string {
	return a.status
}
