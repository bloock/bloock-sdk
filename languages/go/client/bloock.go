package client

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type BloockClient struct {
	configData *proto.ConfigData

	AuthenticityClient AuthenticityClient
	AvailabilityClient AvailabilityClient
	EncryptionClient   EncryptionClient
	IdentityClient     IdentityClient
	IdentityV2Client   IdentityV2Client
	IntegrityClient    IntegrityClient
	KeyClient          KeyClient
	RecordClient       RecordClient
	WebhookClient      WebhookClient
}

func NewBloockClient(apiKey string, apiManagedHost string) BloockClient {
	configData := config.NewConfigDataDefault()
	configData.Config.ApiKey = apiKey
	return BloockClient{
		configData: configData,

		AuthenticityClient: NewAuthenticityClientWithConfig(configData),
		AvailabilityClient: NewAvailabilityClientWithConfig(configData),
		EncryptionClient:   NewEncryptionClientWithConfig(configData),
		IdentityClient:     NewIdentityLegacyClientWithConfig(configData),
		IdentityV2Client:   NewIdentityClientWithConfig(configData, apiManagedHost),
		IntegrityClient:    NewIntegrityClientWithConfig(configData),
		KeyClient:          NewKeyClientWithConfig(configData),
		RecordClient:       NewRecordClientWithConfig(configData),
		WebhookClient:      NewWebhookClientWithConfig(configData),
	}
}
