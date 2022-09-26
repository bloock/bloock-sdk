package bloock

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Network = proto.Network
type NetworkConfig = proto.NetworkConfig

type networks struct {
	BloockChain     Network
	EthereumRinkeby Network
	EthereumMainnet Network
}

func ListOfNetworks() networks {
	return networks{
		BloockChain:     proto.Network_BLOOCK_CHAIN,
		EthereumRinkeby: proto.Network_ETHEREUM_RINKEBY,
		EthereumMainnet: proto.Network_ETHEREUM_MAINNET,
	}
}

type AnchorParams struct {
	Timeout int64
}

func NewAnchorParams() AnchorParams {
	return AnchorParams{}
}

type NetworkParams struct {
	Network Network
}

func NewNetworkParams() NetworkParams {
	return NetworkParams{}
}

const (
	InvalidRecordError     = "Record error: Invalid record"
	RecordNotFoundError    = "Infrastructure error: Http Client error: Request error - API connected by HttpClient found an error: record not found"
	WaitAnchorTimeoutError = "Anchor error: Wait Anchor timed out"
	AnchorNotFoundError    = "Infrastructure error: Http Client error: API connected by HttpClient found an error: anchor not found"
)
