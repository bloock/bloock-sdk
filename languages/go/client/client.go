package client

import (
	"context"
	"errors"

	"github.com/bloock/bloock-sdk-go/v2/client/entity"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge"
	"github.com/bloock/bloock-sdk-go/v2/internal/bridge/proto"
)

type Client struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewClient(apiKey string) Client {
	return Client{
		bridgeClient: bridge.NewBloockBridge(),
		configData: &proto.ConfigData{
			Config: &proto.Configuration{ApiKey: apiKey},
		},
	}
}

func (c *Client) SetApiHost(host string) {
	c.configData.Config.Host = host
}

func (c *Client) SetNetworkConfig(network entity.Network, config *entity.NetworkConfig) {
	c.configData.NetworksConfig[int32(network)] = config
}

func (c *Client) SendRecords(records []string) ([]entity.RecordReceipt, error) {
	res, err := c.bridgeClient.Record().SendRecords(context.Background(), &proto.SendRecordsRequest{
		ConfigData: c.configData,
		Records:    records,
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

func (c *Client) WaitAnchor(anchorID int64, params entity.AnchorParams) (entity.Anchor, error) {
	if params.Timeout == 0 {
		params.Timeout = int64(120000)
	}

	res, err := c.bridgeClient.Anchor().WaitAnchor(context.Background(), &proto.WaitAnchorRequest{
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

func (c *Client) GetProof(records []string) (entity.Proof, error) {
	res, err := c.bridgeClient.Proof().GetProof(context.Background(), &proto.GetProofRequest{
		ConfigData: c.configData,
		Records:    records,
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

func (c *Client) VerifyRecords(records []string, params entity.NetworkParams) (uint64, error) {
	res, err := c.bridgeClient.Proof().VerifyRecords(context.Background(), &proto.VerifyRecordsRequest{
		ConfigData: c.configData,
		Records:    records,
		Network:    params.Network.Enum(),
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

func (c *Client) GenerateKeys() (entity.Keys, error) {
	res, err := c.bridgeClient.Record().GenerateKeys(context.Background(), &proto.GenerateKeysRequest{})

	if err != nil {
		return entity.Keys{}, err
	}

	if res.Error != nil {
		return entity.Keys{}, errors.New(res.Error.Message)
	}

	return entity.NewKeysFromProto(res), nil
}
