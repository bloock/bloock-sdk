package test

import (
	"testing"

	"github.com/bloock/bloock-sdk-go/v2/builder"
	"github.com/bloock/bloock-sdk-go/v2/client"
	"github.com/bloock/bloock-sdk-go/v2/client/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEndToEnd(t *testing.T) {
	sdk := GetSdk()

	t.Run("E2E using all the builders", func(t *testing.T) {
		records := []string{}

		records = append(records, testFromString(t))
		records = append(records, testFromBytes(t))
		records = append(records, testFromHex(t))
		records = append(records, testFromJson(t))
		records = append(records, testFromFile(t))
		records = append(records, testEcsdaSignature(t, sdk))

		testFromLoader(t)

		testAesEncryption(t)
		testAesEncryptionDataAvailability(t)

		testRsaEncryption(t, sdk)
		testRsaEncryptionDataAvailability(t, sdk)

		testEciesEncryption(t, sdk)
		testEciesEncryptionDataAvailability(t, sdk)

		receipt, err := sdk.SendRecords(records)
		require.NoError(t, err)
		assert.Greater(t, len(receipt), 0)
		assert.NotEqual(t, entity.RecordReceipt{}, receipt[0])

		anchor, err := sdk.WaitAnchor(receipt[0].Anchor, entity.NewAnchorParams())
		require.NoError(t, err)
		assert.Equal(t, receipt[0].Anchor, anchor.Id)

		proof, err := sdk.GetProof(records)
		require.NoError(t, err)
		assert.NotEqual(t, entity.Proof{}, proof)

		root, err := sdk.VerifyProof(proof)
		require.NoError(t, err)
		assert.NotEqual(t, "", proof)

		network := entity.NewNetworkParams()
		network.Network = entity.ListOfNetworks().BloockChain

		timestampValidateRoot, err := sdk.ValidateRoot(root, network)
		require.NoError(t, err)
		assert.Greater(t, timestampValidateRoot, uint64(0))

		timestampVerifyRecords, err := sdk.VerifyRecords(records, network)
		require.NoError(t, err)
		assert.Greater(t, timestampVerifyRecords, uint64(0))

		assert.Equal(t, timestampValidateRoot, timestampVerifyRecords)
	})
}

func testFromString(t *testing.T) string {
	record, err := builder.NewRecordBuilderFromString("Hello world").Build()
	require.NoError(t, err)

	hash, err := record.GetHash()
	require.NoError(t, err)

	assert.Equal(t, "ed6c11b0b5b808960df26f5bfc471d04c1995b0ffd2055925ad1be28d6baadfd", hash)

	return hash
}

func testFromLoader(t *testing.T) {
	record, err := builder.NewRecordBuilderFromString("Hello world").Build()
	require.NoError(t, err)

	hash, err := record.GetHash()
	require.NoError(t, err)

	result, err := record.Publish(entity.NewHostedPublisher())
	require.NoError(t, err)
	assert.Equal(t, hash, result)

	record, err = builder.NewRecordBuilderFromLoader(entity.NewHostedLoader(result)).Build()
	require.NoError(t, err)

	hash, err = record.GetHash()
	require.NoError(t, err)

	assert.Equal(t, result, hash)
}

func testFromBytes(t *testing.T) string {
	record, err := builder.NewRecordBuilderFromBytes([]byte{1, 2, 3, 4, 5}).Build()
	require.NoError(t, err)

	hash, err := record.GetHash()
	require.NoError(t, err)

	assert.Equal(t, "7d87c5ea75f7378bb701e404c50639161af3eff66293e9f375b5f17eb50476f4", hash)

	return hash
}

func testFromHex(t *testing.T) string {
	record, err := builder.NewRecordBuilderFromHex("1234567890abcdef").Build()
	require.NoError(t, err)

	hash, err := record.GetHash()
	require.NoError(t, err)

	assert.Equal(t, "ed8ab4fde4c4e2749641d9d89de3d920f9845e086abd71e6921319f41f0e784f", hash)

	return hash
}

func testFromJson(t *testing.T) string {
	record, err := builder.NewRecordBuilderFromJSON("{\"hello\":\"world\"}").Build()
	require.NoError(t, err)

	hash, err := record.GetHash()
	require.NoError(t, err)

	assert.Equal(t, "586e9b1e1681ba3ebad5ff5e6f673d3e3aa129fcdb76f92083dbc386cdde4312", hash)

	return hash
}

func testFromFile(t *testing.T) string {
	record, err := builder.NewRecordBuilderFromFile([]byte{2, 3, 4, 5, 6}).Build()
	require.NoError(t, err)

	hash, err := record.GetHash()
	require.NoError(t, err)

	assert.Equal(t, "507aa5dd7b2e52180b764db13c8289ed204109cafe2ef4e453366da8654dc446", hash)

	return hash
}

func testAesEncryption(t *testing.T) {
	payload := "Hello world 2"
	password := "some_password"
	encryptedRecord, err := builder.NewRecordBuilderFromString(payload).
		WithEncrypter(entity.NewAesEncrypter(password)).
		Build()

	require.NoError(t, err)
	assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

	_, err = builder.NewRecordBuilderFromRecord(encryptedRecord).
		WithDecrypter(entity.NewAesDecrypter("incorrect_password")).
		Build()
	require.Error(t, err)

	decryptedRecord, err := builder.NewRecordBuilderFromRecord(encryptedRecord).
		WithDecrypter(entity.NewAesDecrypter(password)).
		Build()

	require.NoError(t, err)
	assert.Equal(t, payload, string(decryptedRecord.Retrieve()))

	hash, err := decryptedRecord.GetHash()
	require.NoError(t, err)
	assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
}

func testAesEncryptionDataAvailability(t *testing.T) {
	payload := "Hello world 2"
	password := "some_password"

	encryptedRecord, err := builder.NewRecordBuilderFromString(payload).
		WithEncrypter(entity.NewAesEncrypter(password)).
		Build()

	assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

	result, err := encryptedRecord.Publish(entity.NewHostedPublisher())
	require.NoError(t, err)

	loadedRecord, err := builder.NewRecordBuilderFromLoader(entity.NewHostedLoader(result)).Build()
	require.NoError(t, err)

	assert.Equal(t, encryptedRecord.Retrieve(), loadedRecord.Retrieve())

	decryptedRecord, err := builder.NewRecordBuilderFromRecord(loadedRecord).
		WithDecrypter(entity.NewAesDecrypter(password)).
		Build()

	require.NoError(t, err)
	assert.Equal(t, payload, string(decryptedRecord.Retrieve()))

	hash, err := decryptedRecord.GetHash()
	require.NoError(t, err)
	assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
}

func testRsaEncryption(t *testing.T, sdk client.Client) {
	payload := "Hello world 2"
	keypair, err := sdk.GenerateRsaKeyPair()

	encryptedRecord, err := builder.NewRecordBuilderFromString(payload).
		WithEncrypter(entity.NewRsaEncrypter(keypair.PublicKey)).
		Build()

	require.NoError(t, err)
	assert.NotEqual(t, payload, string(encryptedRecord.Payload))

	record, err := builder.NewRecordBuilderFromRecord(encryptedRecord).
		WithDecrypter(entity.NewRsaDecrypter(keypair.PrivateKey)).
		Build()

	require.NoError(t, err)
	assert.Equal(t, payload, string(record.Retrieve()))

	hash, err := record.GetHash()
	require.NoError(t, err)
	assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
}

func testRsaEncryptionDataAvailability(t *testing.T, sdk client.Client) {
	payload := "Hello world 2"
	keypair, err := sdk.GenerateRsaKeyPair()

	encryptedRecord, err := builder.NewRecordBuilderFromString(payload).
		WithEncrypter(entity.NewRsaEncrypter(keypair.PublicKey)).
		Build()

	assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

	result, err := encryptedRecord.Publish(entity.NewHostedPublisher())
	require.NoError(t, err)

	loadedRecord, err := builder.NewRecordBuilderFromLoader(entity.NewHostedLoader(result)).Build()
	require.NoError(t, err)

	assert.Equal(t, encryptedRecord.Retrieve(), loadedRecord.Retrieve())

	decryptedRecord, err := builder.NewRecordBuilderFromRecord(loadedRecord).
		WithDecrypter(entity.NewRsaDecrypter(keypair.PrivateKey)).
		Build()

	require.NoError(t, err)
	assert.Equal(t, payload, string(decryptedRecord.Retrieve()))

	hash, err := decryptedRecord.GetHash()
	require.NoError(t, err)
	assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
}

func testEciesEncryption(t *testing.T, sdk client.Client) {
	payload := "Hello world 2"
	keypair, err := sdk.GenerateEciesKeyPair()

	encryptedRecord, err := builder.NewRecordBuilderFromString(payload).
		WithEncrypter(entity.NewEciesEncrypter(keypair.PublicKey)).
		Build()

	require.NoError(t, err)
	assert.NotEqual(t, payload, string(encryptedRecord.Payload))

	record, err := builder.NewRecordBuilderFromRecord(encryptedRecord).
		WithDecrypter(entity.NewEciesDecrypter(keypair.PrivateKey)).
		Build()

	require.NoError(t, err)
	assert.Equal(t, payload, string(record.Retrieve()))

	hash, err := record.GetHash()
	require.NoError(t, err)
	assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
}

func testEciesEncryptionDataAvailability(t *testing.T, sdk client.Client) {
	payload := "Hello world 2"
	keypair, err := sdk.GenerateEciesKeyPair()

	encryptedRecord, err := builder.NewRecordBuilderFromString(payload).
		WithEncrypter(entity.NewEciesEncrypter(keypair.PublicKey)).
		Build()

	assert.NotEqual(t, payload, string(encryptedRecord.Retrieve()))

	result, err := encryptedRecord.Publish(entity.NewHostedPublisher())
	require.NoError(t, err)

	loadedRecord, err := builder.NewRecordBuilderFromLoader(entity.NewHostedLoader(result)).Build()
	require.NoError(t, err)

	assert.Equal(t, encryptedRecord.Retrieve(), loadedRecord.Retrieve())

	decryptedRecord, err := builder.NewRecordBuilderFromRecord(loadedRecord).
		WithDecrypter(entity.NewEciesDecrypter(keypair.PrivateKey)).
		Build()

	require.NoError(t, err)
	assert.Equal(t, payload, string(decryptedRecord.Retrieve()))

	hash, err := decryptedRecord.GetHash()
	require.NoError(t, err)
	assert.Equal(t, "96d59e2ea7cec4915c415431e6adb115e3c0c728928773bcc8e7d143b88bfda6", hash)
}

func testEcsdaSignature(t *testing.T, sdk client.Client) string {
	keys, err := sdk.GenerateKeys()
	require.NoError(t, err)

	record, err := builder.
		NewRecordBuilderFromString("Hello world 3").
		WithSigner(entity.NewEcsdaSigner(keys.PrivateKey)).
		Build()
	require.NoError(t, err)

	keys, err = sdk.GenerateKeys()
	require.NoError(t, err)

	recordWithMultipleSignatures, err := builder.
		NewRecordBuilderFromRecord(record).
		WithSigner(entity.NewEcsdaSigner(keys.PrivateKey)).
		Build()

	require.NoError(t, err)
	hash, err := recordWithMultipleSignatures.GetHash()
	require.NoError(t, err)
	assert.Equal(t, hash, "79addac952bf2c80b87161407ac455cf389b17b98e8f3e75ed9638ab06481f4f")

	signatures, err := recordWithMultipleSignatures.GetSignatures()
	require.NoError(t, err)
	assert.Equal(t, len(signatures), 2)

	return hash
}
