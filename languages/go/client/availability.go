package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/availability"
	"github.com/bloock/bloock-sdk-go/v2/entity/record"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type AvailabilityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewAvailabilityClient() AvailabilityClient {
	return AvailabilityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewAvailabilityClientWithConfig(configData *proto.ConfigData) AvailabilityClient {
	return AvailabilityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

func (c *AvailabilityClient) Publish(r record.Record, publisher availability.Publisher) (string, error) {
	res, err := c.bridgeClient.Availability().Publish(context.Background(), &proto.PublishRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Publisher:  publisher.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.Id, nil
}

func (c *AvailabilityClient) Retrieve(loader availability.Loader) (record.Record, error) {
	res, err := c.bridgeClient.Availability().Retrieve(context.Background(), &proto.RetrieveRequest{
		ConfigData: c.configData,
		Loader:     loader.ToProto(),
	})

	if err != nil {
		return record.Record{}, err
	}

	if res.Error != nil {
		return record.Record{}, errors.New(res.Error.Message)
	}

	return record.NewRecordFromProto(res.Record, c.configData), nil
}
