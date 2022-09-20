package bloock

import (
	"context"
	"errors"

	"github.com/bloock/go-bridge/internal/bridge"
	"github.com/bloock/go-bridge/internal/bridge/proto"
)
 
func NewRecordFromHash(hash string) (*Record, error) {
    client := bridge.NewBloockBridge()
	record, err := client.Record().FromHash(context.Background(), &proto.FromHashRequest{
		Hash: hash,
	})

	if err != nil {
		return nil, err
	}

	return record, nil
}

func NewRecordFromHex(hex string) (*Record, error) {
    client := bridge.NewBloockBridge()
	res, err := client.Record().FromHex(context.Background(), &proto.FromHexRequest{
		Hex: hex,
	})

	if err != nil {
		return nil, err
	}

	if res.Error != nil {
		return nil, errors.New(res.Error.Message)
	}

	return res.Record, nil
}

func NewRecordFromString(string string) (*Record, error) {
    client := bridge.NewBloockBridge()
	record, err := client.Record().FromString(context.Background(), &proto.FromStringRequest{
		Str: string,
	})

	if err != nil {
		return nil, err
	}

	return record, nil
}

func NewRecordFromTypedArray(array []byte) (*Record, error) {
    client := bridge.NewBloockBridge()
	record, err := client.Record().FromTypedArray(context.Background(), &proto.FromTypedArrayRequest{
		Array: array,
	})

	if err != nil {
		return nil, err
	}

	return record, nil
}
