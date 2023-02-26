package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/availability"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestAvailability(t *testing.T) {
	InitSdk()

	t.Run("publish hosted", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		result, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
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
		id, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
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
		result, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
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
		id, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
		require.NoError(t, err)

		result, err := availabilityClient.Retrieve(availability.NewIpfsLoader(id))
		require.NoError(t, err)

		resultHash, err := result.GetHash()
		require.NoError(t, err)
		assert.Equal(t, recordHash, resultHash)
	})
}
