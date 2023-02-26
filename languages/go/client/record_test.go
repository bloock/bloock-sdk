package client

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/entity/authenticity"
	"github.com/bloock/bloock-sdk-go/v2/entity/availability"
	"github.com/bloock/bloock-sdk-go/v2/entity/encryption"
	"github.com/bloock/bloock-sdk-go/v2/entity/integrity"
	"github.com/bloock/bloock-sdk-go/v2/entity/record"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestRecord(t *testing.T) {
	InitSdk()

	t.Run("record from string", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromString("Hello world").Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)

		assert.Equal(t, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", hash)
	})

	t.Run("record from bytes", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromBytes([]byte{1, 2, 3, 4, 5}).Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)

		assert.Equal(t, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4", hash)
	})

	t.Run("record from hex", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromHex("1234567890abcdef").Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)

		assert.Equal(t, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f", hash)

	})

	t.Run("record from json", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromJSON("{\"hello\":\"world\"}").Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)

		assert.Equal(t, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312", hash)

	})

	t.Run("record from file", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromFile([]byte{2, 3, 4, 5, 6}).Build()
		require.NoError(t, err)

		hash, err := record.GetHash()
		require.NoError(t, err)

		assert.Equal(t, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446", hash)

	})

	t.Run("record from hosted loader", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromString("Hello world").Build()
		require.NoError(t, err)

		payload := record.Retrieve()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		id, err := availabilityClient.Publish(record, availability.NewHostedPublisher())
		require.NoError(t, err)

		record, err = recordClient.FromLoader(availability.NewHostedLoader(id)).Build()
		require.NoError(t, err)

		result := record.Retrieve()
		require.NoError(t, err)

		assert.Equal(t, result, payload)
	})

	t.Run("record from ipfs loader", func(t *testing.T) {
		recordClient := NewRecordClient()
		record, err := recordClient.FromString("Hello world").Build()
		require.NoError(t, err)

		payload := record.Retrieve()
		require.NoError(t, err)

		availabilityClient := NewAvailabilityClient()
		id, err := availabilityClient.Publish(record, availability.NewIpfsPublisher())
		require.NoError(t, err)

		record, err = recordClient.FromLoader(availability.NewIpfsLoader(id)).Build()
		require.NoError(t, err)

		result := record.Retrieve()
		require.NoError(t, err)

		assert.Equal(t, result, payload)
	})

	t.Run("record with ecdsa signer", func(t *testing.T) {
		authenticityClient := NewAuthenticityClient()
		keypair, err := authenticityClient.GenerateEcdsaKeys()
		require.NoError(t, err)

		name := "Some name"

		recordClient := NewRecordClient()
		record, err := recordClient.
			FromString("Hello world 3").
			WithSigner(authenticity.NewEcdsaSigner(authenticity.SignerArgs{
				PrivateKey: keypair.PrivateKey,
				CommonName: &name,
			})).
			Build()
		require.NoError(t, err)

		keypair, err = authenticityClient.GenerateEcdsaKeys()
		require.NoError(t, err)

		recordWithMultipleSignatures, err := recordClient.
			FromRecord(record).
			WithSigner(authenticity.NewEcdsaSigner(authenticity.SignerArgs{PrivateKey: keypair.PrivateKey})).
			Build()

		require.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(recordWithMultipleSignatures)
		require.NoError(t, err)
		assert.Equal(t, len(signatures), 2)

		retrievedName, err := authenticityClient.GetSignatureCommonName(signatures[0])
		assert.NoError(t, err)
		assert.Equal(t, name, retrievedName)

		assert.Equal(t, authenticity.ECDSA, signatures[0].GetAlg())

	})

	t.Run("record with ens signer", func(t *testing.T) {
		authenticityClient := NewAuthenticityClient()
		keypair, err := authenticityClient.GenerateEcdsaKeys()
		require.NoError(t, err)

		recordClient := NewRecordClient()
		record, err := recordClient.
			FromString("Hello world 4").
			WithSigner(authenticity.NewEnsSigner(authenticity.EnsArgs{
				PrivateKey: keypair.PrivateKey,
			})).
			Build()
		require.NoError(t, err)

		signatures, err := authenticityClient.GetSignatures(record)
		require.NoError(t, err)
		assert.Equal(t, len(signatures), 1)

		signatures[0].Signature = "66e0c03ce895173be8afac992c43f49d0bea3768c8146b83df9acbaee7e67d7106fd2a668cb9c90edd984667caf9fbcd54acc460fb22ba5e2824eb9811101fc601"
		signatures[0].MessageHash = "7e43ddd9df3a0ca242fcf6d1b190811ef4d50e39e228c27fd746f4d1424b4cc6"

		retrievedName, err := authenticityClient.GetSignatureCommonName(signatures[0])
		assert.NoError(t, err)
		assert.Equal(t, "vitalik.eth", retrievedName)

		assert.Equal(t, authenticity.ENS, signatures[0].GetAlg())

	})

	t.Run("record with aes encrypter", func(t *testing.T) {
		payload := "Hello world 2"
		password := "some_password"
		recordClient := NewRecordClient()
		encryptedRecord, err := recordClient.FromString(payload).
			WithEncrypter(encryption.NewAesEncrypter(password)).
			Build()

		require.NoError(t, err)
		assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

		_, err = recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewAesDecrypter("incorrect_password")).
			Build()
		require.Error(t, err)

		decryptedRecord, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewAesDecrypter(password)).
			Build()

		require.NoError(t, err)
		assert.Equal(t, payload, string(decryptedRecord.Retrieve()))

		hash, err := decryptedRecord.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
	})

	t.Run("record with rsa encrypter", func(t *testing.T) {
		payload := "Hello world 2"
		encryptionClient := NewEncryptionClient()
		keypair, err := encryptionClient.GenerateRsaKeyPair()
		assert.NoError(t, err)

		recordClient := NewRecordClient()
		encryptedRecord, err := recordClient.FromString(payload).
			WithEncrypter(encryption.NewRsaEncrypter(keypair.PublicKey)).
			Build()

		require.NoError(t, err)
		assert.NotEqual(t, payload, string(encryptedRecord.Payload))

		record, err := recordClient.FromRecord(encryptedRecord).
			WithDecrypter(encryption.NewRsaDecrypter(keypair.PrivateKey)).
			Build()

		require.NoError(t, err)
		assert.Equal(t, payload, string(record.Retrieve()))

		hash, err := record.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
	})

	t.Run("record with encrypter and hosted loader", func(t *testing.T) {
		payload := "Hello world 2"
		password := "some_password"

		recordClient := NewRecordClient()
		encryptedRecord, err := recordClient.FromString(payload).
			WithEncrypter(encryption.NewAesEncrypter(password)).
			Build()
		assert.NoError(t, err)
		assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

		availabilityClient := NewAvailabilityClient()
		result, err := availabilityClient.Publish(encryptedRecord, availability.NewHostedPublisher())
		require.NoError(t, err)

		loadedRecord, err := recordClient.FromLoader(availability.NewHostedLoader(result)).
			WithDecrypter(encryption.NewAesDecrypter(password)).
			Build()
		require.NoError(t, err)

		assert.Equal(t, payload, string(loadedRecord.Retrieve()))

		hash, err := loadedRecord.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
	})

	t.Run("record with encrypter and ipfs loader", func(t *testing.T) {
		payload := "Hello world 2"
		password := "some_password"

		recordClient := NewRecordClient()
		encryptedRecord, err := recordClient.FromString(payload).
			WithEncrypter(encryption.NewAesEncrypter(password)).
			Build()
		assert.NoError(t, err)
		assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

		availabilityClient := NewAvailabilityClient()
		result, err := availabilityClient.Publish(encryptedRecord, availability.NewIpfsPublisher())
		require.NoError(t, err)

		loadedRecord, err := recordClient.FromLoader(availability.NewIpfsLoader(result)).
			WithDecrypter(encryption.NewAesDecrypter(password)).
			Build()
		require.NoError(t, err)

		require.NoError(t, err)
		assert.Equal(t, payload, string(loadedRecord.Retrieve()))

		hash, err := loadedRecord.GetHash()
		require.NoError(t, err)
		assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
	})

	t.Run("record set proof", func(t *testing.T) {
		recordClient := NewRecordClient()
		r, err := recordClient.FromString("Hello world").Build()
		require.NoError(t, err)

		expectedHash := "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"

		originalProof := integrity.Proof{
			Leaves: []string{expectedHash},
			Nodes:  []string{"ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd"},
			Depth:  "1010101",
			Bitmap: "0101010",
			Anchor: integrity.ProofAnchor{
				AnchorID: 42,
				Networks: []integrity.AnchorNetwork{{
					Name:   "Ethereum",
					State:  "state",
					TxHash: "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
				}},
				Root:   "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd",
				Status: "success",
			},
		}

		err = r.SetProof(originalProof)
		require.NoError(t, err)

		hash, err := r.GetHash()
		require.NoError(t, err)
		assert.Equal(t, expectedHash, hash)

		integrityClient := NewIntegrityClient()
		finalProof, err := integrityClient.GetProof([]record.Record{r})
		require.NoError(t, err)

		assert.Equal(t, originalProof, finalProof)
	})
}
