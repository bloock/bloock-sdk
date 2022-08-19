package main

import (
	"context"
	"errors"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
	"github.com/bloock/go-bridge/internal/config"
)

type Client struct {
	bridgeClient bridge.BloockBridge
	configData   *proto.ConfigData
}

func NewClient(apiKey string) Client {
	return Client{
		bridgeClient: bridge.NewBloockBridge(),
		configData:   config.NewConfigData(apiKey),
	}
}

func (c Client) SetApiHost(host string) {
	c.configData.Config.Host = host
}

func (c Client) SetNetworkConfig(network int32, config *NetworkConfig) {
	c.configData.NetworksConfig[network] = config
}

func (c Client) SendRecords(records []*Record) ([]*RecordReceipt, error) {
	res, err := c.bridgeClient.Record().SendRecords(context.Background(), &proto.SendRecordsRequest{
		ConfigData: c.configData,
		Records:    records,
	})

	if err != nil {
		return []*RecordReceipt{}, err
	}

	if res.Error != nil {
		return []*RecordReceipt{}, errors.New(res.Error.Message)
	}

	return res.Records, nil
}

func (c Client) GetAnchor(anchorID int64) (*Anchor, error) {
	res, err := c.bridgeClient.Anchor().GetAnchor(context.Background(), &proto.GetAnchorRequest{
		ConfigData: c.configData,
		AnchorId:   anchorID,
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Anchor, nil
}

func (c Client) WaitAnchor(anchorID int64 /*TODO Timeout param*/) (*Anchor, error) {
	res, err := c.bridgeClient.Anchor().GetAnchor(context.Background(), &proto.GetAnchorRequest{
		ConfigData: c.configData,
		AnchorId:   anchorID,
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Anchor, nil
}

func (c Client) GetProof(records []*Record) (*Proof, error) {
	res, err := c.bridgeClient.Proof().GetProof(context.Background(), &proto.GetProofRequest{
		ConfigData: c.configData,
		Records:    records,
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Proof, nil
}

func (c Client) VerifyProof(proof *Proof) (*Record, error) {
	res, err := c.bridgeClient.Proof().VerifyProof(context.Background(), &proto.VerifyProofRequest{
		ConfigData: c.configData,
		Proof:      proof,
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Record, nil
}

func (c Client) VerifyRecords(records []*Record, network *Network) (uint64, error) {
	res, err := c.bridgeClient.Proof().VerifyRecords(context.Background(), &proto.VerifyRecordsRequest{
		ConfigData: c.configData,
		Records:    records,
		Network:    network,
	})

	if err != nil {
		return 0, err
	}

	if res.Error != nil {
		return 0, errors.New(res.Error.Message)
	}

	return res.State, nil
}

func (c Client) NewRecordFromHash(hash string) (*Record, error) {
	record, err := c.bridgeClient.Record().FromHash(context.Background(), &proto.FromHashRequest{
		Hash: hash,
	})

	if err != nil {
		return nil, err
	}

	return record, nil
}

func (c Client) NewRecordFromHex(hex string) (*Record, error) {
	res, err := c.bridgeClient.Record().FromHex(context.Background(), &proto.FromHexRequest{
		Hex: hex,
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, err
	}

	return res.Record, nil
}

func (c Client) NewRecordFromString(string string) (*Record, error) {
	record, err := c.bridgeClient.Record().FromString(context.Background(), &proto.FromStringRequest{
		Str: string,
	})

	if err != nil {
		return nil, err
	}

	return record, nil
}

func (c Client) NewRecordFromTypedArray(array []byte) (*Record, error) {
	record, err := c.bridgeClient.Record().FromTypedArray(context.Background(), &proto.FromTypedArrayRequest{
		Array: array,
	})

	if err != nil {
		return nil, err
	}

	return record, nil
}
