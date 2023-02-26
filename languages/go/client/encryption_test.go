package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/encryption"
	"github.com/stretchr/testify/assert"
)

func TestEncryption(t *testing.T) {
	InitSdk()

	t.Run("encrypt aes", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		assert.NoError(t, err)

		recordHash, err := record.GetHash()
		assert.NoError(t, err)

		password := "some_password"
		encryptionClient := NewEncryptionClient()

		encryptedRecord, err := encryptionClient.Encrypt(record, encryption.NewAesEncrypter(password))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewAesDecrypter(password)).
			Build()
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, recordHash, decryptedRecordHash)
	})

	t.Run("decrypt aes", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		password := "some_password"

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewAesEncrypter(password)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, encryption.NewAesDecrypter(password))
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, encryptedRecordHash, decryptedRecordHash)
	})

	t.Run("encrypt rsa", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		assert.NoError(t, err)

		recordHash, err := record.GetHash()
		assert.NoError(t, err)

		encryptionClient := NewEncryptionClient()
		keys, err := encryptionClient.GenerateRsaKeyPair()
		assert.NoError(t, err)

		encryptedRecord, err := encryptionClient.Encrypt(record, encryption.NewRsaEncrypter(keys.PublicKey))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewRsaDecrypter(keys.PrivateKey)).
			Build()
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, recordHash, decryptedRecordHash)
	})

	t.Run("decrypt rsa", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keys, err := encryptionClient.GenerateRsaKeyPair()
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewRsaEncrypter(keys.PublicKey)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, encryption.NewRsaDecrypter(keys.PrivateKey))
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
		keys, err := encryptionClient.GenerateRsaKeyPair()
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(encryption.NewRsaEncrypter(keys.PublicKey)).
			Build()
		assert.NoError(t, err)

		alg, err := encryptionClient.GetEncryptionAlg(encryptedRecord)
		assert.NoError(t, err)
		assert.Equal(t, encryption.RSA, alg)
	})
}
