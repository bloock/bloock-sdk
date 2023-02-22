package entity

import "github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"

type Network = proto.Network

func NetworkToProto(network Network) *proto.Network {
	if network == -1 {
		return nil
	}
	return &network
}

type networks struct {
	BloockChain     Network
	EthereumGnosis  Network
	EthereumMainnet Network
	EthereumGoerli  Network
}

func ListOfNetworks() networks {
	return networks{
		BloockChain:     proto.Network_BLOOCK_CHAIN,
		EthereumGnosis:  proto.Network_GNOSIS_CHAIN,
		EthereumMainnet: proto.Network_ETHEREUM_MAINNET,
		EthereumGoerli:  proto.Network_ETHEREUM_GOERLI,
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