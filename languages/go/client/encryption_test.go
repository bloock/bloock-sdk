package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity"
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

		encryptedRecord, err := encryptionClient.Encrypt(record, entity.NewAesEncrypter(password))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(entity.NewAesDecrypter(password)).
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
			WithEncrypter(entity.NewAesEncrypter(password)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, entity.NewAesDecrypter(password))
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

		encryptedRecord, err := encryptionClient.Encrypt(record, entity.NewRsaEncrypter(keys.PublicKey))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(entity.NewRsaDecrypter(keys.PrivateKey)).
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
			WithEncrypter(entity.NewRsaEncrypter(keys.PublicKey)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, entity.NewRsaDecrypter(keys.PrivateKey))
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, encryptedRecordHash, decryptedRecordHash)
		assert.NotEqual(t, encryptedRecord.Retrieve(), decryptedRecord.Retrieve())
	})

	t.Run("encrypt ecies", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()
		record, err := recordClient.FromString(payload).Build()
		assert.NoError(t, err)

		recordHash, err := record.GetHash()
		assert.NoError(t, err)

		encryptionClient := NewEncryptionClient()
		keys, err := encryptionClient.GenerateEciesKeyPair()
		assert.NoError(t, err)

		encryptedRecord, err := encryptionClient.Encrypt(record, entity.NewEciesEncrypter(keys.PublicKey))
		assert.NoError(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(entity.NewEciesDecrypter(keys.PrivateKey)).
			Build()
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, recordHash, decryptedRecordHash)
	})

	t.Run("decrypt ecies", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keys, err := encryptionClient.GenerateEciesKeyPair()
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(entity.NewEciesEncrypter(keys.PublicKey)).
			Build()
		assert.NoError(t, err)
		encryptedRecordHash, err := encryptedRecord.GetHash()
		assert.NoError(t, err)

		decryptedRecord, err := encryptionClient.Decrypt(encryptedRecord, entity.NewEciesDecrypter(keys.PrivateKey))
		assert.NoError(t, err)

		decryptedRecordHash, err := decryptedRecord.GetHash()
		assert.NoError(t, err)

		assert.Equal(t, encryptedRecordHash, decryptedRecordHash)
	})

	t.Run("get encryption alg", func(t *testing.T) {
		payload := "Hello world"
		recordClient := NewRecordClient()

		encryptionClient := NewEncryptionClient()
		keys, err := encryptionClient.GenerateEciesKeyPair()
		assert.NoError(t, err)

		encryptedRecord, err := recordClient.
			FromString(payload).
			WithEncrypter(entity.NewEciesEncrypter(keys.PublicKey)).
			Build()
		assert.NoError(t, err)

		alg, err := encryptionClient.GetEncryptionAlg(encryptedRecord)
		assert.NoError(t, err)
		assert.Equal(t, entity.ECIES, alg)
	})
}
