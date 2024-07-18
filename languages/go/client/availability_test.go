//go:build e2e

package client

import (
	"testing"
	"time"

	"github.com/bloock/bloock-sdk-go/v2/entity/availability"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
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

	t.Run("publish and retrieve from ipns", func(t *testing.T) {
		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Rsa2048,
		})
		assert.NoError(t, err)

		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		require.NoError(t, err)

		recordHash, err := record.GetHash()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		ipnsCid, err := availabilityClient.Publish(record, availability.NewIpnsPublisher(availability.NewIpnsKeyWithManagedKey(key)))
		require.NoError(t, err)
		assert.NotEmpty(t, ipnsCid)

		time.Sleep(60 * time.Second)

		result, err := availabilityClient.Retrieve(availability.NewIpnsLoader(ipnsCid))
		require.NoError(t, err)

		resultHash, err := result.GetHash()
		require.NoError(t, err)
		assert.Equal(t, recordHash, resultHash)
	})
}
