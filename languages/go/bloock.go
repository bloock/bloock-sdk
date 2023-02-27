package bloock

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

var ApiKey string
var ApiHost string
var DisableAnalytics bool = false
var NetworkConfig map[int32]*proto.NetworkConfig = make(map[int32]*proto.NetworkConfig)

func SetProvider(network integrity.Network, provider string) {
	if val, ok := NetworkConfig[int32(network)]; ok {
		val.HttpProvider = provider
	} else {
		NetworkConfig[int32(network)] = &proto.NetworkConfig{
			HttpProvider: provider,
		}
	}
}

func SetContractAddess(network integrity.Network, contractAddess string) {
	if val, ok := NetworkConfig[int32(network)]; ok {
		val.ContractAddress = contractAddess
	} else {
		NetworkConfig[int32(network)] = &proto.NetworkConfig{
			ContractAddress: contractAddess,
		}
	}
}
