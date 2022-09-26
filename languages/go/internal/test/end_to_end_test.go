package test

import (
	"encoding/hex"
	"testing"

	bloock "github.com/bloock/bloock-sdk-go/client"
	"github.com/bloock/bloock-sdk-go/client/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEndToEnd(t *testing.T) {
	sdk := GetSdk()

	t.Run("Basic E2E", func(t *testing.T) {
		record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)
		records := []string{hash}

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		get_anchor, err := sdk.GetAnchor(receipt[0].Anchor)
		assert.Equal(t, receipt[0].Anchor, get_anchor.Id)

		proof, err := sdk.GetProof(records)
		require.NoError(t, err)

		root, err := sdk.VerifyProof(proof)
		require.NoError(t, err)

		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
		require.NoError(t, err)
		assert.Greater(t, timestamp, uint64(0))
	})

	t.Run("E2E with multiple records", func(t *testing.T) {
		records := make([]string, 10)
		for i := 0; i < len(records); i++ {
			record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
			require.NoError(t, err)
			hash, err := record.GetHash()
			require.NoError(t, err)
			records[i] = hash
		}

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := sdk.GetProof(records)
		require.NoError(t, err)

		root, err := sdk.VerifyProof(proof)
		require.NoError(t, err)

		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
		require.NoError(t, err)
		assert.Greater(t, timestamp, uint64(0))
	})

	t.Run("E2E with VerifyRecords", func(t *testing.T) {
		record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)
		records := []string{hash}

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		network := bloock.NewNetworkParams()
		network.Network = bloock.ListOfNetworks().BloockChain
		timestamp, err := sdk.VerifyRecords(records, network)
		require.NoError(t, err)
		assert.Greater(t, timestamp, uint64(0))
	})

	t.Run("E2E using all the builders", func(t *testing.T) {
		records := []string{}

		record, err := bloock.NewRecordBuilderFromString(randHex(64)).Build()
		require.NoError(t, err)
		hash, err := record.GetHash()
		require.NoError(t, err)
		records = append(records, hash)

		record, err = bloock.NewRecordBuilderFromBytes([]byte(randHex(64))).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		records = append(records, hash)

		record, err = bloock.NewRecordBuilderFromHex(hex.EncodeToString([]byte(randHex(64)))).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		records = append(records, hash)

		record, err = bloock.NewRecordBuilderFromJSON("{\"hello\":\"world\"}").Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		records = append(records, hash)

		record, err = bloock.NewRecordBuilderFromString(randHex(64)).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		record, err = bloock.NewRecordBuilderFromRecord(record).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		records = append(records, hash)

		record, err = bloock.NewRecordBuilderFromFile([]byte{97, 115, 100, 102, 10}).Build()
		require.NoError(t, err)
		hash, err = record.GetHash()
		require.NoError(t, err)
		records = append(records, hash)

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		network := bloock.NewNetworkParams()
		network.Network = bloock.ListOfNetworks().BloockChain
		timestamp, err := sdk.VerifyRecords(records, network)
		require.NoError(t, err)
		assert.Greater(t, timestamp, uint64(0))
	})

	t.Run("Basic E2E with Signer", func(t *testing.T) {
		record, err := bloock.
			NewRecordBuilderFromString(randHex(64)).
			WithSigner(entity.NewEcsdaSigner("8895301b0321ba12945a130e5ee5f77de8eee43afd35fd86290369931ac39572")).
			Build()

		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)
		records := []string{hash}

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := sdk.GetProof(records)
		require.NoError(t, err)

		root, err := sdk.VerifyProof(proof)
		require.NoError(t, err)

		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
		require.NoError(t, err)
		assert.Greater(t, timestamp, uint64(0))
	})

	t.Run("Basic E2E with multiple signatures", func(t *testing.T) {
		privateKey := "8895301b0321ba12945a130e5ee5f77de8eee43afd35fd86290369931ac39572"
		record, err := bloock.
			NewRecordBuilderFromString(randHex(64)).
			WithSigner(entity.NewEcsdaSigner(privateKey)).
			Build()

		privateKey2 := "5392a24a173f8f43adf662e02b2412d7d303e126662e073bfd7237a985aeebb4"
		record2, err := bloock.
			NewRecordBuilderFromRecord(record).
			WithSigner(entity.NewEcsdaSigner(privateKey2)).
			Build()

		assert.Equal(t, len(record2.Signatures), 2)

		require.NoError(t, err)

		hash, err := record2.GetHash()
		require.NoError(t, err)
		records := []string{hash}

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, bloock.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := sdk.GetProof(records)
		require.NoError(t, err)

		root, err := sdk.VerifyProof(proof)
		require.NoError(t, err)

		timestamp, err := sdk.ValidateRoot(root, bloock.ListOfNetworks().BloockChain)
		require.NoError(t, err)
		assert.Greater(t, timestamp, uint64(0))
	})
}
