package types

type Network string

const (
	EthereumMainnet Network = "ethereum_mainnet"
	GnosisChain     Network = "gnosis_chain"
	EthereumRinkeby Network = "ethereum_rinkeby"
	BloockChain     Network = "bloock_chain"
)

type NetworkDetail struct {
	Name   string `json:"name"`
	State  string `json:"state"`
	TxHash string `json:"tx_hash"`
}
