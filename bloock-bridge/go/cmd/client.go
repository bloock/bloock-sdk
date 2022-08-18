package main

import (
	"context"
	"errors"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)

type Client struct {
	client     bridge.BloockBridge
	configData *proto.ConfigData
}

func NewClient(apiKey string) Client {
	return Client{
		client: bridge.NewBloockBridge(),
		configData: &proto.ConfigData{
			Config: &proto.Configuration{
				Host:                       "https://api.bloock.dev",
				ApiKey:                     apiKey,
				WaitMessageIntervalFactor:  2,
				WaitMessageIntervalDefault: 5000,
				KeyTypeAlgorithm:           "EC",
				EllipticCurveKey:           "secp256k1",
				SignatureAlgorithm:         "'ES256K'",
			},
			NetworksConfig: map[int32]*proto.NetworkConfig{
				int32(proto.Network_ETHEREUM_MAINNET): {
					ContractAddress: "522b2040CdfD247ED60921623044dF1c929524B7",
					ContractAbi:     "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"role_manager\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"state_manager\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"previousAdminRole\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"newAdminRole\",\"type\":\"bytes32\"}],\"name\":\"RoleAdminChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleGranted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleRevoked\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"DEFAULT_ADMIN_ROLE\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"STATE_MANAGER\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"}],\"name\":\"getRoleAdmin\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"getState\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"grantRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"hasRole\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"isStatePresent\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"renounceRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"revokeRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"updateState\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"content\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"hashes\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes\",\"name\":\"bitmap\",\"type\":\"bytes\"},{\"internalType\":\"uint32[]\",\"name\":\"depths\",\"type\":\"uint32[]\"}],\"name\":\"verifyInclusionProof\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
					HttpProvider:    "https://mainnet.infura.io/v3/40e23a35d578492daacb318023772b52",
				},
				int32(proto.Network_ETHEREUM_RINKEBY): {
					ContractAddress: "7E22c795325E76306920293F62a02F353536280b",
					ContractAbi:     "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"role_manager\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"state_manager\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"previousAdminRole\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"newAdminRole\",\"type\":\"bytes32\"}],\"name\":\"RoleAdminChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleGranted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleRevoked\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"DEFAULT_ADMIN_ROLE\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"STATE_MANAGER\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"}],\"name\":\"getRoleAdmin\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"getState\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"grantRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"hasRole\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"isStatePresent\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"renounceRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"revokeRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"updateState\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"content\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"hashes\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes\",\"name\":\"bitmap\",\"type\":\"bytes\"},{\"internalType\":\"uint32[]\",\"name\":\"depths\",\"type\":\"uint32[]\"}],\"name\":\"verifyInclusionProof\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
					HttpProvider:    "https://rinkeby.infura.io/v3/40e23a35d578492daacb318023772b52",
				},
				int32(proto.Network_BLOOCK_CHAIN): {
					ContractAddress: "d2d1BBcbee7741f8C846826F55b7c17fc5cf969a",
					ContractAbi:     "[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"role_manager\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"state_manager\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"previousAdminRole\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"newAdminRole\",\"type\":\"bytes32\"}],\"name\":\"RoleAdminChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleGranted\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"}],\"name\":\"RoleRevoked\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"DEFAULT_ADMIN_ROLE\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"STATE_MANAGER\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"}],\"name\":\"getRoleAdmin\",\"outputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"getState\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"grantRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"hasRole\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"isStatePresent\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"renounceRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"role\",\"type\":\"bytes32\"},{\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"}],\"name\":\"revokeRole\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes4\",\"name\":\"interfaceId\",\"type\":\"bytes4\"}],\"name\":\"supportsInterface\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"state_root\",\"type\":\"bytes32\"}],\"name\":\"updateState\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32[]\",\"name\":\"content\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes32[]\",\"name\":\"hashes\",\"type\":\"bytes32[]\"},{\"internalType\":\"bytes\",\"name\":\"bitmap\",\"type\":\"bytes\"},{\"internalType\":\"uint32[]\",\"name\":\"depths\",\"type\":\"uint32[]\"}],\"name\":\"verifyInclusionProof\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]",
					HttpProvider:    "https://ganache.bloock.com",
				},
			},
		},
	}
}

func (c Client) SendRecords(records []*proto.Record) ([]*proto.RecordReceipt, error) {
	res, err := c.client.Record().SendRecords(context.Background(), &proto.SendRecordsRequest{
		ConfigData: c.configData,
		Records:    records,
	})

	if err != nil {
		return []*proto.RecordReceipt{}, err
	}

	if res.Error != nil {
		return []*proto.RecordReceipt{}, errors.New(res.Error.Message)
	}

	return res.Records, nil
}

func (c Client) GetAnchor(anchorID int64) (*proto.Anchor, error) {
	res, err := c.client.Anchor().GetAnchor(context.Background(), &proto.GetAnchorRequest{
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

func (c Client) WaitAnchor(anchorID int64 /*TODO Timeout param*/) (*proto.Anchor, error) {
	res, err := c.client.Anchor().GetAnchor(context.Background(), &proto.GetAnchorRequest{
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

func (c Client) GetProof(records []*proto.Record) (*proto.Proof, error) {
	res, err := c.client.Proof().GetProof(context.Background(), &proto.GetProofRequest{
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

func (c Client) VerifyProof(proof *proto.Proof) (*proto.Record, error) {
	res, err := c.client.Proof().VerifyProof(context.Background(), &proto.VerifyProofRequest{
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

func (c Client) VerifyRecords(records []*proto.Record, network *proto.Network) (uint64, error) {
	res, err := c.client.Proof().VerifyRecords(context.Background(), &proto.VerifyRecordsRequest{
		ConfigData: c.configData,
		Records:    []*proto.Record{},
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

func (c Client) NewRecordFromHash(hash string) (*proto.Record, error) {
    record, err := c.client.Record().FromHash(context.Background(), &proto.FromHashRequest{
    	Hash: hash,
    })

    if err != nil {
        return nil, err
    }

    return record, nil
}

func (c Client) NewRecordFromHex(hex string) (*proto.Record, error) {
    res, err := c.client.Record().FromHex(context.Background(), &proto.FromHexRequest{
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

func (c Client) NewRecordFromString(string string) (*proto.Record, error) {
    record, err := c.client.Record().FromString(context.Background(), &proto.FromStringRequest{
    	Str: string,
    })

    if err != nil {
        return nil, err
    }

    return record, nil
}

func (c Client) NewRecordFromTypedArray(array []byte) (*proto.Record, error) {
    record, err := c.client.Record().FromTypedArray(context.Background(), &proto.FromTypedArrayRequest{
    	Array: array,
    })

    if err != nil {
        return nil, err
    }

    return record, nil
}
