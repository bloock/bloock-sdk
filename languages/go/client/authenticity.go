package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity"
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

func (c *AuthenticityClient) GenerateEcdsaKeys() (entity.KeyPair, error) {
	res, err := c.bridgeClient.Authenticity().GenerateEcdsaKeys(context.Background(), &proto.GenerateEcdsaKeysRequest{
		ConfigData: c.configData,
	})

	if err != nil {
		return entity.KeyPair{}, err
	}

	if res.Error != nil {
		return entity.KeyPair{}, errors.New(res.Error.Message)
	}

	return entity.NewKeysFromProto(res), nil
}

func (c *AuthenticityClient) Sign(r entity.Record, s entity.Signer) (entity.Signature, error) {
	res, err := c.bridgeClient.Authenticity().Sign(context.Background(), &proto.SignRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Signer:     s.ToProto(),
	})

	if err != nil {
		return entity.Signature{}, err
	}

	if res.Error != nil {
		return entity.Signature{}, errors.New(res.Error.Message)
	}

	return entity.NewSignatureFromProto(res.Signature), nil
}

func (c *AuthenticityClient) Verify(r entity.Record) (bool, error) {
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

func (c *AuthenticityClient) GetSignatures(r entity.Record) ([]entity.Signature, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Authenticity().GetSignatures(context.Background(), &proto.GetSignaturesRequest{ConfigData: c.configData, Record: r.ToProto()})

	if err != nil {
		return []entity.Signature{}, err
	}

	if res.Error != nil {
		return []entity.Signature{}, errors.New(res.Error.Message)
	}

	signatures := make([]entity.Signature, len(res.Signatures))
	for i, signature := range res.Signatures {
		signatures[i] = entity.NewSignatureFromProto(signature)
	}
	return signatures, nil
}

func (c *AuthenticityClient) GetSignatureCommonName(signature entity.Signature) (string, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Authenticity().GetSignatureCommonName(context.Background(), &proto.SignatureCommonNameRequest{
		ConfigData: c.configData,
		Signature:  signature.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return res.CommonName, nil
}
