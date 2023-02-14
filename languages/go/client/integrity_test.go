package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestIntegrity(t *testing.T) {
	InitSdk()

	t.Run("integrity end to end", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromString("Hello world").Build()
		require.NoError(t, err)

		records := []entity.Record{record}

		integrityClient := NewIntegrityClient()
		receipt, err := integrityClient.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := integrityClient.WaitAnchor(receipt[0].Anchor, entity.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := integrityClient.GetProof(records)
		require.NoError(t, err)
		assert.NotEqual(t, entity.Proof{}, proof)

		root, err := integrityClient.VerifyProof(proof)
		require.NoError(t, err)
		assert.NotEqual(t, "", proof)

		timestampValidateRoot, err := integrityClient.ValidateRoot(root, entity.ListOfNetworks().BloockChain)
		require.NoError(t, err)
		assert.Greater(t, timestampValidateRoot, uint64(0))

		network := entity.NewNetworkParams()
		network.Network = entity.ListOfNetworks().BloockChain

		timestampVerifyRecords, err := integrityClient.VerifyRecords(records, network)
		require.NoError(t, err)
		assert.Greater(t, timestampVerifyRecords, uint64(0))

		assert.Equal(t, timestampValidateRoot, timestampVerifyRecords)
	})
}
