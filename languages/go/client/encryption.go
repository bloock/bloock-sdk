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

type EncryptionClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewEncryptionClient() EncryptionClient {
	return EncryptionClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewEncryptionClientWithConfig(configData *proto.ConfigData) EncryptionClient {
	return EncryptionClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

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

func (c *EncryptionClient) Decrypt(r record.Record, decrypter encryption.Decrypter) (record.Record, error) {
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
