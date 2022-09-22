package test

import (
	"testing"

	bloock "github.com/bloock/go-bridge/client"
	"github.com/stretchr/testify/assert"
)

func TestFunctionalSendRecord(t *testing.T) {
	sdk := GetSdk()

	records := make([]*bloock.Record, 0)
	record, err := sdk.NewRecordFromString("Example Data 1")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 2")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 3")
	records = append(records, record)

	r, err := sdk.SendRecords(records)
	assert.Nil(t, err)
	assert.Greater(t, r[0].Anchor, int64(0))
	assert.Greater(t, len(r[0].Client), 0)
	assert.Equal(t, r[0].Record, records[0].GetHash())
	assert.Equal(t, "Pending", r[0].Status)
}

func TestFunctionalWaitAnchor(t *testing.T) {
	sdk := GetSdk()

	records := make([]*bloock.Record, 0)
	record, err := sdk.NewRecordFromString("Example Data 4")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 5")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 6")
	records = append(records, record)

	r, err := sdk.SendRecords(records)
	assert.Nil(t, err)
	assert.NotNil(t, r)
	assert.NotNil(t, r[0])

	a, err := sdk.WaitAnchor(r[0].Anchor)
	assert.Nil(t, err)
	assert.Greater(t, a.Id, int64(0))
	assert.Greater(t, len(a.BlockRoots), 0)
	assert.Greater(t, len(a.Networks), 0)
	assert.Greater(t, len(a.Root), 0)
	assert.Greater(t, len(a.Status), 0)
}

func TestFunctionalGetProof(t *testing.T) {
	sdk := GetSdk()

	records := make([]*bloock.Record, 0)
	record, err := sdk.NewRecordFromString("Example Data 4")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 5")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 6")
	records = append(records, record)

	p, err := sdk.GetProof(records)
	assert.Nil(t, err)
	assert.NotNil(t, p)
}

func TestFunctionalVerifyProof(t *testing.T) {
	sdk := GetSdk()

	records := make([]*bloock.Record, 0)
	record, err := sdk.NewRecordFromString("Example Data 4")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 5")
	records = append(records, record)
	record, err = sdk.NewRecordFromString("Example Data 6")
	records = append(records, record)

	p, err := sdk.GetProof(records)
	assert.Nil(t, err)
	assert.NotNil(t, p)

	root, err := sdk.VerifyProof(p)
	assert.Nil(t, err)
	assert.NotNil(t, root)

	timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
	assert.Greater(t, timestamp, uint64(0))
}