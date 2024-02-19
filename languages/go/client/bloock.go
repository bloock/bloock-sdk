// Package client provides a client for interacting with the Bloock SDK.
package client

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// BloockClient represents a client for interacting with the Bloock SDK.
type BloockClient struct {
	configData *proto.ConfigData

	AuthenticityClient AuthenticityClient
	AvailabilityClient AvailabilityClient
	EncryptionClient   EncryptionClient
	IdentityCoreClient IdentityCoreClient
	IdentityClient     IdentityClient
	IntegrityClient    IntegrityClient
	KeyClient          KeyClient
	RecordClient       RecordClient
	WebhookClient      WebhookClient
}

// NewBloockClient creates a new instance of the Bloock SDK client with the specified configuration.
func NewBloockClient(apiKey string, identityApiHost *string, forceEnv *string) BloockClient {
	configData := config.NewConfigDataDefault()
	configData.Config.ApiKey = apiKey

	if forceEnv != nil {
		configData.Config.Environment = forceEnv
	}

	if identityApiHost != nil {
		configData.Config.IdentityApiHost = identityApiHost
	}

	return BloockClient{
		configData: configData,

		AuthenticityClient: NewAuthenticityClientWithConfig(configData),
		AvailabilityClient: NewAvailabilityClientWithConfig(configData),
		EncryptionClient:   NewEncryptionClientWithConfig(configData),
		IdentityCoreClient: NewIdentityCoreClientWithConfig(configData),
		IdentityClient:     NewIdentityClientWithConfig(configData),
		IntegrityClient:    NewIntegrityClientWithConfig(configData),
		KeyClient:          NewKeyClientWithConfig(configData),
		RecordClient:       NewRecordClientWithConfig(configData),
		WebhookClient:      NewWebhookClientWithConfig(configData),
	}
}
