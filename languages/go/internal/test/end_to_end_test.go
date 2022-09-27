package test

import (
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
}
