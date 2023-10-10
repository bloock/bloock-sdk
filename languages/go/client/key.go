package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type KeyClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewKeyClient() KeyClient {
	return KeyClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewKeyClientWithConfig(configData *proto.ConfigData) KeyClient {
	return KeyClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

func (c *KeyClient) NewLocalKey(keyType key.KeyType) (key.LocalKey, error) {
	res, err := c.bridgeClient.Key().GenerateLocalKey(context.Background(), &proto.GenerateLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    key.KeyTypeToProto[keyType],
	})

	if err != nil {
		return key.LocalKey{}, err
	}

	if res.Error != nil {
		return key.LocalKey{}, errors.New(res.Error.Message)
	}

	return key.NewLocalKeyFromProto(res.GetLocalKey()), nil
}

func (c *KeyClient) LoadLocalKey(keyType key.KeyType, publicKey string, privateKey *string) (key.LocalKey, error) {
	res, err := c.bridgeClient.Key().LoadLocalKey(context.Background(), &proto.LoadLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    key.KeyTypeToProto[keyType],
		Key:        publicKey,
		PrivateKey: privateKey,
	})

	if err != nil {
		return key.LocalKey{}, err
	}

	if res.Error != nil {
		return key.LocalKey{}, errors.New(res.Error.Message)
	}

	return key.NewLocalKeyFromProto(res.GetLocalKey()), nil
}

func (c *KeyClient) NewManagedKey(params key.ManagedKeyParams) (key.ManagedKey, error) {
	res, err := c.bridgeClient.Key().GenerateManagedKey(context.Background(), &proto.GenerateManagedKeyRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return key.ManagedKey{}, err
	}

	if res.Error != nil {
		return key.ManagedKey{}, errors.New(res.Error.Message)
	}

	return key.NewManagedKeyFromProto(res.GetManagedKey()), nil
}

func (c *KeyClient) LoadManagedKey(id string) (key.ManagedKey, error) {
	res, err := c.bridgeClient.Key().LoadManagedKey(context.Background(), &proto.LoadManagedKeyRequest{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return key.ManagedKey{}, err
	}

	if res.Error != nil {
		return key.ManagedKey{}, errors.New(res.Error.Message)
	}

	return key.NewManagedKeyFromProto(res.GetManagedKey()), nil
}

func (c *KeyClient) NewLocalCertificate(params key.LocalCertificateParams) (key.LocalCertificate, error) {
	res, err := c.bridgeClient.Key().GenerateLocalCertificate(context.Background(), &proto.GenerateLocalCertificateRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return key.LocalCertificate{}, err
	}

	if res.Error != nil {
		return key.LocalCertificate{}, errors.New(res.Error.Message)
	}

	return key.NewLocalCertificateFromProto(res.GetLocalCertificate()), nil
}

func (c *KeyClient) LoadLocalCertificate(pkcs12 []byte, password string) (key.LocalCertificate, error) {
	res, err := c.bridgeClient.Key().LoadLocalCertificate(context.Background(), &proto.LoadLocalCertificateRequest{
		ConfigData: c.configData,
		Pkcs12:     pkcs12,
		Password:   password,
	})

	if err != nil {
		return key.LocalCertificate{}, err
	}

	if res.Error != nil {
		return key.LocalCertificate{}, errors.New(res.Error.Message)
	}

	return key.NewLocalCertificateFromProto(res.GetLocalCertificate()), nil
}

func (c *KeyClient) NewManagedCertificate(params key.ManagedCertificateParams) (key.ManagedCertificate, error) {
	res, err := c.bridgeClient.Key().GenerateManagedCertificate(context.Background(), &proto.GenerateManagedCertificateRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return key.ManagedCertificate{}, err
	}

	if res.Error != nil {
		return key.ManagedCertificate{}, errors.New(res.Error.Message)
	}

	return key.NewManagedCertificateFromProto(res.GetManagedCertificate()), nil
}

func (c *KeyClient) LoadManagedCertificate(id string) (key.ManagedCertificate, error) {
	res, err := c.bridgeClient.Key().LoadManagedCertificate(context.Background(), &proto.LoadManagedCertificateRequest{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return key.ManagedCertificate{}, err
	}

	if res.Error != nil {
		return key.ManagedCertificate{}, errors.New(res.Error.Message)
	}

	return key.NewManagedCertificateFromProto(res.GetManagedCertificate()), nil
}

func (c *KeyClient) ImportManagedCertificate(_type key.CertificateType, certificate []byte, params key.ImportCertificateParams) (key.ManagedCertificate, error) {
	var password *string
	if params.Password != "" {
		password = &params.Password
	}

	res, err := c.bridgeClient.Key().ImportManagedCertificate(context.Background(), &proto.ImportManagedCertificateRequest{
		ConfigData:      c.configData,
		Certificate:     certificate,
		CertificateType: key.CertificateTypeToProto[_type],
		Password:        password,
	})

	if err != nil {
		return key.ManagedCertificate{}, err
	}

	if res.Error != nil {
		return key.ManagedCertificate{}, errors.New(res.Error.Message)
	}

	return key.NewManagedCertificateFromProto(res.GetManagedCertificate()), nil
}
