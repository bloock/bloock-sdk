package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/identity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type IdentityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewIdentityClient() IdentityClient {
	return IdentityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewIdentityClientWithConfig(configData *proto.ConfigData) IdentityClient {
	return IdentityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

func (c *IdentityClient) CreateIdentity() (identity.Identity, error) {
	res, err := c.bridgeClient.Identity().CreateIdentity(context.Background(), &proto.CreateIdentityRequest{
		ConfigData: c.configData,
	})

	if err != nil {
		return identity.Identity{}, err
	}

	if res.Error != nil {
		return identity.Identity{}, errors.New(res.Error.Message)
	}

	return identity.NewIdentityFromProto(res.GetIdentity()), nil
}

func (c *IdentityClient) LoadIdentity(mnemonic string) (identity.Identity, error) {
	res, err := c.bridgeClient.Identity().LoadIdentity(context.Background(), &proto.LoadIdentityRequest{
		ConfigData: c.configData,
		Mnemonic:   mnemonic,
	})

	if err != nil {
		return identity.Identity{}, err
	}

	if res.Error != nil {
		return identity.Identity{}, errors.New(res.Error.Message)
	}

	return identity.NewIdentityFromProto(res.GetIdentity()), nil
}

func (c *IdentityClient) BuildSchema(displayName string, technicalName string) identity.SchemaBuilder {
	return identity.NewSchemaBuilder(displayName, technicalName, c.configData)
}

func (c *IdentityClient) GetSchema(id string) (identity.Schema, error) {
	res, err := c.bridgeClient.Identity().GetSchema(context.Background(), &proto.GetSchemaRequest{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return identity.Schema{}, err
	}

	if res.Error != nil {
		return identity.Schema{}, errors.New(res.Error.Message)
	}

	return identity.NewSchemaFromProto(res.GetSchema()), nil
}

func (c *IdentityClient) BuildCredential(schemaId string, holderKey string) identity.CredentialBuilder {
	return identity.NewCredentialBuilder(schemaId, holderKey, c.configData)
}

func (c *IdentityClient) GetOffer(id string) (identity.CredentialOffer, error) {
	res, err := c.bridgeClient.Identity().GetOffer(context.Background(), &proto.GetOfferRequest{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return identity.CredentialOffer{}, err
	}

	if res.Error != nil {
		return identity.CredentialOffer{}, errors.New(res.Error.Message)
	}

	return identity.NewCredentialOfferFromProto(res.GetOffer()), nil
}

func (c *IdentityClient) WaitOffer(offerID string) (identity.CredentialOffer, error) {
	res, err := c.bridgeClient.Identity().WaitOffer(context.Background(), &proto.WaitOfferRequest{
		ConfigData: c.configData,
		OfferId:    offerID,
	})

	if err != nil {
		return identity.CredentialOffer{}, err
	}

	if res.Error != nil {
		return identity.CredentialOffer{}, errors.New(res.Error.Message)
	}

	return identity.NewCredentialOfferFromProto(res.GetOffer()), nil
}

func (c *IdentityClient) RedeemOffer(credentialOffer identity.CredentialOffer, holderPrivateKey string) (identity.Credential, error) {
	res, err := c.bridgeClient.Identity().CredentialOfferRedeem(context.Background(), &proto.CredentialOfferRedeemRequest{
		ConfigData:         c.configData,
		CredentialOffer:    credentialOffer.ToProto(),
		IdentityPrivateKey: holderPrivateKey,
	})

	if err != nil {
		return identity.Credential{}, err
	}

	if res.Error != nil {
		return identity.Credential{}, errors.New(res.Error.Message)
	}

	return identity.NewCredentialFromProto(res.GetCredential()), nil
}

func (c *IdentityClient) VerifyCredential(credential identity.Credential) (identity.CredentialVerification, error) {
	res, err := c.bridgeClient.Identity().VerifyCredential(context.Background(), &proto.VerifyCredentialRequest{
		ConfigData: c.configData,
		Credential: credential.ToProto(),
	})

	if err != nil {
		return identity.CredentialVerification{}, err
	}

	if res.Error != nil {
		return identity.CredentialVerification{}, errors.New(res.Error.Message)
	}

	return identity.NewCredentialVerificationFromProto(res.GetResult()), nil
}

func (c *IdentityClient) RevokeCredential(credential identity.Credential) (bool, error) {
	res, err := c.bridgeClient.Identity().RevokeCredential(context.Background(), &proto.RevokeCredentialRequest{
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
