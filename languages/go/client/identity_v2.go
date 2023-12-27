package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/identityV2"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type IdentityClient struct {
	bridgeClient   bridge.BloockBridge
	configData     *proto.ConfigData
	apiManagedHost string
}

func NewIdentityClient(apiManagedHost string) IdentityClient {
	return IdentityClient{
		bridgeClient:   bridge.NewBloockBridge(),
		configData:     config.NewConfigDataDefault(),
		apiManagedHost: apiManagedHost,
	}
}

func NewIdentityClientWithConfig(configData *proto.ConfigData, apiManagedHost string) IdentityClient {
	return IdentityClient{
		bridgeClient:   bridge.NewBloockBridge(),
		configData:     configData,
		apiManagedHost: apiManagedHost,
	}
}

func (c *IdentityClient) CreateIdentity(issuerKey identityV2.IdentityKey, params identityV2.DidParams) (string, error) {
	res, err := c.bridgeClient.IdentityV2().CreateIdentity(context.Background(), &proto.CreateIdentityV2Request{
		IssuerKey:  issuerKey.ToProto(),
		DidParams:  identityV2.DidParamsToProto(params),
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

func (c *IdentityClient) CreateIssuer(issuerKey identityV2.IdentityKey, params identityV2.DidParams, name, description, image string, publishInterval int64) (string, error) {
	var iName, iDescription, iImage *string
	var pInterval *int64
	if name != "" {
		iName = &name
	}
	if description != "" {
		iDescription = &description
	}
	if image != "" {
		iImage = &image
	}
	if publishInterval != 0 {
		pInterval = &publishInterval
	}

	res, err := c.bridgeClient.IdentityV2().CreateIssuer(context.Background(), &proto.CreateIssuerRequest{
		IssuerKey:       issuerKey.ToProto(),
		IssuerParams:    identityV2.DidParamsToProto(params),
		Name:            iName,
		Description:     iDescription,
		Image:           iImage,
		PublishInterval: pInterval,
		ConfigData:      c.configData,
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.Did, nil
}

func (c *IdentityClient) GetIssuerList() ([]string, error) {
	res, err := c.bridgeClient.IdentityV2().GetIssuerList(context.Background(), &proto.GetIssuerListRequest{
		ConfigData: c.configData,
	})

	if err != nil {
		return []string{}, err
	}

	if res.Error != nil {
		return []string{}, errors.New(res.Error.Message)
	}

	return res.Did, nil
}

func (c *IdentityClient) GetIssuerByKey(issuerKey identityV2.IdentityKey, params identityV2.DidParams) (string, error) {
	res, err := c.bridgeClient.IdentityV2().GetIssuerByKey(context.Background(), &proto.GetIssuerByKeyRequest{
		ConfigData:   c.configData,
		IssuerKey:    issuerKey.ToProto(),
		IssuerParams: identityV2.DidParamsToProto(params),
	})
	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.GetDid(), nil
}

func (c *IdentityClient) BuildSchema(displayName string, schemaType, version, description, issuerDid string) identityV2.SchemaBuilder {
	return identityV2.NewSchemaBuilder(displayName, schemaType, version, description, issuerDid, c.configData)
}

func (c *IdentityClient) GetSchema(id string) (identityV2.Schema, error) {
	res, err := c.bridgeClient.IdentityV2().GetSchema(context.Background(), &proto.GetSchemaRequestV2{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return identityV2.Schema{}, err
	}

	if res.Error != nil {
		return identityV2.Schema{}, errors.New(res.Error.Message)
	}

	return identityV2.NewSchemaFromProto(res.GetSchema()), nil
}

func (c *IdentityClient) BuildCredential(schemaId, issuerDid, holderDid string, expiration int64, version int32) identityV2.CredentialBuilder {
	return identityV2.NewCredentialBuilder(schemaId, issuerDid, holderDid, expiration, version, c.apiManagedHost, c.configData)
}

func (c *IdentityClient) PublishIssuerState(issuerDid string, signer authenticity.Signer) (identityV2.IssuerStateReceipt, error) {
	res, err := c.bridgeClient.IdentityV2().PublishIssuerState(context.Background(), &proto.PublishIssuerStateRequest{
		ConfigData: c.configData,
		IssuerDid: 	issuerDid,
		Signer:     signer.ToProto(),
	})

	if err != nil {
		return identityV2.IssuerStateReceipt{}, err
	}

	if res.Error != nil {
		return identityV2.IssuerStateReceipt{}, errors.New(res.Error.Message)
	}

	return identityV2.NewIssuerStateReceiptFromProto(res.GetStateReceipt()), nil
}

func (c *IdentityClient) GetCredentialProof(issuerDid string, credentialId string) (identityV2.CredentialProof, error) {
	res, err := c.bridgeClient.IdentityV2().GetCredentialProof(context.Background(), &proto.GetCredentialProofRequest{
		ConfigData:   c.configData,
		IssuerDid:    issuerDid,
		CredentialId: credentialId,
	})

	if err != nil {
		return identityV2.CredentialProof{}, err
	}

	if res.Error != nil {
		return identityV2.CredentialProof{}, errors.New(res.Error.Message)
	}

	return identityV2.NewCredentialProofFromProto(res.GetProof()), nil
}

func (c *IdentityClient) RevokeCredential(credential identityV2.Credential, signer authenticity.Signer) (bool, error) {
	res, err := c.bridgeClient.IdentityV2().RevokeCredential(context.Background(), &proto.RevokeCredentialRequestV2{
		ConfigData: c.configData,
		Credential: credential.ToProto(),
		Signer:     signer.ToProto(),
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.Result.GetSuccess(), nil
}
