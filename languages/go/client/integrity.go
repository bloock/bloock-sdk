package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

type IntegrityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewIntegrityClient() IntegrityClient {
	return IntegrityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

func NewIntegrityClientWithConfig(configData *proto.ConfigData) IntegrityClient {
	return IntegrityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

func (c *IntegrityClient) SendRecords(records []entity.Record) ([]entity.RecordReceipt, error) {
	res, err := c.bridgeClient.Integrity().SendRecords(context.Background(), &proto.SendRecordsRequest{
		ConfigData: c.configData,
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

func (c *IntegrityClient) GetAnchor(anchorID int64) (entity.Anchor, error) {
	res, err := c.bridgeClient.Integrity().GetAnchor(context.Background(), &proto.GetAnchorRequest{
		ConfigData: c.configData,
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

func (c *IntegrityClient) WaitAnchor(anchorID int64, params entity.AnchorParams) (entity.Anchor, error) {
	if params.Timeout == 0 {
		params.Timeout = int64(120000)
	}

	res, err := c.bridgeClient.Integrity().WaitAnchor(context.Background(), &proto.WaitAnchorRequest{
		ConfigData: c.configData,
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

func (c *IntegrityClient) GetProof(records []entity.Record) (entity.Proof, error) {
	res, err := c.bridgeClient.Integrity().GetProof(context.Background(), &proto.GetProofRequest{
		ConfigData: c.configData,
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

func (c *IntegrityClient) VerifyProof(proof entity.Proof) (string, error) {
	res, err := c.bridgeClient.Integrity().VerifyProof(context.Background(), &proto.VerifyProofRequest{
		ConfigData: c.configData,
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

func (c *IntegrityClient) VerifyRecords(records []entity.Record, params entity.NetworkParams) (uint64, error) {
	res, err := c.bridgeClient.Integrity().VerifyRecords(context.Background(), &proto.VerifyRecordsRequest{
		ConfigData: c.configData,
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

func (c *IntegrityClient) ValidateRoot(root string, network entity.Network) (uint64, error) {
	res, err := c.bridgeClient.Integrity().ValidateRoot(context.Background(), &proto.ValidateRootRequest{
		ConfigData: c.configData,
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
