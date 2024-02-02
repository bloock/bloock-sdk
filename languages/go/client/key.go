package client

import (
	"context"
	"errors"

	keyEntity "github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// KeyClient provides functionality to interact with the [Bloock Key service].
//
// [Bloock Key service]: https://bloock.com
type KeyClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewKeyClient creates a new KeyClient with default configuration.
func NewKeyClient() KeyClient {
	return KeyClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewKeyClientWithConfig creates a new KeyClient with the given configuration.
func NewKeyClientWithConfig(configData *proto.ConfigData) KeyClient {
	return KeyClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// NewLocalKey generates a new local key of the specified type.
func (c *KeyClient) NewLocalKey(keyType keyEntity.KeyType) (keyEntity.LocalKey, error) {
	res, err := c.bridgeClient.Key().GenerateLocalKey(context.Background(), &proto.GenerateLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    keyEntity.KeyTypeToProto[keyType],
	})

	if err != nil {
		return keyEntity.LocalKey{}, err
	}

	if res.Error != nil {
		return keyEntity.LocalKey{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewLocalKeyFromProto(res.GetLocalKey()), nil
}

// LoadLocalKey loads a local key of the specified type from a public key string.
func (c *KeyClient) LoadLocalKey(keyType keyEntity.KeyType, key string) (keyEntity.LocalKey, error) {
	res, err := c.bridgeClient.Key().LoadLocalKey(context.Background(), &proto.LoadLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    keyEntity.KeyTypeToProto[keyType],
		Key:        key,
	})

	if err != nil {
		return keyEntity.LocalKey{}, err
	}

	if res.Error != nil {
		return keyEntity.LocalKey{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewLocalKeyFromProto(res.GetLocalKey()), nil
}

// NewManagedKey generates a new managed key with the specified parameters.
func (c *KeyClient) NewManagedKey(params keyEntity.ManagedKeyParams) (keyEntity.ManagedKey, error) {
	res, err := c.bridgeClient.Key().GenerateManagedKey(context.Background(), &proto.GenerateManagedKeyRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return keyEntity.ManagedKey{}, err
	}

	if res.Error != nil {
		return keyEntity.ManagedKey{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewManagedKeyFromProto(res.GetManagedKey()), nil
}

// LoadManagedKey loads a managed key by its ID (ex: 51d22546-68f1-4340-b94b-2a80e60b8933).
func (c *KeyClient) LoadManagedKey(id string) (keyEntity.ManagedKey, error) {
	res, err := c.bridgeClient.Key().LoadManagedKey(context.Background(), &proto.LoadManagedKeyRequest{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return keyEntity.ManagedKey{}, err
	}

	if res.Error != nil {
		return keyEntity.ManagedKey{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewManagedKeyFromProto(res.GetManagedKey()), nil
}

// NewLocalCertificate generates a new local certificate with the specified parameters.
func (c *KeyClient) NewLocalCertificate(params keyEntity.LocalCertificateParams) (keyEntity.LocalCertificate, error) {
	res, err := c.bridgeClient.Key().GenerateLocalCertificate(context.Background(), &proto.GenerateLocalCertificateRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return keyEntity.LocalCertificate{}, err
	}

	if res.Error != nil {
		return keyEntity.LocalCertificate{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewLocalCertificateFromProto(res.GetLocalCertificate()), nil
}

// LoadLocalCertificate loads a local certificate from a PKCS12 file.
func (c *KeyClient) LoadLocalCertificate(pkcs12 []byte, password string) (keyEntity.LocalCertificate, error) {
	res, err := c.bridgeClient.Key().LoadLocalCertificate(context.Background(), &proto.LoadLocalCertificateRequest{
		ConfigData: c.configData,
		Pkcs12:     pkcs12,
		Password:   password,
	})

	if err != nil {
		return keyEntity.LocalCertificate{}, err
	}

	if res.Error != nil {
		return keyEntity.LocalCertificate{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewLocalCertificateFromProto(res.GetLocalCertificate()), nil
}

// NewManagedCertificate generates a new managed certificate with the specified parameters.
func (c *KeyClient) NewManagedCertificate(params keyEntity.ManagedCertificateParams) (keyEntity.ManagedCertificate, error) {
	res, err := c.bridgeClient.Key().GenerateManagedCertificate(context.Background(), &proto.GenerateManagedCertificateRequest{
		ConfigData: c.configData,
		Params:     params.ToProto(),
	})

	if err != nil {
		return keyEntity.ManagedCertificate{}, err
	}

	if res.Error != nil {
		return keyEntity.ManagedCertificate{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewManagedCertificateFromProto(res.GetManagedCertificate()), nil
}

// LoadManagedCertificate loads a managed certificate by its ID (ex: ceef5b02-af17-43d8-ae7b-31d9bdf8027f).
func (c *KeyClient) LoadManagedCertificate(id string) (keyEntity.ManagedCertificate, error) {
	res, err := c.bridgeClient.Key().LoadManagedCertificate(context.Background(), &proto.LoadManagedCertificateRequest{
		ConfigData: c.configData,
		Id:         id,
	})

	if err != nil {
		return keyEntity.ManagedCertificate{}, err
	}

	if res.Error != nil {
		return keyEntity.ManagedCertificate{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewManagedCertificateFromProto(res.GetManagedCertificate()), nil
}

// ImportManagedCertificate imports a managed certificate with the specified parameters.
//
// Supported types: .pem, .pfx.	
func (c *KeyClient) ImportManagedCertificate(_type keyEntity.CertificateType, certificate []byte, params keyEntity.ImportCertificateParams) (keyEntity.ManagedCertificate, error) {
	var password *string
	if params.Password != "" {
		password = &params.Password
	}

	res, err := c.bridgeClient.Key().ImportManagedCertificate(context.Background(), &proto.ImportManagedCertificateRequest{
		ConfigData:      c.configData,
		Certificate:     certificate,
		CertificateType: keyEntity.CertificateTypeToProto[_type],
		Password:        password,
	})

	if err != nil {
		return keyEntity.ManagedCertificate{}, err
	}

	if res.Error != nil {
		return keyEntity.ManagedCertificate{}, errors.New(res.Error.Message)
	}

	return keyEntity.NewManagedCertificateFromProto(res.GetManagedCertificate()), nil
}

// SetupTotpAccessControl sets up TOTP-based access control for the given managed key or managed certificate.
func (c *KeyClient) SetupTotpAccessControl(key keyEntity.Managed) (keyEntity.TotpAccessControlReceipt, error) {
	var managedKey *proto.ManagedKey
	if key.ManagedKey != nil {
		managedKey = key.ManagedKey.ToProto()
	}

	var managedCertificate *proto.ManagedCertificate
	if key.ManagedCertificate != nil {
		managedCertificate = key.ManagedCertificate.ToProto()
	}

	res, err := c.bridgeClient.Key().SetupTotpAccessControl(context.Background(), &proto.SetupTotpAccessControlRequest{
		ConfigData:         c.configData,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
	})

	if err != nil {
		return keyEntity.TotpAccessControlReceipt{}, err
	}

	if res.Error != nil {
		return keyEntity.TotpAccessControlReceipt{}, errors.New(res.Error.Message)
	}

	return keyEntity.New(res.Secret, res.SecretQr, res.RecoveryCodes), nil
}

// RecoverTotpAccessControl recovers TOTP-based access control for the given managed key or managed certificate using a recovery code.
func (c *KeyClient) RecoverTotpAccessControl(key keyEntity.Managed, code string) (keyEntity.TotpAccessControlReceipt, error) {
	var managedKey *proto.ManagedKey
	if key.ManagedKey != nil {
		managedKey = key.ManagedKey.ToProto()
	}

	var managedCertificate *proto.ManagedCertificate
	if key.ManagedCertificate != nil {
		managedCertificate = key.ManagedCertificate.ToProto()
	}

	res, err := c.bridgeClient.Key().RecoverTotpAccessControl(context.Background(), &proto.RecoverTotpAccessControlRequest{
		ConfigData:         c.configData,
		Code:               code,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
	})

	if err != nil {
		return keyEntity.TotpAccessControlReceipt{}, err
	}

	if res.Error != nil {
		return keyEntity.TotpAccessControlReceipt{}, errors.New(res.Error.Message)
	}

	return keyEntity.New(res.Secret, res.SecretQr, res.RecoveryCodes), nil
}

// SetupSecretAccessControl sets up secret-based access control for the given managed key or managed certificate.
func (c *KeyClient) SetupSecretAccessControl(key keyEntity.Managed, secret string, email string) error {
	var managedKey *proto.ManagedKey
	if key.ManagedKey != nil {
		managedKey = key.ManagedKey.ToProto()
	}

	var managedCertificate *proto.ManagedCertificate
	if key.ManagedCertificate != nil {
		managedCertificate = key.ManagedCertificate.ToProto()
	}

	res, err := c.bridgeClient.Key().SetupSecretAccessControl(context.Background(), &proto.SetupSecretAccessControlRequest{
		ConfigData:         c.configData,
		Secret:             secret,
		Email:              email,
		ManagedKey:         managedKey,
		ManagedCertificate: managedCertificate,
	})

	if err != nil {
		return err
	}

	if res.Error != nil {
		return errors.New(res.Error.Message)
	}

	return nil
}
