//go:build e2e

package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/entity/record"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestIntegrity(t *testing.T) {
	InitSdk()

	t.Run("integrity end to end", func(t *testing.T) {
		recordClient := NewRecordClient()
		r, err := recordClient.FromString("Hello world").Build()
		require.NoError(t, err)

		records := []record.Record{r}

		integrityClient := NewIntegrityClient()
		receipt, err := integrityClient.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, integrity.RecordReceipt{}, receipt[0])

		anchor, err := integrityClient.WaitAnchor(receipt[0].Anchor, integrity.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := integrityClient.GetProof(records)
		require.NoError(t, err)
		assert.NotEqual(t, integrity.Proof{}, proof)

		root, err := integrityClient.VerifyProof(proof)
		require.NoError(t, err)
		assert.NotEqual(t, "", proof)

		network := integrity.NewNetworkParams()
		network.Network = integrity.ListOfNetworks().EthereumGnosis

		timestampValidateRoot, err := integrityClient.ValidateRoot(root, network)
		require.NoError(t, err)
		assert.Greater(t, timestampValidateRoot, uint64(0))

		timestampVerifyRecords, err := integrityClient.VerifyRecords(records, network)
		require.NoError(t, err)
		assert.Greater(t, timestampVerifyRecords, uint64(0))

		assert.Equal(t, timestampValidateRoot, timestampVerifyRecords)
	})
}
