package test

// import (
// 	"testing"
//
// 	bloock "github.com/bloock/go-bridge/client"
// 	"github.com/bloock/go-bridge/client/entity"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/require"
// )
//
// func TestEndToEnd(t *testing.T) {
// 	sdk := GetSdk()
//
// 	t.Run("Basic E2E", func(t *testing.T) {
// 		record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
// 		require.NoError(t, err)
// 		hash, err := record.GetHash()
// 		records := []string{hash}
//
// 		receipt, err := sdk.SendRecords(records)
// 		require.NoError(t, err)
// 		assert.Greater(t, len(receipt), 0)
// 		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])
//
// 		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
// 		require.NoError(t, err)
// 		assert.Equal(t, receipt[0].Anchor, anchor.Id)
//
// 		proof, err := sdk.GetProof(records)
// 		require.NoError(t, err)
//
// 		root, err := sdk.VerifyProof(proof)
// 		require.NoError(t, err)
//
// 		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
// 		require.NoError(t, err)
// 		assert.Greater(t, timestamp, uint64(0))
// 	})
//
// 	t.Run("E2E with multiple records", func(t *testing.T) {
// 		records := make([]string, 10)
// 		for i := 0; i < len(records); i++ {
// 			record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
// 			require.NoError(t, err)
// 			hash, err := record.GetHash()
// 			records[i] = hash
// 		}
//
// 		receipt, err := sdk.SendRecords(records)
// 		require.NoError(t, err)
// 		assert.Greater(t, len(receipt), 0)
// 		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])
//
// 		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
// 		require.NoError(t, err)
// 		assert.Equal(t, receipt[0].Anchor, anchor.Id)
//
// 		proof, err := sdk.GetProof(records)
// 		require.NoError(t, err)
//
// 		root, err := sdk.VerifyProof(proof)
// 		require.NoError(t, err)
//
// 		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
// 		require.NoError(t, err)
// 		assert.Greater(t, timestamp, uint64(0))
// 	})
//
// 	t.Run("E2E with VerifyRecords", func(t *testing.T) {
// 		record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
// 		require.NoError(t, err)
//
// 		hash, err := record.GetHash()
// 		records := []string{hash}
//
// 		receipt, err := sdk.SendRecords(records)
// 		require.NoError(t, err)
// 		assert.Greater(t, len(receipt), 0)
// 		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])
//
// 		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
// 		require.NoError(t, err)
// 		assert.Equal(t, receipt[0].Anchor, anchor.Id)
//
// 		timestamp, err := sdk.VerifyRecords(records, bloock.NewNetworkParams())
// 		require.NoError(t, err)
// 		assert.Greater(t, timestamp, uint64(0))
// 	})
//
// 	t.Run("E2E using all the builders", func(t *testing.T) {
// 		records := []string{}
//
// 		record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
// 		require.NoError(t, err)
// 		hash, err := record.GetHash()
// 		records = append(records, hash)
//
// 		record, err = bloock.NewRecordBuilderFromBytes([]byte(randHex(64))).Build()
// 		require.NoError(t, err)
// 		hash, err = record.GetHash()
// 		records = append(records, hash)
//
// 		record, err = bloock.NewRecordBuilderFromHex(randHex(64)).Build()
// 		require.NoError(t, err)
// 		hash, err = record.GetHash()
// 		records = append(records, hash)
//
// 		record, err = bloock.NewRecordBuilderFromJSON("{\"name\":\"John\",\"age\":30,\"car\":null}").Build()
// 		require.NoError(t, err)
// 		hash, err = record.GetHash()
// 		records = append(records, hash)
//
// 		record, err = bloock.NewRecordBuilderFromRecord(record).Build()
// 		require.NoError(t, err)
// 		hash, err = record.GetHash()
// 		records = append(records, hash)
//
// 		record, err = bloock.NewRecordBuilderFromFile([]byte{97, 115, 100, 102, 10}).Build()
// 		require.NoError(t, err)
// 		hash, err = record.GetHash()
// 		records = append(records, hash)
//
// 		receipt, err := sdk.SendRecords(records)
// 		require.NoError(t, err)
// 		assert.Greater(t, len(receipt), 0)
// 		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])
//
// 		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
// 		require.NoError(t, err)
// 		assert.Equal(t, receipt[0].Anchor, anchor.Id)
//
// 		timestamp, err := sdk.VerifyRecords(records, bloock.NewNetworkParams())
// 		require.NoError(t, err)
// 		assert.Greater(t, timestamp, uint64(0))
// 	})
//
// }
