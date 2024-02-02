package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/entity/record"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
	"github.com/bloock/bloock-sdk-go/v2/internal/config"
)

// IntegrityClient provides functionality to interact with the [Bloock Integrity service].
//
// [Bloock Integrity service]: https://bloock.com
type IntegrityClient struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

// NewIntegrityClient creates a new IntegrityClient with default configuration.
func NewIntegrityClient() IntegrityClient {
	return IntegrityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigDataDefault(),
	}
}

// NewIntegrityClientWithConfig creates a new IntegrityClient with the given configuration.
func NewIntegrityClientWithConfig(configData *proto.ConfigData) IntegrityClient {
	return IntegrityClient{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   configData,
	}
}

// SendRecords sends records to the Bloock Integrity service for certification.
func (c *IntegrityClient) SendRecords(records []record.Record) ([]integrity.RecordReceipt, error) {
	res, err := c.bridgeClient.Integrity().SendRecords(context.Background(), &proto.SendRecordsRequest{
		ConfigData: c.configData,
		Records:    record.MapRecordsToProto(records),
	})

	if err != nil {
		return []integrity.RecordReceipt{}, err
	}

	if res.Error != nil {
		return []integrity.RecordReceipt{}, errors.New(res.Error.Message)
	}

	receipts := make([]integrity.RecordReceipt, len(res.Records))
	for i, record := range res.Records {
		receipts[i] = integrity.NewRecordReceiptFromProto(record)
	}

	return receipts, nil
}

// GetAnchor retrieves an anchor by its ID from the Bloock Integrity service.
func (c *IntegrityClient) GetAnchor(anchorID int64) (integrity.Anchor, error) {
	res, err := c.bridgeClient.Integrity().GetAnchor(context.Background(), &proto.GetAnchorRequest{
		ConfigData: c.configData,
		AnchorId:   anchorID,
	})

	if err != nil {
		return integrity.Anchor{}, err
	}

	if res.Error != nil {
		return integrity.Anchor{}, errors.New(res.Error.Message)
	}

	return integrity.NewAnchorFromProto(res.Anchor), nil
}

// WaitAnchor waits for the completion of an anchor on the Bloock Integrity service.
func (c *IntegrityClient) WaitAnchor(anchorID int64, params integrity.AnchorParams) (integrity.Anchor, error) {
	if params.Timeout == 0 {
		params.Timeout = int64(120000)
	}

	res, err := c.bridgeClient.Integrity().WaitAnchor(context.Background(), &proto.WaitAnchorRequest{
		ConfigData: c.configData,
		AnchorId:   anchorID,
		Timeout:    params.Timeout,
	})

	if err != nil {
		return integrity.Anchor{}, err
	}

	if res.Error != nil {
		return integrity.Anchor{}, errors.New(res.Error.Message)
	}

	return integrity.NewAnchorFromProto(res.Anchor), nil
}

// GetProof retrieves a proof for a set of records from the Bloock Integrity service.
func (c *IntegrityClient) GetProof(records []record.Record) (integrity.Proof, error) {
	res, err := c.bridgeClient.Integrity().GetProof(context.Background(), &proto.GetProofRequest{
		ConfigData: c.configData,
		Records:    record.MapRecordsToProto(records),
	})

	if err != nil {
		return integrity.Proof{}, err
	}

	if res.Error != nil {
		return integrity.Proof{}, errors.New(res.Error.Message)
	}

	return integrity.NewProofFromProto(res.Proof), nil
}

// VerifyProof verifies the integrity of a proof.
func (c *IntegrityClient) VerifyProof(proof integrity.Proof) (string, error) {
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

// VerifyRecords verifies the integrity of a set of records.
func (c *IntegrityClient) VerifyRecords(records []record.Record, params integrity.NetworkParams) (uint64, error) {
	res, err := c.bridgeClient.Integrity().VerifyRecords(context.Background(), &proto.VerifyRecordsRequest{
		ConfigData: c.configData,
		Records:    record.MapRecordsToProto(records),
		Network:    integrity.NetworkToProto(params.Network),
	})

	if err != nil {
		return 0, err
	}

	if res.Error != nil {
		return 0, errors.New(res.Error.Message)
	}

	return res.Timestamp, nil
}

// ValidateRoot validates the integrity of a merkle root proof on blockchain.
func (c *IntegrityClient) ValidateRoot(root string, params integrity.NetworkParams) (uint64, error) {
	res, err := c.bridgeClient.Integrity().ValidateRoot(context.Background(), &proto.ValidateRootRequest{
		ConfigData: c.configData,
		Root:       root,
		Network:    *integrity.NetworkToProto(params.Network),
	})

	if err != nil {
		return 0, err
	}

	if res.Error != nil {
		return 0, errors.New(res.Error.Message)
	}

	return res.Timestamp, nil
}
