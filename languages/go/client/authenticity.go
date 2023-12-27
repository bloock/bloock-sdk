package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/entity/record"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type AuthenticityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewAuthenticityClient() AuthenticityClient {
	return AuthenticityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewAuthenticityClientWithConfig(configData *proto.ConfigData) AuthenticityClient {
	return AuthenticityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// Deprecated: Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
func (c *AuthenticityClient) GenerateEcdsaKeys() (key.KeyPair, error) {
	res, err := c.bridgeClient.Key().GenerateLocalKey(context.Background(), &proto.GenerateLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    key.KeyTypeToProto[key.EcP256k],
	})

	if err != nil {
		return key.KeyPair{}, err
	}

	if res.Error != nil {
		return key.KeyPair{}, errors.New(res.Error.Message)
	}

	return key.NewEcdsaKeysFromProto(res), nil
}

func (c *AuthenticityClient) Sign(r record.Record, s authenticity.Signer) (authenticity.Signature, error) {
	res, err := c.bridgeClient.Authenticity().Sign(context.Background(), &proto.SignRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Signer:     s.ToProto(),
	})

	if err != nil {
		return authenticity.Signature{}, err
	}

	if res.Error != nil {
		return authenticity.Signature{}, errors.New(res.Error.Message)
	}

	return authenticity.NewSignatureFromProto(res.Signature), nil
}

func (c *AuthenticityClient) Verify(r record.Record) (bool, error) {
	res, err := c.bridgeClient.Authenticity().Verify(context.Background(), &proto.VerifyRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.Valid, nil
}

func (c *AuthenticityClient) GetSignatures(r record.Record) ([]authenticity.Signature, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Authenticity().GetSignatures(context.Background(), &proto.GetSignaturesRequest{ConfigData: c.configData, Record: r.ToProto()})

	if err != nil {
		return []authenticity.Signature{}, err
	}

	if res.Error != nil {
		return []authenticity.Signature{}, errors.New(res.Error.Message)
	}

	signatures := make([]authenticity.Signature, len(res.Signatures))
	for i, signature := range res.Signatures {
		signatures[i] = authenticity.NewSignatureFromProto(signature)
	}
	return signatures, nil
}
