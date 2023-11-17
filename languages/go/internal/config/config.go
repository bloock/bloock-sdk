package config

import (
	"github.com/bloock/bloock-sdk-go/v2"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

func NewConfigDataDefault() *proto.ConfigData {
	return &proto.ConfigData{
		Config: &proto.Configuration{
			LibraryName:      "Golang",
			Host:             bloock.ApiHost,
			ApiKey:           bloock.ApiKey,
			Environment:      &bloock.ForceEnv,
			DisableAnalytics: bloock.DisableAnalytics,
		},
		NetworksConfig: bloock.NetworkConfig,
	}
}

func NewConfigData(configData *proto.ConfigData) *proto.ConfigData {
	return configData
}
