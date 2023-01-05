package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/client/entity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type Client struct {
	bridgeClient bridge.BloockBridge
}

func NewClient() Client {
	return Client{
		bridgeClient: bridge.NewBloockBridge(),
	}
}

func (c *Client) SendRecords(records []entity.Record) ([]entity.RecordReceipt, error) {
	res, err := c.bridgeClient.Record().SendRecords(context.Background(), &proto.SendRecordsRequest{
		ConfigData: config.NewConfigData(),
		Records:    entity.MapRecordsToProto(records),
	})

	if err != nil {
		return []entity.RecordReceipt{}, err
	}

	if res.Error != nil {
		return []entity.RecordReceipt{}, errors.New(res.Error.Message)
	}

	receipts := make([]entity.RecordReceipt, len(res.Records))
	for i, record := range res.Records {
		receipts[i] = entity.NewRecordReceiptFromProto(record)
	}

	return receipts, nil
}

func (c *Client) GetAnchor(anchorID int64) (entity.Anchor, error) {
	res, err := c.bridgeClient.Anchor().GetAnchor(context.Background(), &proto.GetAnchorRequest{
		ConfigData: config.NewConfigData(),
		AnchorId:   anchorID,
	})

	if err != nil {
		return entity.Anchor{}, err
	}

	if res.Error != nil {
		return entity.Anchor{}, errors.New(res.Error.Message)
	}

	return entity.NewAnchorFromProto(res.Anchor), nil
}

func (c *Client) WaitAnchor(anchorID int64, params entity.AnchorParams) (entity.Anchor, error) {
	if params.Timeout == 0 {
		params.Timeout = int64(120000)
	}

	res, err := c.bridgeClient.Anchor().WaitAnchor(context.Background(), &proto.WaitAnchorRequest{
		ConfigData: config.NewConfigData(),
		AnchorId:   anchorID,
		Timeout:    params.Timeout,
	})

	if err != nil {
		return entity.Anchor{}, err
	}

	if res.Error != nil {
		return entity.Anchor{}, errors.New(res.Error.Message)
	}

	return entity.NewAnchorFromProto(res.Anchor), nil
}

func (c *Client) GetProof(records []entity.Record) (entity.Proof, error) {
	res, err := c.bridgeClient.Proof().GetProof(context.Background(), &proto.GetProofRequest{
		ConfigData: config.NewConfigData(),
		Records:    entity.MapRecordsToProto(records),
	})

	if err != nil {
		return entity.Proof{}, err
	}

	if res.Error != nil {
		return entity.Proof{}, errors.New(res.Error.Message)
	}

	return entity.NewProofFromProto(res.Proof), nil
}

func (c *Client) VerifyProof(proof entity.Proof) (string, error) {
	res, err := c.bridgeClient.Proof().VerifyProof(context.Background(), &proto.VerifyProofRequest{
		ConfigData: config.NewConfigData(),
		Proof:      proof.ToProto(),
	})

	if err != nil {
		return "", err
	}

	if res.Error != nil {
		return "", errors.New(res.Error.Message)
	}

	return *res.Record, nil
}

func (c *Client) VerifyRecords(records []entity.Record, params entity.NetworkParams) (uint64, error) {
	res, err := c.bridgeClient.Proof().VerifyRecords(context.Background(), &proto.VerifyRecordsRequest{
		ConfigData: config.NewConfigData(),
		Records:    entity.MapRecordsToProto(records),
		Network:    entity.NetworkToProto(params.Network),
	})

	if err != nil {
		return 0, err
	}

	if res.Error != nil {
		return 0, errors.New(res.Error.Message)
	}

	return res.Timestamp, nil
}

func (c *Client) ValidateRoot(root string, network entity.Network) (uint64, error) {
	res, err := c.bridgeClient.Proof().ValidateRoot(context.Background(), &proto.ValidateRootRequest{
		ConfigData: config.NewConfigData(),
		Root:       root,
		Network:    network,
	})

	if err != nil {
		return 0, err
	}

	if res.Error != nil {
		return 0, errors.New(res.Error.Message)
	}

	return res.Timestamp, nil
}

func (c *Client) GenerateKeys() (entity.KeyPair, error) {
	res, err := c.bridgeClient.Record().GenerateKeys(context.Background(), &proto.GenerateKeysRequest{
		ConfigData: config.NewConfigData(),
	})

	if err != nil {
		return entity.KeyPair{}, err
	}

	if res.Error != nil {
		return entity.KeyPair{}, errors.New(res.Error.Message)
	}

	return entity.NewKeysFromProto(res), nil
}

func (c *Client) GenerateRsaKeyPair() (entity.KeyPair, error) {
	res, err := c.bridgeClient.Record().GenerateRsaKeyPair(context.Background(), &proto.GenerateRsaKeyPairRequest{
		ConfigData: config.NewConfigData(),
	})

	if err != nil {
		return entity.KeyPair{}, err
	}

	if res.Error != nil {
		return entity.KeyPair{}, errors.New(res.Error.Message)
	}

	return entity.NewRsaKeyPairFromProto(res), nil
}

func (c *Client) GenerateEciesKeyPair() (entity.KeyPair, error) {
	res, err := c.bridgeClient.Record().GenerateEciesKeyPair(context.Background(), &proto.GenerateEciesKeyPairRequest{
		ConfigData: config.NewConfigData(),
	})

	if err != nil {
		return entity.KeyPair{}, err
	}

	if res.Error != nil {
		return entity.KeyPair{}, errors.New(res.Error.Message)
	}

	return entity.NewEciesKeyPairFromProto(res), nil
}

func (c *Client) VerifyWebhookSignature(payload []byte, header string, secretKey string, enforceTolerance bool) (bool, error) {
	res, err := c.bridgeClient.Webhook().VerifyWebhookSignature(context.Background(), &proto.VerifyWebhookSignatureRequest{
		ConfigData:       config.NewConfigData(),
		Payload:          payload,
		Header:           header,
		SecretKey:        secretKey,
		EnforceTolerance: enforceTolerance,
	})

	if err != nil {
		return false, err
	}

	if res.Error != nil {
		return false, errors.New(res.Error.Message)
	}

	return res.IsValid, nil
}
