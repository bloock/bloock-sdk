package client

import (
	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/client/entity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

func SetNetworkConfig(network entity.Network, config entity.NetworkConfig) {
	bloock.NetworkConfig[int32(network)] = &proto.NetworkConfig{
		ContractAddress: config.ContractAddress,
		ContractAbi:     config.ContractAbi,
		HttpProvider:    config.HttpProvider,
	}
}
