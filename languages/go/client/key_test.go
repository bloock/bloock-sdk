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

		loadedKey, err := keyClient.LoadLocalKey(key.EcP256k, localKey.Key, &localKey.PrivateKey)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
	})

	t.Run("generate local rsa", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.NotEmpty(t, localKey.PrivateKey)

		loadedKey, err := keyClient.LoadLocalKey(key.Rsa2048, localKey.Key, &localKey.PrivateKey)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
	})

	t.Run("generate local aes", func(t *testing.T) {
		keyClient := NewKeyClient()
		localKey, err := keyClient.NewLocalKey(key.Aes128)
		assert.NoError(t, err)

		assert.NotEmpty(t, localKey.Key)
		assert.Empty(t, localKey.PrivateKey)

		loadedKey, err := keyClient.LoadLocalKey(key.Aes128, localKey.Key, &localKey.PrivateKey)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.Key, localKey.Key)
		assert.Equal(t, loadedKey.PrivateKey, localKey.PrivateKey)
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

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
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

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
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

		loadedKey, err := keyClient.LoadManagedKey(managedKey.ID)
		assert.NoError(t, err)

		assert.Equal(t, loadedKey.ID, managedKey.ID)
		assert.Equal(t, loadedKey.Name, managedKey.Name)
		assert.Equal(t, loadedKey.Key, managedKey.Key)
		assert.Equal(t, loadedKey.Protection, managedKey.Protection)
		assert.Equal(t, loadedKey.KeyType, managedKey.KeyType)
	})
}
