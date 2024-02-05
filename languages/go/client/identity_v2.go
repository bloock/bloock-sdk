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

// CreateIdentity creates a new identity.
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

// CreateIssuer creates a new issuer on the Bloock Identity service.
func (c *IdentityClient) CreateIssuer(issuerKey identityV2.IdentityKey, publishInterval identityV2.PublishIntervalParams, params identityV2.DidParams, name, description, image string) (string, error) {
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

	res, err := c.bridgeClient.IdentityV2().CreateIssuer(context.Background(), &proto.CreateIssuerRequest{
		IssuerKey:       issuerKey.ToProto(),
		IssuerParams:    identityV2.DidParamsToProto(params),
		Name:            iName,
		Description:     iDescription,
		Image:           iImage,
		PublishInterval: identityV2.PublishIntervalParamsToProto[publishInterval],
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

// GetIssuerByKey retrieves the DID of an issuer based on the issuer key and DID parameters.
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

// BuildSchema creates a new schema builder for defining a schema on the Bloock Identity service.
func (c *IdentityClient) BuildSchema(displayName string, schemaType, version, description string) identityV2.SchemaBuilder {
	return identityV2.NewSchemaBuilder(displayName, schemaType, version, description, c.configData)
}

// GetSchema retrieves a schema from the Bloock Identity service based on the schema ID (ex: Qma1t4uzbnB93E4rasNdu5UWMDh5qg3wMkPm68cnEyfnoM).
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

// BuildCredential creates a new credential builder for defining a credential on the Bloock Identity service.
func (c *IdentityClient) BuildCredential(schemaId, issuerDid, holderDid string, expiration int64, version int32) identityV2.CredentialBuilder {
	return identityV2.NewCredentialBuilder(schemaId, issuerDid, holderDid, expiration, version, c.configData)
}

// PublishIssuerState publishes the state of an issuer on the Bloock Identity service.
func (c *IdentityClient) PublishIssuerState(issuerDid string, signer authenticity.Signer) (identityV2.IssuerStateReceipt, error) {
	res, err := c.bridgeClient.IdentityV2().PublishIssuerState(context.Background(), &proto.PublishIssuerStateRequest{
		ConfigData: c.configData,
		IssuerDid:  issuerDid,
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

// GetCredentialProof retrieves the proof of a credential on the Bloock Identity service.
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

// RevokeCredential revokes a credential on the Bloock Identity service.
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

// CreateVerification creates a new verification session on the identity managed API provided.
func (c *IdentityClient) CreateVerification(proofRequest string) (identityV2.VerificationReceipt, error) {
	res, err := c.bridgeClient.IdentityV2().CreateVerification(context.Background(), &proto.CreateVerificationRequest{
		ConfigData:   c.configData,
		ProofRequest: proofRequest,
	})

	if err != nil {
		return identityV2.VerificationReceipt{}, err
	}

	if res.Error != nil {
		return identityV2.VerificationReceipt{}, errors.New(res.Error.Message)
	}

	return identityV2.NewVerificationReceiptFromProto(res.GetResult()), nil
}

// WaitVerification waits for the completion of a verification session on the identity managed API provided.
func (c *IdentityClient) WaitVerification(sessionID int64, params identityV2.VerificationParams) (bool, error) {
	if params.Timeout == 0 {
		params.Timeout = int64(120000)
	}

	res, err := c.bridgeClient.IdentityV2().WaitVerification(context.Background(), &proto.WaitVerificationRequest{
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
	res, err := c.bridgeClient.IdentityV2().GetVerificationStatus(context.Background(), &proto.GetVerificationStatusRequest{
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
