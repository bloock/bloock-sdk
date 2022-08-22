package bloock

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Record = proto.Record
type RecordReceipt = proto.RecordReceipt
type Anchor = proto.Anchor
type Proof = proto.Proof
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

const (
	InvalidRecordError     = "Record error: Invalid record"
	RecordNotFoundError    = "Infrastructure error: Http Client error: Request error - API connected by HttpClient found an error: record not found"
	WaitAnchorTimeoutError = "Anchor error: Wait Anchor timed out"
	AnchorNotFoundError    = "Infrastructure error: Http Client error: API connected by HttpClient found an error: anchor not found"
)
