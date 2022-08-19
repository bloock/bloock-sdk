package main

import "github.com/bloock/go-bridge/internal/bridge/proto"

type Record = proto.Record
type RecordReceipt = proto.RecordReceipt
type Anchor = proto.Anchor
type Proof = proto.Proof
type Network = proto.Network
type NetworkConfig = proto.NetworkConfig

type networks struct {
	BloockChain     int32
	EthereumRinkeby int32
	EthereumMainnet int32
}

func ListOfNetworks() networks {
	return networks{
		BloockChain:     int32(proto.Network_BLOOCK_CHAIN),
		EthereumRinkeby: int32(proto.Network_ETHEREUM_RINKEBY),
		EthereumMainnet: int32(proto.Network_ETHEREUM_MAINNET),
	}
}
