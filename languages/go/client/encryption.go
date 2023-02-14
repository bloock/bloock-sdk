package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity"
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

func (c *EncryptionClient) GenerateRsaKeyPair() (entity.KeyPair, error) {
	res, err := c.bridgeClient.Encryption().GenerateRsaKeyPair(context.Background(), &proto.GenerateRsaKeyPairRequest{
		ConfigData: c.configData,
	})

	if err != nil {
		return entity.KeyPair{}, err
	}

	if res.Error != nil {
		return entity.KeyPair{}, errors.New(res.Error.Message)
	}

	return entity.NewRsaKeyPairFromProto(res), nil
}

func (c *EncryptionClient) GenerateEciesKeyPair() (entity.KeyPair, error) {
	res, err := c.bridgeClient.Encryption().GenerateEciesKeyPair(context.Background(), &proto.GenerateEciesKeyPairRequest{
		ConfigData: c.configData,
	})

	if err != nil {
		return entity.KeyPair{}, err
	}

	if res.Error != nil {
		return entity.KeyPair{}, errors.New(res.Error.Message)
	}

	return entity.NewEciesKeyPairFromProto(res), nil
}

func (c *EncryptionClient) Encrypt(r entity.Record, encrypter entity.Encrypter) (entity.Record, error) {
	res, err := c.bridgeClient.Encryption().Encrypt(context.Background(), &proto.EncryptRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Encrypter:  encrypter.ToProto(),
	})

	if err != nil {
		return entity.Record{}, err
	}

	if res.Error != nil {
		return entity.Record{}, errors.New(res.Error.Message)
	}

	return entity.NewRecordFromProto(res.Record, c.configData), nil
}

func (c *EncryptionClient) Decrypt(r entity.Record, decrypter entity.Decrypter) (entity.Record, error) {
	res, err := c.bridgeClient.Encryption().Decrypt(context.Background(), &proto.DecryptRequest{
		ConfigData: c.configData,
		Record:     r.ToProto(),
		Decrypter:  decrypter.ToProto(),
	})

	if err != nil {
		return entity.Record{}, err
	}

	if res.Error != nil {
		return entity.Record{}, errors.New(res.Error.Message)
	}

	return entity.NewRecordFromProto(res.Record, c.configData), nil
}

func (c *EncryptionClient) GetEncryptionAlg(r entity.Record) (entity.EncryptionAlg, error) {
	bridgeClient := bridge.NewBloockBridge()
	res, err := bridgeClient.Encryption().GetEncryptionAlg(context.Background(), &proto.EncryptionAlgRequest{ConfigData: c.configData, Record: r.ToProto()})

	if err != nil {
		return entity.UNRECOGNIZED_ENCRYPTION_ALG, err
	}

	if res.Error != nil {
		return entity.UNRECOGNIZED_ENCRYPTION_ALG, errors.New(res.Error.Message)
	}

	return entity.EncryptionAlgFromProto[res.Alg], nil
}
