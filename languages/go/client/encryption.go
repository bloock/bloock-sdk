package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/encryption"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/bloock/bloock-sdk-go/v2/entity/record"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// EncryptionClient represents a client for interacting with the [Bloock Encryption service].
//
// [Bloock Encryption service]: https://bloock.com
type EncryptionClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewEncryptionClient creates a new instance of the EncryptionClient with default configuration.
func NewEncryptionClient() EncryptionClient {
	return EncryptionClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewEncryptionClientWithConfig creates a new instance of the EncryptionClient with the provided configuration.
func NewEncryptionClientWithConfig(configData *proto.ConfigData) EncryptionClient {
	return EncryptionClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// GenerateRsaKeyPair generates an RSA key pair for encryption.
// Deprecated: Will be deleted in future versions. Use KeyClient.newLocalKey function instead.
func (c *EncryptionClient) GenerateRsaKeyPair() (key.KeyPair, error) {
	res, err := c.bridgeClient.Key().GenerateLocalKey(context.Background(), &proto.GenerateLocalKeyRequest{
		ConfigData: c.configData,
		KeyType:    key.KeyTypeToProto[key.Rsa2048],
	})

	if err != nil {
		return key.KeyPair{}, err
	}

	if res.Error != nil {
		return key.KeyPair{}, errors.New(res.Error.Message)
	}

	return key.NewRsaKeyPairFromProto(res), nil
}

// Encrypt encrypts a Bloock record using the specified encrypter.
func (c *EncryptionClient) Encrypt(r record.Record, encrypter encryption.Encrypter) (record.Record, error) {
	res, err := c.bridgeClient.Encryption().Encrypt(context.Background(), &proto.EncryptRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Encrypter:  encrypter.ToProto(),
	})

	if err != nil {
		return record.Record{}, err
	}

	if res.Error != nil {
		return record.Record{}, errors.New(res.Error.Message)
	}

	return record.NewRecordFromProto(res.Record, c.configData), nil
}

// Decrypt decrypts a Bloock record using the specified decrypter.
func (c *EncryptionClient) Decrypt(r record.Record, decrypter encryption.Encrypter) (record.Record, error) {
	res, err := c.bridgeClient.Encryption().Decrypt(context.Background(), &proto.DecryptRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Decrypter:  decrypter.ToProto(),
	})

	if err != nil {
		return record.Record{}, err
	}

	if res.Error != nil {
		return record.Record{}, errors.New(res.Error.Message)
	}

	return record.NewRecordFromProto(res.Record, c.configData), nil
}

// GetEncryptionAlg retrieves the encryption algorithm used for a Bloock record.
func (c *EncryptionClient) GetEncryptionAlg(r record.Record) (encryption.EncryptionAlg, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Encryption().GetEncryptionAlg(context.Background(), &proto.EncryptionAlgRequest{ConfigData: c.configData, Record: r.ToProto()})

	if err != nil {
		return encryption.UNRECOGNIZED_ENCRYPTION_ALG, err
	}

	if res.Error != nil {
		return encryption.UNRECOGNIZED_ENCRYPTION_ALG, errors.New(res.Error.Message)
	}

	return encryption.EncryptionAlgFromProto[res.Alg], nil
}
