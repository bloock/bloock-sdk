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
		result, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
		require.NoError(t, err)
		assert.NotEmpty(t, result.ID)
	})

	t.Run("retrieve hosted", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		recordHash, err := record.GetHash()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		res, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
		require.NoError(t, err)

		result, err := availabilityClient.Retrieve(availability.NewHostedLoader(res.ID))
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
		result, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
		require.NoError(t, err)
		assert.NotEmpty(t, result.ID)
	})

	t.Run("retrieve ipfs", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		recordHash, err := record.GetHash()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		res, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
		require.NoError(t, err)

		result, err := availabilityClient.Retrieve(availability.NewIpfsLoader(res.ID))
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
		response, err := availabilityClient.Publish(record, availability.NewIpnsPublisher())
		require.NoError(t, err)
		assert.NotEmpty(t, response.ID)
		assert.NotEmpty(t, response.IpnsKey.KeyID)

		result, err := availabilityClient.Retrieve(availability.NewIpnsLoader(response.ID))
		require.NoError(t, err)

		resultHash, err := result.GetHash()
		require.NoError(t, err)
		assert.Equal(t, recordHash, resultHash)

		payloadUpdate := "Bye Bye"
		recordUpdate, err := recordClient.FromString(payloadUpdate).Build()
		require.NoError(t, err)

		responseUpdated, err := availabilityClient.Publish(recordUpdate, availability.UpdateIpnsPublisher(response.IpnsKey))
		assert.NoError(t, err)
		assert.Equal(t, response.ID, responseUpdated.ID)
		assert.Equal(t, response.IpnsKey, responseUpdated.IpnsKey)
	})
}
