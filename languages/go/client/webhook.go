package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// WebhookClient provides functionality for interacting with [Bloock webhooks].
//
// [Bloock webhooks]: https://bloock.com
type WebhookClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewWebhookClient creates a new WebhookClient with default configuration.
func NewWebhookClient() WebhookClient {
	return WebhookClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewWebhookClientWithConfig creates a new WebhookClient with the provided configuration.
func NewWebhookClientWithConfig(configData *proto.ConfigData) WebhookClient {
	return WebhookClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// VerifyWebhookSignature verifies the signature of a webhook payload using the provided parameters.
func (c *WebhookClient) VerifyWebhookSignature(payload []byte, header string, secretKey string, enforceTolerance bool) (bool, error) {
	res, err := c.bridgeClient.Webhook().VerifyWebhookSignature(context.Background(), &proto.VerifyWebhookSignatureRequest{
		ConfigData:       c.configData,
		Payload:          payload,
		Header:           header,
		SecretKey:        secretKey,
		EnforceTolerance: enforceTolerance,
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.IsValid, nil
}
