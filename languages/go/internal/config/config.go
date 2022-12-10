package config

import (
	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

func NewConfigData() *proto.ConfigData {
	return &proto.ConfigData{
		Config: &proto.Configuration{
			LibraryName:      "Golang",
			Host:             bloock.ApiHost,
			ApiKey:           bloock.ApiKey,
			DisableAnalytics: bloock.DisableAnalytics,
		},
		NetworksConfig: bloock.NetworkConfig,
	}
}
