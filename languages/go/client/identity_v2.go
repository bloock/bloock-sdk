package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/identityV2"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type IdentityV2Client struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewIdentityV2Client() IdentityV2Client {
	return IdentityV2Client{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewIdentityV2ClientWithConfig(configData *proto.ConfigData) IdentityV2Client {
	return IdentityV2Client{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

func (c *IdentityV2Client) CreateIssuer(issuerKey identityV2.IssuerKey) (string, error) {
	res, err := c.bridgeClient.IdentityV2().CreateIssuer(context.Background(), &proto.CreateIssuerRequest{
		IssuerKey:  issuerKey.ToProto(),
		ConfigData: c.configData,
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.Did, nil
}

func (c *IdentityV2Client) BuildSchema(displayName string, schemaType, version, description, issuerDid string) identityV2.SchemaBuilder {
	return identityV2.NewSchemaBuilder(displayName, schemaType, version, description, issuerDid, c.configData)
}

func (c *IdentityV2Client) BuildCredential(schemaId, schemaType, issuerDid, holderDid string, expiration int64, version int32) identityV2.CredentialBuilder {
	return identityV2.NewCredentialBuilder(schemaId, schemaType, issuerDid, holderDid, expiration, version, c.configData)
}

func (c *IdentityV2Client) BuildIssuerSatePublisher(issuerDid string) identityV2.IssuerStatePublisher {
	return identityV2.NewIssuerStatePublisher(issuerDid, c.configData)
}

func (c *IdentityV2Client) GetCredentialProof(issuerDid string, credentialId string) (identityV2.CredentialProof, error) {
	res, err := c.bridgeClient.IdentityV2().GetCredentialProof(context.Background(), &proto.GetCredentialProofRequest{
		ConfigData: c.configData,
		IssuerDid:  issuerDid,
		CredentialId: credentialId,
	})

	if err != nil {
		return identityV2.CredentialProof(""), err
	}

	if res.Error != nil {
		return identityV2.CredentialProof(""), errors.New(res.Error.Message)
	}

	return identityV2.CredentialProof(res.GetProof()), nil
}

func (c *IdentityV2Client) RevokeCredential(credential identityV2.Credential) (bool, error) {
	res, err := c.bridgeClient.IdentityV2().RevokeCredential(context.Background(), &proto.RevokeCredentialRequestV2{
		ConfigData: c.configData,
		Credential: credential.ToProto(),
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.Result.GetSuccess(), nil
}
