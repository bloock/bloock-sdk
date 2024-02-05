package integrity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

// Network represents a network.
type Network = proto.Network

func NetworkToProto(network Network) *proto.Network {
	if network == -1 {
		return nil
	}
	return &network
}

// networks represents a set of predefined networks.
type networks struct {
	BloockChain     Network
	EthereumGnosis  Network
	EthereumMainnet Network
	EthereumGoerli  Network
	EthereumPolygon Network
}

// ListOfNetworks returns a networks instance with predefined network values.
func ListOfNetworks() networks {
	return networks{
		BloockChain:     proto.Network_BLOOCK_CHAIN,
		EthereumGnosis:  proto.Network_GNOSIS_CHAIN,
		EthereumMainnet: proto.Network_ETHEREUM_MAINNET,
		EthereumGoerli:  proto.Network_ETHEREUM_GOERLI,
		EthereumPolygon: proto.Network_POLYGON_CHAIN,
	}
}

// AnchorParams represents parameters for anchor-related operations.
type AnchorParams struct {
	Timeout int64
}

// NewAnchorParams creates a new AnchorParams instance with default values.
func NewAnchorParams() AnchorParams {
	return AnchorParams{}
}

// NetworkParams represents parameters for network-related operations.
type NetworkParams struct {
	Network Network
}

// NewNetworkParams creates a new NetworkParams instance with default values.
func NewNetworkParams() NetworkParams {
	return NetworkParams{
		Network: -1,
	}
}

const (
	InvalidRecordError     = "Record error: Invalid record"
	RecordNotFoundError    = "Infrastructure error: Http Client error: Request error - API connected by HttpClient found an error: record not found"
	WaitAnchorTimeoutError = "Anchor error: Wait Anchor timed out"
	AnchorNotFoundError    = "Infrastructure error: Http Client error: API connected by HttpClient found an error: anchor not found"
)
