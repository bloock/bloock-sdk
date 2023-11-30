//go:build e2e

package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/encryption"
	"github.com/bloock/bloock-sdk-go/v2/entity/key"
	"github.com/stretchr/testify/assert"
)

func TestEncryption(t *testing.T) {
	InitSdk()

	t.Run("encrypt local aes", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		assert.NoError(t, err)

		recordHash, err := record.GetHash()
		assert.NoError(t, err)

		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Aes256)
		assert.NoError(t, err)

		encryptionClient := NewEncryptionClient()

		encryptedRecord, err := encryptionClient.Encrypt(record, encryption.NewEncrypterWithLocalKey(key))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewEncrypterWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, recordHash, decryptedRecordHash)
	})

	t.Run("decrypt local aes", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Aes256)
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewEncrypterWithLocalKey(key)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, encryption.NewEncrypterWithLocalKey(key))
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, encryptedRecordHash, decryptedRecordHash)
	})

	t.Run("encrypt local rsa", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		assert.NoError(t, err)

		recordHash, err := record.GetHash()
		assert.NoError(t, err)

		encryptionClient := NewEncryptionClient()
		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		encryptedRecord, err := encryptionClient.Encrypt(record, encryption.NewEncrypterWithLocalKey(key))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewEncrypterWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, recordHash, decryptedRecordHash)
	})

	t.Run("encrypt managed rsa", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		assert.NoError(t, err)

		recordHash, err := record.GetHash()
		assert.NoError(t, err)

		encryptionClient := NewEncryptionClient()
		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Rsa2048,
		})
		assert.NoError(t, err)

		encryptedRecord, err := encryptionClient.Encrypt(record, encryption.NewEncrypterWithManagedKey(key))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewEncrypterWithManagedKey(key)).
			Build()
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, recordHash, decryptedRecordHash)
	})

	t.Run("decrypt local rsa", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewEncrypterWithLocalKey(key)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, encryption.NewEncrypterWithLocalKey(key))
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, encryptedRecordHash, decryptedRecordHash)
		assert.NotEqual(t, encryptedRecord.Retrieve(), decryptedRecord.Retrieve())
	})

	t.Run("decrypt managed rsa", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keyClient := NewKeyClient()
		key, err := keyClient.NewManagedKey(key.ManagedKeyParams{
			Protection: key.KEY_PROTECTION_SOFTWARE,
			KeyType:    key.Rsa2048,
		})
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewEncrypterWithManagedKey(key)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, encryption.NewEncrypterWithManagedKey(key))
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, encryptedRecordHash, decryptedRecordHash)
		assert.NotEqual(t, encryptedRecord.Retrieve(), decryptedRecord.Retrieve())
	})

	t.Run("get encryption alg", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keyClient := NewKeyClient()
		key, err := keyClient.NewLocalKey(key.Rsa2048)
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewEncrypterWithLocalKey(key)).
			Build()
		assert.NoError(t, err)

		alg, err := encryptionClient.GetEncryptionAlg(encryptedRecord)
		assert.NoError(t, err)
		assert.Equal(t, encryption.RSA, alg)
	})
}
