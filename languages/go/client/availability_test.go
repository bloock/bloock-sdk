//go:build e2e

package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/availability"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAvailability(t *testing.T) {
	InitDevSdk()

	t.Run("publish hosted", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		result, _, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
		require.NoError(t, err)
		assert.NotEmpty(t, result)
	})

	t.Run("retrieve hosted", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		recordHash, err := record.GetHash()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		id, _, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
		require.NoError(t, err)

		result, err := availabilityClient.Retrieve(availability.NewHostedLoader(id))
		require.NoError(t, err)

		resultHash, err := result.GetHash()
		require.NoError(t, err)
		assert.Equal(t, recordHash, resultHash)
	})

	t.Run("publish ipfs", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		result, _, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
		require.NoError(t, err)
		assert.NotEmpty(t, result)
	})

	t.Run("retrieve ipfs", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		recordHash, err := record.GetHash()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		id, _, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
		require.NoError(t, err)

		result, err := availabilityClient.Retrieve(availability.NewIpfsLoader(id))
		require.NoError(t, err)

		resultHash, err := result.GetHash()
		require.NoError(t, err)
		assert.Equal(t, recordHash, resultHash)
	})

	t.Run("publish and retrieve from ipns", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		recordHash, err := record.GetHash()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		ipnsCid, ipnsKey, err := availabilityClient.Publish(record, availability.NewIpnsPublisher())
		require.NoError(t, err)
		assert.NotEmpty(t, ipnsCid)
		assert.NotEmpty(t, ipnsKey.KeyID)

		result, err := availabilityClient.Retrieve(availability.NewIpnsLoader(ipnsCid))
		require.NoError(t, err)

		resultHash, err := result.GetHash()
		require.NoError(t, err)
		assert.Equal(t, recordHash, resultHash)

		payloadUpdate := "Bye Bye"
		recordUpdate, err := recordClient.FromString(payloadUpdate).Build()
		require.NoError(t, err)

		ipnsCidUpdate, ipnsKeyUpdate, err := availabilityClient.Publish(recordUpdate, availability.UpdateIpnsPublisher(ipnsKey))
		assert.NoError(t, err)
		assert.Equal(t, ipnsCid, ipnsCidUpdate)
		assert.Equal(t, ipnsKey, ipnsKeyUpdate)
	})
}
