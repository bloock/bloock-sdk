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

// AvailabilityClient represents a client for interacting with the [Bloock Availability service].
//
// [Bloock Availability service]: https://bloock.com
type AvailabilityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewAvailabilityClient creates a new instance of the AvailabilityClient with default configuration.
func NewAvailabilityClient() AvailabilityClient {
	return AvailabilityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewAvailabilityClientWithConfig creates a new instance of the AvailabilityClient with the provided configuration.
func NewAvailabilityClientWithConfig(configData *proto.ConfigData) AvailabilityClient {
	return AvailabilityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// Publish publishes a Bloock record to the Availability service using the specified publisher.
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

// Retrieve retrieves a Bloock record from the Availability service using the specified loader.
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
