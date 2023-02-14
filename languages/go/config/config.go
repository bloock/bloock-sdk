package client

import (
	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/entity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

func SetProvider(network entity.Network, provider string) {
	if val, ok := bloock.NetworkConfig[int32(network)]; ok {
		val.HttpProvider = provider
	} else {
		bloock.NetworkConfig[int32(network)] = &proto.NetworkConfig{
			HttpProvider: provider,
		}
	}
}

func SetContractAddess(network entity.Network, contractAddess string) {
	if val, ok := bloock.NetworkConfig[int32(network)]; ok {
		val.ContractAddress = contractAddess
	} else {
		bloock.NetworkConfig[int32(network)] = &proto.NetworkConfig{
			ContractAddress: contractAddess,
		}
	}
}
