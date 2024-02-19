package client

import (
	"github.com/bloock/bloock-sdk-go/v2/entity/identity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// IdentityCoreClient represents a client for interacting with the [Bloock Identity service].
//
// [Bloock Identity service]: https://bloock.com
type IdentityCoreClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewIdentityCoreClient creates a new instance of the IdentityCoreClient with default configuration.
func NewIdentityCoreClient() IdentityCoreClient {
	return IdentityCoreClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewIdentityCoreClientWithConfig creates a new instance of the IdentityCoreClient with the provided configuration.
func NewIdentityCoreClientWithConfig(configData *proto.ConfigData) IdentityCoreClient {
	return IdentityCoreClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// BuildCredential creates a new credential builder for defining a credential on the Bloock Identity service.
func (c *IdentityCoreClient) BuildCredential(issuer identity.Issuer, schemaId, holderDid string, expiration int64, version int32) identity.CredentialCoreBuilder {
	return identity.NewCredentialCoreBuilder(issuer, schemaId, holderDid, expiration, version, c.configData)
}
