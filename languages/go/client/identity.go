package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/identity"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// IdentityClient represents a client for interacting with the [Bloock Identity service].
//
// [Bloock Identity service]: https://bloock.com
type IdentityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewIdentityClient creates a new instance of the IdentityClient with default configuration.
func NewIdentityClient() IdentityClient {
	return IdentityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewIdentityClientWithConfig creates a new instance of the IdentityClient with the provided configuration.
func NewIdentityClientWithConfig(configData *proto.ConfigData) IdentityClient {
	return IdentityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// CreateHolder creates a new holder identity.
func (c *IdentityClient) CreateHolder(holderKey key.Key, didMethod identity.DidMethod) (identity.Holder, error) {
	res, err := c.bridgeClient.Identity().CreateHolder(context.Background(), &proto.CreateHolderRequest{
		Key:        holderKey.ToProto(),
		DidMethod:  identity.DidMethodEnumToProto[didMethod],
		ConfigData: c.configData,
	})

	if err != nil {
		return identity.Holder{}, err
	}

	if res.Error != nil {
		return identity.Holder{}, errors.New(res.Error.Message)
	}

	return identity.NewHolder(res.Did, didMethod, holderKey), nil
}

// CreateIssuer creates a new issuer identity on the Bloock Identity service.
func (c *IdentityClient) CreateIssuer(issuerKey key.Key, publishInterval identity.PublishIntervalParams, didMethod identity.DidMethod, name, description, image string) (identity.Issuer, error) {
	var iName, iDescription, iImage *string
	if name != "" {
		iName = &name
	}
	if description != "" {
		iDescription = &description
	}
	if image != "" {
		iImage = &image
	}

	res, err := c.bridgeClient.Identity().CreateIssuer(context.Background(), &proto.CreateIssuerRequest{
		Key:             issuerKey.ToProto(),
		DidMethod:       identity.DidMethodEnumToProto[didMethod],
		Name:            iName,
		Description:     iDescription,
		Image:           iImage,
		PublishInterval: identity.PublishIntervalParamsToProto[publishInterval],
		ConfigData:      c.configData,
	})

	if err != nil {
		return identity.Issuer{}, err
	}

	if res.Error != nil {
		return identity.Issuer{}, errors.New(res.Error.Message)
	}

	return identity.NewIssuer(res.GetDid(), didMethod, issuerKey), nil
}

// ImportIssuer retrieves the issuer based on the issuer key and DID method.
func (c *IdentityClient) ImportIssuer(issuerKey key.Key, didMethod identity.DidMethod) (identity.Issuer, error) {
	res, err := c.bridgeClient.Identity().ImportIssuer(context.Background(), &proto.ImportIssuerRequest{
		ConfigData: c.configData,
		Key:        issuerKey.ToProto(),
		DidMethod:  identity.DidMethodEnumToProto[didMethod],
	})
	if err != nil {
		return identity.Issuer{}, err
	}

	if res.Error != nil {
		return identity.Issuer{}, errors.New(res.Error.Message)
	}

	return identity.NewIssuer(res.GetDid(), didMethod, issuerKey), nil
}

// BuildSchema creates a new schema builder for defining a schema on the Bloock Identity service.
func (c *IdentityClient) BuildSchema(displayName string, schemaType, version, description string) identity.SchemaBuilder {
	return identity.NewSchemaBuilder(displayName, schemaType, version, description, c.configData)
}

// GetSchema retrieves a schema from the Bloock Identity service based on the schema ID (ex: Qma1t4uzbnB93E4rasNdu5UWMDh5qg3wMkPm68cnEyfnoM).
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

// BuildCredential creates a new credential builder for defining a credential on the Bloock Identity service.
func (c *IdentityClient) BuildCredential(issuer identity.Issuer, schemaId, holderDid string, expiration int64, version int32) identity.CredentialBuilder {
	return identity.NewCredentialBuilder(issuer, schemaId, holderDid, expiration, version, c.configData)
}

// GetCredential retrieves the Verifiable Credential entity based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
func (c *IdentityClient) GetCredential(credentialId string) (identity.Credential, error) {
	res, err := c.bridgeClient.Identity().GetCredential(context.Background(), &proto.GetCredentialRequest{
		ConfigData:   c.configData,
		CredentialId: credentialId,
	})

	if err != nil {
		return identity.Credential{}, err
	}

	if res.Error != nil {
		return identity.Credential{}, errors.New(res.Error.Message)
	}

	return identity.NewCredentialFromProto(res.GetCredential()), nil
}

// GetCredentialOffer retrieves the json raw offer based on the credential ID (UUID). (ex: 1bf0c79e-55e6-4f14-aa9d-fb55619ba0cf)
func (c *IdentityClient) GetCredentialOffer(issuer identity.Issuer, credentialId string) (string, error) {
	res, err := c.bridgeClient.Identity().GetCredentialOffer(context.Background(), &proto.GetCredentialOfferRequest{
		ConfigData:   c.configData,
		CredentialId: credentialId,
		Key:          issuer.Key.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.GetCredentialOffer(), nil
}

// ForcePublishIssuerState publishes the state of an issuer on the Bloock Identity service.
func (c *IdentityClient) ForcePublishIssuerState(issuer identity.Issuer) (identity.IssuerStateReceipt, error) {
	res, err := c.bridgeClient.Identity().ForcePublishIssuerState(context.Background(), &proto.ForcePublishIssuerStateRequest{
		ConfigData: c.configData,
		IssuerDid:  issuer.Did.Did,
		Key:        issuer.Key.ToProto(),
	})

	if err != nil {
		return identity.IssuerStateReceipt{}, err
	}

	if res.Error != nil {
		return identity.IssuerStateReceipt{}, errors.New(res.Error.Message)
	}

	return identity.NewIssuerStateReceiptFromProto(res.GetStateReceipt()), nil
}

// GetCredentialProof retrieves the proof of a credential on the Bloock Identity service.
func (c *IdentityClient) GetCredentialProof(issuerDid string, credentialId string) (identity.CredentialProof, error) {
	res, err := c.bridgeClient.Identity().GetCredentialProof(context.Background(), &proto.GetCredentialProofRequest{
		ConfigData:   c.configData,
		IssuerDid:    issuerDid,
		CredentialId: credentialId,
	})

	if err != nil {
		return identity.CredentialProof{}, err
	}

	if res.Error != nil {
		return identity.CredentialProof{}, errors.New(res.Error.Message)
	}

	return identity.NewCredentialProofFromProto(res.GetProof()), nil
}

// RevokeCredential revokes a credential on the Bloock Identity service.
func (c *IdentityClient) RevokeCredential(credential identity.Credential, issuer identity.Issuer) (bool, error) {
	res, err := c.bridgeClient.Identity().RevokeCredential(context.Background(), &proto.RevokeCredentialRequest{
		ConfigData: c.configData,
		Credential: credential.ToProto(),
		Key:        issuer.Key.ToProto(),
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.Result.GetSuccess(), nil
}

// CreateVerification creates a new verification session on the identity managed API provided.
func (c *IdentityClient) CreateVerification(proofRequest string) (identity.VerificationReceipt, error) {
	res, err := c.bridgeClient.Identity().CreateVerification(context.Background(), &proto.CreateVerificationRequest{
		ConfigData:   c.configData,
		ProofRequest: proofRequest,
	})

	if err != nil {
		return identity.VerificationReceipt{}, err
	}

	if res.Error != nil {
		return identity.VerificationReceipt{}, errors.New(res.Error.Message)
	}

	return identity.NewVerificationReceiptFromProto(res.GetResult()), nil
}

// WaitVerification waits for the completion of a verification session on the identity managed API provided.
func (c *IdentityClient) WaitVerification(sessionID int64, params identity.VerificationParams) (bool, error) {
	if params.Timeout == 0 {
		params.Timeout = int64(120000)
	}

	res, err := c.bridgeClient.Identity().WaitVerification(context.Background(), &proto.WaitVerificationRequest{
		ConfigData: c.configData,
		SessionId:  sessionID,
		Timeout:    params.Timeout,
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.GetStatus(), nil
}

// GetVerificationStatus retrieves the status of a verification session on the identity managed API provided.
func (c *IdentityClient) GetVerificationStatus(sessionID int64) (bool, error) {
	res, err := c.bridgeClient.Identity().GetVerificationStatus(context.Background(), &proto.GetVerificationStatusRequest{
		ConfigData: c.configData,
		SessionId:  sessionID,
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.GetStatus(), nil
}
