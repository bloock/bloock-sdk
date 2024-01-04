package bloock

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

var ApiKey string
var ApiHost string
var ForceEnv string = ""
var IdentityApiHost string = ""
var DisableAnalytics bool = false
var NetworkConfig map[int32]*proto.NetworkConfig = make(map[int32]*proto.NetworkConfig)

func SetProvider(network integrity.Network, provider string) {
	if _, ok := NetworkConfig[int32(network)]; ok {
		NetworkConfig[int32(network.Number())].HttpProvider = provider
	} else {
		NetworkConfig[int32(network.Number())] = &proto.NetworkConfig{
			HttpProvider: provider,
		}
	}
}

func SetContractAddess(network integrity.Network, contractAddress string) {
	if _, ok := NetworkConfig[int32(network)]; ok {
		NetworkConfig[int32(network.Number())].ContractAddress = contractAddress
	} else {
		NetworkConfig[int32(network.Number())] = &proto.NetworkConfig{
			ContractAddress: contractAddress,
		}
	}
}
