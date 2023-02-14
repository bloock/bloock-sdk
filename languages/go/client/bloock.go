package client

import (
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type BloockClient struct {
	configData *proto.ConfigData

	IntegrityClient    IntegrityClient
	AuthenticityClient AuthenticityClient
	EncryptionClient   EncryptionClient
	RecordClient       RecordClient
	WebhookClient      WebhookClient
}

func NewBloockClient(apiKey string) BloockClient {
	configData := config.NewConfigDataDefault()
	configData.Config.ApiKey = apiKey
	return BloockClient{
		configData: configData,

		IntegrityClient:    NewIntegrityClientWithConfig(configData),
		AuthenticityClient: NewAuthenticityClientWithConfig(configData),
		EncryptionClient:   NewEncryptionClientWithConfig(configData),
		RecordClient:       NewRecordClientWithConfig(configData),
		WebhookClient:      NewWebhookClientWithConfig(configData),
	}
}
