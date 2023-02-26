package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/stretchr/testify/assert"
)

func TestKey(t *testing.T) {
	InitSdk()

	t.Run("generate local ecdsa", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.EcP256k)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.NotEmpty(t, localKey.PrivateKey)
	})

	t.Run("generate local rsa", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.NotEmpty(t, localKey.PrivateKey)
	})

	t.Run("generate managed ecdsa", func(t *testing.T) {
		keyClient := NewKeyClient()

		name := "key-name"
		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.EcP256k
		params := key.ManagedKeyParams{
			Name:       name,
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Equal(t, name, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)
	})

	t.Run("generate managed rsa", func(t *testing.T) {
		keyClient := NewKeyClient()

		name := "key-name"
		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.Rsa2048
		params := key.ManagedKeyParams{
			Name:       name,
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Equal(t, name, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)
	})

	t.Run("generate managed without name", func(t *testing.T) {
		keyClient := NewKeyClient()

		protection := key.KEY_PROTECTION_SOFTWARE
		keyType := key.EcP256k
		params := key.ManagedKeyParams{
			Protection: protection,
			KeyType:    keyType,
		}
		managedKey, err := keyClient.NewManagedKey(params)
		assert.NoError(t, err)

		assert.Empty(t, managedKey.Name)
		assert.NotEmpty(t, managedKey.Key)
		assert.Equal(t, protection, managedKey.Protection)
		assert.Equal(t, keyType, managedKey.KeyType)
	})
}
