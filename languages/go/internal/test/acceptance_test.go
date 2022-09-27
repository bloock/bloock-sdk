package test

// import (
// 	"math"
// 	"math/rand"
// 	"strconv"
// 	"testing"
//
// 	bloock "github.com/bloock/bloock-sdk-go/client"
// 	"github.com/stretchr/testify/assert"
// 	"github.com/stretchr/testify/require"
// )
//
// func TestAcceptance(t *testing.T) {
// 	sdk := GetSdk()
//
// 	t.Run("Basic test E2E", func(t *testing.T) {
// 		record, err := bloock.NewRecordFromString(randHex(64))
// 		require.NoError(t, err)
// 		records := []*bloock.Record{record}
//
// 		receipt, err := sdk.SendRecords(records)
// 		require.NoError(t, err)
// 		assert.Greater(t, len(receipt), 0)
// 		assert.NotEqual(t, bloock.RecordReceipt{}, receipt[0])
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
//
// 		timestamp, err = sdk.VerifyRecords(records, bloock.NewNetworkParams())
// 		require.NoError(t, err)
// 		assert.Greater(t, timestamp, uint64(0))
// 	})
//
// 	t.Run("Test send records invalid record input wrong char", func(t *testing.T) {
// 		record, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG")
// 		require.NoError(t, err)
//
// 		records := []*bloock.Record{record}
// 		_, err = sdk.SendRecords(records)
//
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test send records invalid record input missing chars", func(t *testing.T) {
// 		record1, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
// 		require.NoError(t, err)
// 		record2, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994")
// 		require.NoError(t, err)
//
// 		records := []*bloock.Record{record1, record2}
// 		_, err = sdk.SendRecords(records)
//
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test send records invalid record input wrong start", func(t *testing.T) {
// 		record1, err := bloock.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
// 		require.NoError(t, err)
// 		record2, err := bloock.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb")
// 		require.NoError(t, err)
//
// 		records := []*bloock.Record{record1, record2}
//
// 		_, err = sdk.SendRecords(records)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test send records empty record input", func(t *testing.T) {
// 		res, err := sdk.SendRecords([]*bloock.Record{})
// 		require.NoError(t, err)
// 		assert.Nil(t, res)
// 	})
//
// 	t.Run("Test get anchor non existing anchor", func(t *testing.T) {
// 		_, err := sdk.GetAnchor(666666666666666666)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.AnchorNotFoundError, err.Error())
// 	})
//
// 	t.Run("Test wait anchor non existing anchor", func(t *testing.T) {
//         params := bloock.NewAnchorParams()
//         params.Timeout = 3000
//
// 		_, err := sdk.WaitAnchor(666666666666666666, params)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.WaitAnchorTimeoutError, err.Error())
// 	})
//
// 	t.Run("Test get proof invalid record input wrong char", func(t *testing.T) {
// 		record, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG")
// 		require.NoError(t, err)
// 		records := []*bloock.Record{record}
//
// 		_, err = sdk.GetProof(records)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test get proof invalid record input missing chars", func(t *testing.T) {
// 		record1, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
// 		require.NoError(t, err)
// 		record2, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994")
// 		require.NoError(t, err)
//
// 		records := []*bloock.Record{record1, record2}
//
// 		_, err = sdk.GetProof(records)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test get proof invalid record input wrong start", func(t *testing.T) {
// 		record1, err := bloock.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
// 		record2, err := bloock.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb")
//
// 		records := []*bloock.Record{record1, record2}
//
// 		_, err = sdk.GetProof(records)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test get proof non-existant leaf", func(t *testing.T) {
// 		record, err := bloock.NewRecordFromHash("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee")
// 		require.NoError(t, err)
//
// 		records := []*bloock.Record{record}
//
// 		_, err = sdk.GetProof(records)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.RecordNotFoundError, err.Error())
// 	})
//
// 	t.Run("Test verify records invalid record input wrong char", func(t *testing.T) {
// 		record, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aG")
// 		require.NoError(t, err)
// 		records := []*bloock.Record{record}
//
//         params := bloock.NewNetworkParams()
//         params.Network = bloock.ListOfNetworks().BloockChain
//
// 		_, err = sdk.VerifyRecords(records, params)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test verify records invalid record input missing chars", func(t *testing.T) {
// 		record1, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
// 		require.NoError(t, err)
// 		record2, err := bloock.NewRecordFromHash("e016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994")
// 		require.NoError(t, err)
//
// 		records := []*bloock.Record{record1, record2}
//
//         params := bloock.NewNetworkParams()
//         params.Network = bloock.ListOfNetworks().BloockChain
//
// 		_, err = sdk.VerifyRecords(records, params)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test verify records invalid record input wrong start", func(t *testing.T) {
// 		record1, err := bloock.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994aa")
// 		record2, err := bloock.NewRecordFromHash("0xe016214a5c4abb88b8b614a916b1a6f075dfcf6fbc16c1e9d6e8ebcec81994bb")
//
// 		records := []*bloock.Record{record1, record2}
//
//         params := bloock.NewNetworkParams()
//         params.Network = bloock.ListOfNetworks().BloockChain
//
// 		_, err = sdk.VerifyRecords(records, params)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.InvalidRecordError, err.Error())
// 	})
//
// 	t.Run("Test verify records non-existant leaf", func(t *testing.T) {
// 		record, err := bloock.NewRecordFromHash("0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdee")
//
// 		records := []*bloock.Record{record}
//
//         params := bloock.NewNetworkParams()
//         params.Network = bloock.ListOfNetworks().BloockChain
//
// 		_, err = sdk.VerifyRecords(records,params)
// 		assert.Error(t, err)
// 		assert.Equal(t, bloock.RecordNotFoundError, err.Error())
// 	})
// }
