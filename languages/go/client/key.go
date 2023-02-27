package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type KeyClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewKeyClient() KeyClient {
	return KeyClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewKeyClientWithConfig(configData *proto.ConfigData) KeyClient {
	return KeyClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

func (c *KeyClient) NewLocalKey(keyType key.KeyType) (key.LocalKey, error) {
	res, err := c.bridgeClient.Key().GenerateLocalKey(context.Background(), &proto.GenerateLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    key.KeyTypeToProto[key.Rsa2048],
	})

	if err != nil {
		return key.LocalKey{}, err
	}

	if res.Error != nil {
		return key.LocalKey{}, errors.New(res.Error.Message)
	}

	return key.NewLocalKeyFromProto(res.GetLocalKey()), nil
}

func (c *KeyClient) NewManagedKey(params key.ManagedKeyParams) (key.ManagedKey, error) {
	res, err := c.bridgeClient.Key().GenerateManagedKey(context.Background(), &proto.GenerateManagedKeyRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return key.ManagedKey{}, err
	}

	if res.Error != nil {
		return key.ManagedKey{}, errors.New(res.Error.Message)
	}

	return key.NewManagedKeyFromProto(res.GetManagedKey()), nil
}
